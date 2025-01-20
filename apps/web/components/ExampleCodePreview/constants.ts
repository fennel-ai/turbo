import type { FileTree } from "./Sidebar";

export const FILES: Record<string, string> = {
    'getting_started.py': `from datetime import datetime, timedelta, timezone
from typing import Optional

import pandas as pd

from fennel.connectors import source, Postgres, Kafka, Webhook
from fennel.datasets import dataset, pipeline, field, Dataset, Count
from fennel.dtypes import Continuous
from fennel.featuresets import featureset, extractor
from fennel.lib import expectations, expect_column_values_to_be_between
from fennel.lib import inputs, outputs
from fennel.testing import MockClient, log

__owner__ = "nikhil@fennel.ai"

postgres = Postgres.get(name="my_rdbms")
kafka = Kafka.get(name="my_kafka")
webhook = Webhook(name="fennel_webhook")

table = postgres.table("product", cursor="last_modified")

@source(table, disorder="1d", cdc="upsert", every="1m")
@dataset(index=True)
class Product:
    product_id: int = field(key=True)
    seller_id: int
    price: float
    desc: Optional[str]
    last_modified: datetime = field(timestamp=True)

    # Powerful primitives like data expectations for data hygiene
    @expectations
    def get_expectations(cls):
        return [
            expect_column_values_to_be_between(
                column="price", min_value=1, max_value=1e4, mostly=0.95
            )
        ]


# ingesting realtime data from Kafka works exactly the same way
@source(kafka.topic("orders"), disorder="1h", cdc="append")
@dataset
class Order:
    uid: int
    product_id: int
    timestamp: datetime

@dataset(index=True, version=1)
class UserSellerOrders:
    uid: int = field(key=True)
    seller_id: int = field(key=True)
    num_orders_1d: int
    num_orders_1w: int
    timestamp: datetime

    @pipeline
    @inputs(Order, Product)
    def my_pipeline(cls, orders: Dataset, products: Dataset):
        orders = orders.join(products, how="left", on=["product_id"])
        orders = orders.transform(lambda df: df.fillna(0))
        orders = orders.drop("product_id", "desc", "price")
        orders = orders.dropnull()
        return orders.groupby("uid", "seller_id").aggregate(
            num_orders_1d=Count(window=Continuous("1d")),
            num_orders_1w=Count(window=Continuous("1w")),
        )

@featureset
class UserSellerFeatures:
    uid: int
    seller_id: int
    num_orders_1d: int
    num_orders_1w: int

    @extractor(deps=[UserSellerOrders])
    @inputs("uid", "seller_id")
    @outputs("num_orders_1d", "num_orders_1w")
    def myextractor(cls, ts: pd.Series, uids: pd.Series, sellers: pd.Series):
        df, found = UserSellerOrders.lookup(ts, seller_id=sellers, uid=uids)
        df = df.fillna(0)
        df["num_orders_1d"] = df["num_orders_1d"].astype(int)
        df["num_orders_1w"] = df["num_orders_1w"].astype(int)
        return df[["num_orders_1d", "num_orders_1w"]]


client = Client('<FENNEL SERVER URL>')
client.commit(
    message="initial commit",
    datasets=[Order, Product, UserSellerOrders],
    featuresets=[UserSellerFeatures],
)

# create some product data
now = datetime.now(timezone.utc)
columns = ["product_id", "seller_id", "price", "desc", "last_modified"]
data = [
    [1, 1, 10.0, "product 1", now],
    [2, 2, 20.0, "product 2", now],
    [3, 1, 30.0, "product 3", now],
]
df = pd.DataFrame(data, columns=columns)
log(Product, df)

columns = ["uid", "product_id", "timestamp"]
data = [[1, 1, now], [1, 2, now], [1, 3, now]]
df = pd.DataFrame(data, columns=columns)
log(Order, df)

feature_df = client.query(
    outputs=[
        UserSellerFeatures.num_orders_1d,
        UserSellerFeatures.num_orders_1w,
    ],
    inputs=[
        UserSellerFeatures.uid,
        UserSellerFeatures.seller_id,
    ],
    input_dataframe=pd.DataFrame(
        [[1, 1], [1, 2]],
        columns=["UserSellerFeatures.uid", "UserSellerFeatures.seller_id"],
    ),
)

assert feature_df.columns.tolist() == [
    "UserSellerFeatures.num_orders_1d",
    "UserSellerFeatures.num_orders_1w",
]
assert feature_df["UserSellerFeatures.num_orders_1d"].tolist() == [2, 1]
assert feature_df["UserSellerFeatures.num_orders_1w"].tolist() == [2, 1]

day = timedelta(days=1)

feature_df = client.query_offline(
    outputs=[
        UserSellerFeatures.num_orders_1d,
        UserSellerFeatures.num_orders_1w,
    ],
    inputs=[
        UserSellerFeatures.uid,
        UserSellerFeatures.seller_id,
    ],
    timestamp_column="timestamps",
    input_dataframe=pd.DataFrame(
        [[1, 1, now], [1, 2, now], [1, 1, now - day], [1, 2, now - day]],
        columns=[
            "UserSellerFeatures.uid",
            "UserSellerFeatures.seller_id",
            "timestamps",
        ],
    ),
)

assert feature_df.columns.tolist() == [
    "UserSellerFeatures.num_orders_1d",
    "UserSellerFeatures.num_orders_1w",
    "timestamps",
]
assert feature_df["UserSellerFeatures.num_orders_1d"].tolist() == [2, 1, 0, 0]
assert feature_df["UserSellerFeatures.num_orders_1w"].tolist() == [2, 1, 0, 0]`,
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