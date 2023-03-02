---
title: Unit Tests
order: 0
status: 'published'
---

# Unit Tests

Fennel's Python client ships with an (inefficient) mock server inside it - this makes it possible to do local development and run unit tests against the mock server to verify correctness.  This works even if you don't have any remote Fennel server - heck it works even if you don't have internet.&#x20;

This mock server has near parity with the actual server with one notable exception - it doesn't support data connectors to external data systems (after all, it is completely local with zero remote dependencies!)

### Example

Let's first see how it will work and later we will see a fully functional unit test example.

```python
from fennel.test_lib import mock_client

class TestDataset(unittest.TestCase):
    @mock_client
    def test_dataset(self, client):
        # client talks to the mock server
        # ... do any setup
        # Sync the dataset
        client.sync(datasets=[User])
        # ... some other stuff
        client.log('User', pd.Dataframe(...))
        # ... some other stuff
        found = client.extract_features(...)
        self.assertEqual(found, expected)    
```

Here we imported `mock_client` from the `test_lib`. This is a decorator which can be used to decorate test functions - and the decorator supplies an extra argument called `client` to the test. Once the `client` object reaches the body of the test, you can do all operations that are typically done on a real client - you can sync datasets/featuresets, log data, extract features etc.&#x20;

Since external data integration doesn't work in mock server, the only way to bring data to a dataset in the mock server is by explicitly logging data to it.



## Testing Datasets

For testing Datasets, you can use the `client.log` to add some local data to a dataset and then query this or other downstream datasets using the `.lookup` API. Here is an end to end example. Suppose our regular non-test code looks like this:

```python
import pandas as pd
from fennel.datasets import dataset, field

@meta(owner="test@test.com")
@dataset
class RatingActivity:
    userid: int
    rating: float
    movie: str
    t: datetime


@meta(owner="test@test.com")
@dataset
class MovieRating:
    name: str = field(key=True)
    rating: float
    num_ratings: int
    sum_ratings: float
    t: datetime

    @staticmethod
    @pipeline(RatingActivity)
    def pipeline_aggregate(activity: Dataset):
        ds = activity.groupby("movie").aggregate([
            Count(window=Window(), name="num_ratings"),
            Sum(window=Window(), value="rating", name="sum_ratings"),
            Average(window=Window(), value="rating", name="rating"),
        ])
        return ds.transform(lambda df: df.rename(columns={"movie": "name"}))
```

And you want to test that data reaching `RatingActivity` dataset correctly propagates to `MovieRating` dataset via the pipeline. You could write the following unit test to do so:

```python
from fennel.test_lib import mock_client
from my_dataset import MovieRating, RatingActivity

class TestDataset(unittest.TestCase):
    @mock_client
    def test_dataset(self, client):
        # Sync the dataset
        client.sync(
            datasets=[MovieRating, RatingActivity],
        )
        now = datetime.now()
        one_hour_ago = now - timedelta(hours=1)
        two_hours_ago = now - timedelta(hours=2)
        three_hours_ago = now - timedelta(hours=3)
        four_hours_ago = now - timedelta(hours=4)
        five_hours_ago = now - timedelta(hours=5)

        data = [
            [18231, 2, "Jumanji", five_hours_ago],
            [18231, 3, "Jumanji", four_hours_ago],
            [18231, 2, "Jumanji", three_hours_ago],
            [18231, 5, "Jumanji", five_hours_ago],
            [18231, 4, "Titanic", three_hours_ago],
            [18231, 3, "Titanic", two_hours_ago],
            [18231, 5, "Titanic", one_hour_ago],
            [18231, 5, "Titanic", now - timedelta(minutes=1)],
            [18231, 3, "Titanic", two_hours_ago],
        ]
        columns = ["userid", "rating", "movie", "t"]
        df = pd.DataFrame(data, columns=columns)
        response = client.log("RatingActivity", df)
        assert response.status_code == requests.codes.OK

        # Do some lookups to verify pipeline_aggregate 
        # is working as expected
        ts = pd.Series([now, now])
        names = pd.Series(["Jumanji", "Titanic"])
        df, _ = MovieRating.lookup(
            ts,
            movie=names,
        )
        assert df.shape == (2, 5)
        assert df["movie"].tolist() == ["Jumanji", "Titanic"]
        assert df["rating"].tolist() == [3, 4]
        assert df["num_ratings"].tolist() == [4, 5]
        assert df["sum_ratings"].tolist() == [12, 20]

```

