---
title: 'Overview'
order: 0
status: 'published'
---

# Overview

Datasets refer to a table like data with typed columns. Datasets can be sourced from external datasets (e.g. Kafka, Snowflake, Postgres etc.) or derived from other datasets.&#x20;

Datasets are written as [Pydantic](https://docs.pydantic.dev/) inspired Python classes decorated with the `@dataset` decorator.&#x20;

### Example

```python
@dataset
class User:
    uid: int = field(key=True)
    dob: datetime
    country: str
    update_time: datetime = field(timestamp=True)
```

### Dataset Schema

A dataset has few typed columns (interchangeably referred to as fields) and unique names. Each field must have has a pre-specified datatype. See the [typing](/api-reference/data-types.md) section to learn the types supported by Fennel.&#x20;

### Field Descriptors

You might have noticed the `field(...)` descriptor next to `uid` and `update_time` fields. These optional descriptors are used to provide non-typing related information about the field. In particular, there are three kinds of fields:

1. `key` fields - these are fields with `field(key=True)` set on them. The semantics of this are somewhat similar to those of primary key in relational datasets and implies that datasets can be looked-up by providing the value of key fields. It is okay to have a dataset with zero key fields - in those cases, it's not possible to do random lookups on the dataset at all. Typically realtime activity streams (e.g. click streams) will not have any key fields. It's also okay to have multiple key fields on a dataset - in that case, all of those need to be provided while doing a lookup. And since keys are tied to lookup, they can not be of an Optional type.
2. `timestamp` field - these are fields with `field(timestamp=True)`. Every dataset should have exactly one timestamp field and this field should always be of type `datetime`. Fennel datasets automatically track data mutations over time which is needed to be able to compute point-in-time correct features for training data generation. It's the value of the `timestamp` field that is used to associate a particular state of dataset row with a timestamp. While every dataset has exactly one timestamp field, it's possible to omit it in code - if a dataset has exactly one field with `datetime` type, it is assumed to be the timestamp field.&#x20;

:::info
Timestamp fields of datasets, in addition to time travel, also allows Fennel to handle out of order events and do time-windowed data aggregations
:::

Here are some examples of valid and invalid datasets:

```python
# valid - has no key fields, which is fine. 
# no explicitly marked timestamp fields so update_time, which is of type
# datetime is automatically assumed to be the timestamp field
@dataset
class User:
    uid: int
    country: str
    update_time: datetime

# invalid - key fields can not have an optional type
@dataset
class User:
    uid: Option[int] = field(key=True)
    country: str
    update_time: datetime        
    
# invalid - no field of `datetime` type
@dataset
class User:
    uid: int
    country: str
    update_time: int

# invalid - no explicitly marked `timestamp` field
# and multiple fields of type `datetime` so timestamp 
# field is amgiguous
@dataset
class User:
    uid: int
    country: str
    created_time: datetime
    updated_time: datetime
```

### Meta Flags

Datasets can be annotated with useful meta information - either at the dataset level or at the single field level. And the same metaflags that work elsewhere in Fennel also work on datasets. Read more about [metaflags here](/governance/metaflags). Here is an example:

```python
@meta(owner='abc-team@fennel.ai', tags=['PII', 'experimental'])
@dataset
class User:
    uid: int = field(key=True)
    height: float = field().meta(description='height in inches')
    weight: float = field().meta(description='weight in lbs')
    updated: datetime
```

Quick note - to encourage code ownership, owner metaflag MUST be present on every dataset and featureset - else the sync call will fail. Fennel uses this to notify the owner of the Dataset in case of any issues (e.g. data quality problems, some upstream dataset getting marked deprecated etc.)

However, these are omitted in spirit of brevity and clarity in several examples throughout the documentation.&#x20;

### Learn more about datasets

Datasets, despite being a very simple and compact abstraction, pack a punch in terms of power. Here are a few topics to read next to learn more about datasets.&#x20;

* [Bringing data into a Dataset from external data sources](/datasets/sources)
* [Writing pipelines to derive datasets from existing datasets](/datasets/pipelines/)
* [Reading a Dataset by doing lookups](/datasets/pipelines/)
