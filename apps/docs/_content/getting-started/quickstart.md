# Quickstart

```python
from fennel.datasets import dataset, field, pipeline, Dataset
from fennel.lib.aggregate import Count
from fennel.lib.metadata import meta
from fennel.lib.schema import Embedding, Series
from fennel.lib.window import Window

# Step 1: define connectors to your data sources. Here 
# it is done in the UI (so that credentials don't have to be 
# put in code) and referred by the names given to them
postgres = sources.Postgres.get(name='my_rdbms')
warehouse = sources.Snowflake.get(name='my_warehouse')

# Step 2: define a few datasets - each dataset has some
# typed fields, an owner, and can optionally be given tags
# datasets can be sourced from sources defined in step 1
@dataset
@source(postgres.table("merchant_info", cursor="last_modified"), every='1m')
@meta(owner="aditya@fennel.ai")
class MerchantInfo:
    merchant_id: int = field(key=True)
    merchant_category: str
    merchant_city: int
    merchant_num_employees: int
    created_on: datetime
    last_modified: datetime = field(timestamp=True)

@dataset
@source(postgres.table('user_info', cursor='last_modified'), every='1m')
@meta(owner='nikhil@fennel.ai', tags=['PII'])
class UserInfo:
    user_id: int = field(key=True)
    name: str
    gender: oneof(str, ['male', 'female'])
    dob: str
    age: int
    created_on: datetime
    country: Optional[str]
    last_modified: datetime = field(timestamp=True)
    
    @expectations
    def get_expectations(cls):
      return [
        expect_column_values_to_be_between(
          column=str(cls.age),
          min_value=13,
          max_value=100,
          mostly=0.95
      )]

# Here Fennel brings data from warehouse. This way, Fennel
# let you bring data from disparate systems in the same plane
# which makes it easier to work across many data sysetms
@dataset
@source(warehouse.table("user_activity", cursor_field='timestamp'), every='15m')
@meta(owner='luke@fennel.ai')
class Activity:
    user_id: int
    action_type: float
    amount: Optional[float]
    metadata:  str
    timestamp: datetime

@dataset
@meta(owner='laura@fennel.ai')
class FraudReportAggregateByCountry:
    merchant_id: int = field(key=True)
    country: str = field(key=True)
    timestamp: datetime
    num_merchant_country_fraud_transactions: int
    num_merchant_country_fraud_transactions_7d: int

    # Fennel lets you write pipelines that operate on one or more
    # datasets - you get SQL like power but with arbitrary Python.
    # and the same pipeline code works for batch & streaming data alike!
    @pipeline(Activity, UserInfo)
    def create_fraud_dataset(activity: Dataset, user_info: Dataset):
        def extract_info(df: pd.DataFrame) -> pd.DataFrame:
            df['metadata_dict'] = df['metadata'].apply(json.loads).apply(pd.Series)
            df['transaction_amount'] = df['metadata_dict'].apply(lambda x: x['transaction_amt'])
            df['merchant_id'] = df['metadata_dict'].apply(lambda x: x['merchant_id'])
            return df[['merchant_id', 'transaction_amount', 'user_id']]

        filtered = activity.filter(lambda r: r["action_type"] == "report_txn")
        extracted = filtered.transform(extract_info)
        joined = extracted.join(user_info, on=["user_id"])
        return jonined.groupby("merchant_id", "country").aggregate([
            Count(window=Window("forever"), into_field="num_merchant_country_fraud_transactions"),
            Count(window=Window("1w"), into_field="num_merchant_country_fraud_transactions_7d"),
        ])

# Step 3: define some featuresets - each featureset
# is a collection of logically related features. Features
# can be added/removed from featuresets following a tagging
# mechanism similar to protobufs and each feature itself is
# immutable once created
@featureset
@meta(owner='anti-fraud-team@fennel.ai')
class Merchant:
    merchant_id: int = feature(id=1)
    merchant_category: int = feature(id=2)
    merchant_city: int = feature(id=3)
    merchant_age: int = feature(id=4)
    merchant_num_employees: int = feature(id=5)

    # Fennel lets you specify code that knows how to
    # extract one or more features of a featureset
    @extractor
    @depends_on(MerchantInfo)
    def get_merchant_info(ts: Series[datetime], merchant_id: Series[merchant_id]):
        df = MerchantInfo.lookup(ts, merchant_id=merchant_id)
        df["current_timestamp"] = ts
        df["merchant_age"] = df.apply(
            lambda x: x["current_timestamp"] - x["created_on"], axis=1)
        return df

@featureset
@meta(owner="abhay@fennel.ai")
class MerchantBehaviorFeatures:
    num_merchant_country_fraud_transactions: int = feature(id=1)
    num_merchant_country_fraud_transactions_7d: int = feature(id=2)
    fradulent_transaction_ratio: float = feature(id=3)

    @extractor
    @depends_on(FraudReportAggregateByCountry)
    def get_merchant_fraud_features(
        ts: Series[datetime],
        country: Series[User.country],
        merchant_info: DataFrame[Merchant]) -> DataFrame[
            num_merchant_country_fraud_transactions,
            num_merchant_country_fraud_transactions_7d,
            fradulent_transaction_ratio]:
        df = FraudReportAggregateByCountry.lookup(
            ts, merchant_id=merchant_info['merchant_id'], country=country)
        df['fradulent_transaction_ratio'] = df.apply(
            lambda x: x.num_merchant_country_fraud_transactions/x.num_merchant_country_transactions,
            axis=1)
        return df

```