### Testing Featuresets

Extractors are simple Python functions and, hence, can be unit tested directly.

```python
# this is the non-test code
@meta(owner="test@test.com")
@featureset
class UserInfoMultipleExtractor:
    userid: int = feature(id=1)
    name: str = feature(id=2)
    # The users gender among male/female/non-binary
    age: int = feature(id=4).meta(owner="aditya@fennel.ai")
    age_squared: int = feature(id=5)
    age_cubed: int = feature(id=6)
    is_name_common: bool = feature(id=7)

    @extractor
    def get_age_and_name_features(
        ts: pd.Series, user_age: Series[age], name: Series[name]
    ) -> DataFrame[age_squared, age_cubed, is_name_common]:
        is_name_common = name.isin(["John", "Mary", "Bob"])
        return pd.concat([user_age**2, user_age**3, is_name_common], axis=1)
        
# somewhere in the test file, you can write this        
class TestSimpleExtractor(unittest.TestCase):
	def test_get_age_and_name_features(self):
        age = pd.Series([32, 24])
        name = pd.Series(["John", "Rahul"])
        ts = pd.Series([datetime(2020, 1, 1), datetime(2020, 1, 1)])
        df = UserInfoMultipleExtractor.get_age_and_name_features(ts, age, name)
        self.assertEqual(df.shape, (2, 3))
        self.assertEqual(df["age_squared"].tolist(), [1024, 576])
        self.assertEqual(df["age_cubed"].tolist(), [32768, 13824])
        self.assertEqual(df["is_name_common"].tolist(), [True, False])
```


For extractors that depend on dataset lookups, the setup looks similar to that of testing datasets as shown above - create a mock client, sync some datasets/featuresets, log data to a dataset, and finally use client to extract features. Here is an example:

```python
# this is regular non-test code
@meta(owner="test@test.com")
@dataset
class UserInfoDataset:
    user_id: int = field(key=True)
    name: str
    age: Optional[int]
    timestamp: datetime = field(timestamp=True)
    country: str


@meta(owner="test@test.com")
@featureset
class UserInfoMultipleExtractor:
    userid: int = feature(id=1)
    name: str = feature(id=2)
    country_geoid: int = feature(id=3).meta(wip=True)  # type: ignore
    # The users gender among male/female/non-binary
    age: int = feature(id=4).meta(owner="aditya@fennel.ai")  # type: ignore
    age_squared: int = feature(id=5)
    age_cubed: int = feature(id=6)
    is_name_common: bool = feature(id=7)

    @extractor
    @depends_on(UserInfoDataset)
    def get_user_age_and_name(
        ts: pd.Series, user_id: Series[userid]
    ) -> DataFrame[age, name]:
        df = UserInfoDataset.lookup(ts, user_id=user_id)  # type: ignore
        return df[["age", "name"]]

    @extractor
    def get_age_and_name_features(
        ts: pd.Series, user_age: Series[age], name: Series[name]
    ) -> DataFrame[age_squared, age_cubed, is_name_common]:
        is_name_common = name.isin(["John", "Mary", "Bob"])
        return pd.concat([user_age**2, user_age**3, is_name_common], axis=1)

    @extractor
    @depends_on(UserInfoDataset)
    def get_country_geoid(
        ts: pd.Series, user_id: Series[userid]
    ) -> Series[country_geoid]:
        df = UserInfoDataset.lookup(ts, user_id=user_id)  # type: ignore
        return df["country"].apply(get_country_geoid)
        

# this is your test code in some test module                
class TestExtractorDAGResolution(unittest.TestCase):
    @mock_client
    def test_dag_resolution(self, client):
        client.sync(
            datasets=[UserInfoDataset],
            featuresets=[UserInfoMultipleExtractor],
        )
        data = [
            [18232, "John", 32, "USA", 1010],
            [18234, "Monica", 24, "Chile", 1010],
        ]
        columns = ["user_id", "name", "age", "country", "timestamp"]
        df = pd.DataFrame(data, columns=columns)
        response = client.log("UserInfoDataset", df)
        assert response.status_code == requests.codes.OK, response.json()

        feature_df = client.extract_features(
            output_feature_list=[
                UserInfoMultipleExtractor,
            ],
            input_feature_list=[UserInfoMultipleExtractor.userid],
            input_df=pd.DataFrame({"userid": [18232, 18234]}),
            timestamps=pd.Series([1011, 1012]),
        )
        self.assertEqual(feature_df.shape, (2, 7))
```
