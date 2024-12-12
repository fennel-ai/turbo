import type { FileTree } from "./Sidebar";

export const FILES: Record<string, string> = {
    'datasets/__init__.py': '',
    'datasets/payment.py': `"""
This file contains all the required datasets for driver payment features.
"""

from datetime import datetime
from typing import Optional

import pandas as pd
from fraud.datasets.payment_ids import PaymentIdentifierDS

from fennel.connectors import Webhook, source
from fennel.datasets import (
    Count,
    Min,
    Max,
    Sum,
    dataset,
    field,
    pipeline,
    Dataset,
)
from fennel.dtypes import Continuous
from fennel.lib import inputs

__owner__ = "eng@app.com"

webhook = Webhook(name="app_webhook")


@source(
    webhook.endpoint("ChargesDS"), disorder="14d", cdc="upsert", env="local"
)
@dataset
class ChargesDS:
    customer: str = field(key=True)
    risk_score: float
    amount: float
    amount_refunded: float
    reservation_id: Optional[int]
    created: datetime = field(timestamp=True)


@dataset(index=True)
class TransactionsDS:
    driver_id: int = field(key=True)
    min_radar_score: float
    max_radar_score: float
    created: datetime = field(timestamp=True)

    @pipeline
    @inputs(ChargesDS, PaymentIdentifierDS)
    def transactions(cls, charges: Dataset, payment_identifier: Dataset):
        return (
            charges.join(
                payment_identifier,
                left_on=["customer"],
                right_on=["customer_id"],
                how="inner",
            )
            .groupby("driver_id")
            .aggregate(
                Min(
                    of="risk_score",
                    window=Continuous("forever"),
                    default=0.0,
                    into_field="min_radar_score",
                ),
                Max(
                    of="risk_score",
                    window=Continuous("forever"),
                    default=0.0,
                    into_field="max_radar_score",
                ),
            )
        )


@dataset
@source(
    webhook.endpoint("PaymentEventDS"),
    disorder="14d",
    cdc="append",
    env="local",
)
class PaymentEventDS:
    customer_id: str
    payment_provider: str
    result: str
    postal_code: str
    payment_method: str
    invoice_id: Optional[int]
    debit_card: Optional[int]
    created: datetime


@dataset(index=True)
class LastPaymentDS:
    driver_id: int = field(key=True)
    payment_provider: str
    result: str
    postal_code: str
    invoice_id: Optional[int]
    payment_method: str
    is_debit_card: bool
    created: datetime = field(timestamp=True)

    @pipeline
    @inputs(PaymentEventDS, PaymentIdentifierDS)
    def last_payment(cls, payment_event: Dataset, payment_identifier: Dataset):
        return (
            payment_event.join(
                payment_identifier,
                on=["customer_id"],
                how="inner",
            )
            .assign(
                "is_debit_card",
                bool,
                lambda df: df["debit_card"].apply(
                    lambda x: True if pd.notna(x) else False
                ),
            )
            .drop("debit_card", "customer_id", "account_id", "id")
            .groupby("driver_id")
            .first()
        )


@dataset(index=True)
class PaymentDS:
    driver_id: int = field(key=True)
    num_postal_codes: int
    num_failed_payment_verification_attempts: int
    created: datetime = field(timestamp=True)

    @pipeline
    @inputs(PaymentEventDS, PaymentIdentifierDS)
    def payment(cls, payment_event: Dataset, payment_identifier: Dataset):
        return (
            payment_event.join(
                payment_identifier,
                on=["customer_id"],
                how="inner",
            )
            .drop("account_id", "id")
            .assign(
                "result_val",
                int,
                lambda df: (df["result"] != "SUCCESS").astype(int),
            )
            .groupby("driver_id")
            .aggregate(
                Count(
                    of="postal_code",
                    window=Continuous("forever"),
                    into_field="num_postal_codes",
                    unique=True,
                    approx=True,
                ),
                Sum(
                    of="result_val",
                    window=Continuous("forever"),
                    into_field="num_failed_payment_verification_attempts",
                ),
            )
        )`,
    'featuresets/__init__.py': '',
    'featuresets/all_features.py': `from typing import Optional

from fennel.featuresets import featureset, feature as F
from fennel.dtypes import oneof

__owner__ = "eng@app.com"

from fraud.featuresets.driver import (
    AgeFS,
    ReservationLevelFS,
)
from fraud.featuresets.payment import PaymentFS
from fraud.featuresets.vehicle import VehicleFS
from fraud.featuresets.velocity import DriverVelocityFS
from fraud.featuresets.request import Request


@featureset
class FraudModel:
    driver_id: int = F(Request.driver_id)

    # Velocity FS
    num_past_completed_trips: int = F(DriverVelocityFS.num_past_completed_trips)
    percent_past_guest_cancelled_trips: float = F(
        DriverVelocityFS.percent_past_guest_cancelled_trips
    )
    num_logins_last_day: int = F(DriverVelocityFS.num_logins_last_day)
    num_checkout_pages_last_day: int = F(
        DriverVelocityFS.num_checkout_pages_last_day
    )
    num_past_approved_trips: int = F(DriverVelocityFS.num_past_approved_trips)

    # Payment features
    num_postal_codes: int = F(PaymentFS.num_postal_codes)
    num_failed_payment_verification_attempts: int = F(
        PaymentFS.num_failed_payment_verification_attempts,
    )
    payment_type: str = F(PaymentFS.payment_type)
    is_debit_card: bool = F(PaymentFS.is_debit_card)
    max_radar_score: float = F(PaymentFS.max_radar_score)
    min_radar_score: float = F(PaymentFS.min_radar_score)

    # Age features
    account_age: float = F(AgeFS.account_age)
    age: float = F(AgeFS.age)

    # Reservation features
    guest_protection_level: Optional[str] = F(
        ReservationLevelFS.guest_protection_level
    )
    total_trip_price_amount: float = F(
        ReservationLevelFS.total_trip_price_amount
    )
    delivery_type: oneof(str, ["AIRPORT", "HOME"]) = F(
        ReservationLevelFS.delivery_type
    )
    trip_duration_hours: float = F(ReservationLevelFS.trip_duration_hours)

    # Vehicle features
    vehicle_id: int = F(Request.vehicle_id)
    vehicle_state: str = F(VehicleFS.vehicle_state)
    market_area_id: int = F(VehicleFS.market_area_id)`,
    'tests/test_all_features.py': `import pandas as pd
from fraud.datasets.payment import (
    ChargesDS,
    TransactionsDS,
    PaymentEventDS,
    LastPaymentDS,
    PaymentDS,
)
from fraud.datasets.payment_ids import (
    PaymentAccountSrcDS,
    PaymentAccountAssociationSrcDS,
    AccountSrcDS,
    PaymentIdentifierDS,
)
from fraud.datasets.sourced import (
    DriverDS,
    DriverCreditScoreDS,
    RentCarCheckoutEventDS,
)
from fraud.datasets.vehicle import (
    IdToMarketAreaDS,
    LocationToNewMarketArea,
    LocationDS2,
    LocationDS,
    VehicleSummary,
    MarketAreaDS,
)
from fraud.datasets.velocity import (
    BookingFlowCheckoutPageDS,
    ReservationDS,
    NumCompletedTripsDS,
    LoginEventsDS,
    LoginsLastDayDS,
    CheckoutPagesLastDayDS,
    PastApprovedDS,
    ReservationSummaryDS,
    CancelledTripsDS,
)
from fraud.featuresets.all_features import FraudModel
from fraud.featuresets.driver import (
    Request,
    AgeFS,
    CreditScoreFS,
    ReservationLevelFS,
)
from fraud.featuresets.payment import PaymentFS
from fraud.featuresets.vehicle import VehicleFS
from fraud.featuresets.velocity import DriverVelocityFS
from fraud.tests.test_driver_payment_features import (
    log_payment_identifier_datasets,
)

from fennel.testing import mock


@mock
def test_all_features(client):
    client.commit(
        message="some commit message",
        datasets=[
            DriverDS,
            DriverCreditScoreDS,
            AccountSrcDS,
            PaymentIdentifierDS,
            ChargesDS,
            PaymentAccountSrcDS,
            PaymentAccountAssociationSrcDS,
            PaymentDS,
            TransactionsDS,
            LastPaymentDS,
            PaymentEventDS,
            IdToMarketAreaDS,
            LocationToNewMarketArea,
            RentCarCheckoutEventDS,
            LocationDS2,
            LocationDS,
            VehicleSummary,
            BookingFlowCheckoutPageDS,
            ReservationDS,
            NumCompletedTripsDS,
            LoginEventsDS,
            LoginsLastDayDS,
            CheckoutPagesLastDayDS,
            PastApprovedDS,
            ReservationSummaryDS,
            CancelledTripsDS,
            MarketAreaDS,
        ],
        featuresets=[
            Request,
            AgeFS,
            CreditScoreFS,
            FraudModel,
            PaymentFS,
            DriverVelocityFS,
            ReservationLevelFS,
            VehicleFS,
        ],
        env="local",
    )
    log_payment_identifier_datasets(client)

    source_df = (
        pd.read_csv("examples/fraud/data/driver/driver.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(
            birthdate=lambda x: pd.to_datetime(x["birthdate"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
    )
    log_response = client.log(
        webhook="app_webhook",
        endpoint="DriverDS",
        df=source_df,
    )
    assert log_response.status_code == 200, log_response.json()

    socure_df = (
        pd.read_csv("examples/fraud/data/driver/driver_credit_score.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(score=lambda x: x["score"].astype(float))
    )

    log_response = client.log(
        webhook="app_webhook",
        endpoint="DriverCreditScoreDS",
        df=socure_df,
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/payment/payment_event.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(invoice_id=lambda x: x["invoice_id"].astype("Int64"))
        .assign(debit_card=lambda x: x["debit_card"].astype("Int64"))
        .assign(postal_code="123")
    )
    log_response = client.log(
        webhook="app_webhook", endpoint="PaymentEventDS", df=df
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/payment/charges.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(risk_score=lambda x: x["risk_score"].astype(float))
        .assign(amount=lambda x: x["amount"].astype(float))
        .assign(amount_refunded=lambda x: x["amount_refunded"].astype(float))
        .assign(reservation_id=lambda x: x["reservation_id"].astype("Int64"))
    )

    log_response = client.log(
        webhook="app_webhook",
        endpoint="ChargesDS",
        df=df,
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/driver/reservation.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(vehicle_id=lambda x: x["vehicle_id"].astype(int))
        .assign(reservation_id=lambda x: x["reservation_id"].astype(int))
        .assign(driver_id=lambda x: x["driver_id"].astype(int))
        .assign(is_completed_trip=lambda x: x["is_completed_trip"].astype(int))
        .assign(current_status=lambda x: x["current_status"].astype(int))
    )
    log_response = client.log(
        webhook="app_webhook",
        endpoint="ReservationDS",
        df=df,
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/driver/booking_flow_checkout_page.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(driver_id=lambda x: x["driver_id"].astype("Int64"))
    )
    log_response = client.log(
        webhook="app_webhook",
        endpoint="BookingFlowCheckoutPageDS",
        df=df,
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/driver/reservation_summary.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(
            trip_end_ts=lambda x: pd.to_datetime(x["trip_end_ts"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(driver_id=lambda x: x["driver_id"].astype(int))
        .assign(reservation_id=lambda x: x["reservation_id"].astype(int))
        .assign(vehicle_id=lambda x: x["vehicle_id"].astype(int))
        .assign(is_ever_approved=lambda x: x["is_ever_approved"].astype(int))
    )
    log_response = client.log(
        webhook="app_webhook", endpoint="ReservationSummaryDS", df=df
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/driver/login_event.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(driver_id=lambda x: x["driver_id"].astype(int))
    )
    log_response = client.log(
        webhook="app_webhook",
        endpoint="LoginEventsDS",
        df=df,
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/payment/location.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(latitude=lambda x: x["latitude"].astype(float))
        .assign(longitude=lambda x: x["longitude"].astype(float))
    )
    log_response = client.log(
        webhook="app_webhook",
        endpoint="LocationDS",
        df=df,
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv(
            "examples/fraud/data/payment/location_to_new_market_area.csv"
        )
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(latitude=lambda x: x["latitude"].astype(float))
        .assign(longitude=lambda x: x["longitude"].astype(float))
        .assign(gid=lambda x: x["gid"].astype(int))
    )
    log_response = client.log(
        webhook="app_webhook",
        endpoint="LocationToNewMarketArea",
        df=df,
    )
    assert log_response.status_code == 200, log_response.json()

    df = (
        pd.read_csv("examples/fraud/data/vehicle/vehicle_summary.csv")
        .assign(
            created=lambda x: pd.to_datetime(x["created"]).apply(
                lambda y: y.tz_localize(None)
            )
        )
        .assign(vehicle_id=lambda x: x["vehicle_id"].astype(int))
        .assign(latitude=lambda x: x["latitude"].astype(int))
        .assign(longitude=lambda x: x["longitude"].astype(float))
        .assign(location_id=lambda x: x["location_id"].astype(int))
    )
    log_response = client.log(
        webhook="app_webhook",
        endpoint="VehicleSummary",
        df=df,
    )
    assert log_response.status_code == 200, log_response.json()

    feature_df = client.query(
        inputs=[
            "Request.driver_id",
            "Request.vehicle_id",
            "Request.reservation_id",
        ],
        input_dataframe=pd.DataFrame(
            {
                "Request.driver_id": [
                    23315855,
                    23348774,
                ],
                "Request.vehicle_id": [1145620, 900208],
                "Request.reservation_id": [13176875, 13398944],
            }
        ),
        outputs=[FraudModel],
    )
    assert feature_df.shape == (2, 21)
    # Test features from each group
    assert feature_df["FraudModel.num_past_completed_trips"].to_list() == [
        14,
        15,
    ]
    assert feature_df["FraudModel.num_past_approved_trips"].to_list() == [
        19,
        17,
    ]
    assert feature_df["FraudModel.max_radar_score"].to_list() == [0.0, 5.0]
    assert feature_df["FraudModel.trip_duration_hours"].to_list() == [
        0.0,
        0.0,
    ]
    assert feature_df["FraudModel.market_area_id"].to_list() == [0, 0]`,
    'tests/__init__.py': ``,
    '__init__.py': ``,
    'sync.py': `import argparse

from fraud.datasets.payment import (
    ChargesDS,
    TransactionsDS,
    PaymentEventDS,
    LastPaymentDS,
    PaymentDS,
)
from fraud.datasets.payment_ids import (
    PaymentAccountSrcDS,
    PaymentAccountAssociationSrcDS,
    AccountSrcDS,
    PaymentIdentifierDS,
)
from fraud.datasets.sourced import (
    EventTrackerDS,
    DriverLicenseCountryDS,
    VehicleSummaryDS,
    RentCarCheckoutEventDS,
    DriverDS,
    DriverCreditScoreDS,
)
from fraud.datasets.vehicle import (
    LocationDS,
    LocationDS2,
    LocationToNewMarketArea,
    IdToMarketAreaDS,
    VehicleSummary,
    MarketAreaDS,
)
from fraud.datasets.velocity import (
    ReservationDS,
    NumCompletedTripsDS,
    CancelledTripsDS,
    LoginEventsDS,
    LoginsLastDayDS,
    BookingFlowCheckoutPageDS,
    CheckoutPagesLastDayDS,
    ReservationSummaryDS,
    PastApprovedDS,
)
from fraud.featuresets.all_features import FraudModel
from fraud.featuresets.driver import (
    Request,
    AgeFS,
    CreditScoreFS,
    ReservationLevelFS,
)
from fraud.featuresets.payment import PaymentFS
from fraud.featuresets.vehicle import VehicleFS
from fraud.featuresets.velocity import DriverVelocityFS

from fennel.client import Client

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Sync Script")
    # URL parameter (string)
    parser.add_argument("url", type=str, help="URL to sync with")
    # Tier selector
    parser.add_argument("env", type=str, help="Env to sync with")
    # Token - optional because for local runs, we don't need it
    parser.add_argument(
        "--token", type=str, help="Token to use", required=False
    )
    # Preview parameter (boolean)
    parser.add_argument(
        "--preview", action="store_true", help="Run in preview mode"
    )
    args = parser.parse_args()
    print("Starting client  with url: " + args.url)
    client = Client(args.url, token=args.token)
    client.commit(
        message="Initial commit for fraud detection",
        datasets=[
            PaymentAccountSrcDS,
            PaymentAccountAssociationSrcDS,
            AccountSrcDS,
            PaymentIdentifierDS,
            ChargesDS,
            TransactionsDS,
            PaymentEventDS,
            LastPaymentDS,
            PaymentDS,
            EventTrackerDS,
            DriverLicenseCountryDS,
            VehicleSummaryDS,
            RentCarCheckoutEventDS,
            DriverDS,
            DriverCreditScoreDS,
            LocationDS,
            LocationDS2,
            LocationToNewMarketArea,
            IdToMarketAreaDS,
            VehicleSummary,
            MarketAreaDS,
            ReservationDS,
            NumCompletedTripsDS,
            CancelledTripsDS,
            LoginEventsDS,
            LoginsLastDayDS,
            BookingFlowCheckoutPageDS,
            CheckoutPagesLastDayDS,
            ReservationSummaryDS,
            PastApprovedDS,
        ],
        featuresets=[
            Request,
            AgeFS,
            CreditScoreFS,
            FraudModel,
            PaymentFS,
            DriverVelocityFS,
            ReservationLevelFS,
            VehicleFS,
        ],
        preview=args.preview,
        env=args.env,
    )`
}

function buildTree(paths: string[]): FileTree {
    const tree: FileTree = {};

    paths.forEach(path => {
        const parts = path.split('/');
        let current: FileTree = tree;

        parts.forEach((part, index) => {
            if (!current[part]) {
                current[part] = index === parts.length - 1 ? path : {};
            }
            current = current[part] as FileTree;
        });
    });

    return tree;
}

export const fileTree = buildTree(Object.keys(FILES));