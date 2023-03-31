import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CodeBlock } from 'ui';

const EXAMPLE_CODE = `# This is a comment
@dataset
class User:
    uid: int = field(key=True)
    dob: datetime
    country: string
    sum_ratings: int
    update_time: datetime = field(timestamp=True)`;

const LONG_EXAMPLE_CODE = `@meta(owner="data-eng-oncall@fennel.ai")
@featureset
class Request:
    uid: int = feature(id=1)
    request_timestamp: datetime = feature(id=2)
    ip: str = feature(id=3)


@meta(owner="data-eng-oncall@fennel.ai")
@featureset
class UserLocationFeaturesRefactored:
    uid: int = feature(id=1)
    latitude: float = feature(id=2)
    longitude: float = feature(id=3)

    @extractor(depends_on=[UserInfo])
    @inputs(Request.uid)
    @outputs(uid, latitude, longitude)
    def get_country_geoid(cls, ts: pd.Series, uid: pd.Series):
        from geopy.geocoders import Nominatim

        df, found = UserInfo.lookup(ts, uid=uid)
        geolocator = Nominatim(user_agent="adityanambiar@fennel.ai")
        coordinates = (
            df["city"]
            .apply(geolocator.geocode)
            .apply(lambda x: (x.latitude, x.longitude))
        )
        df["uid"] = uid
        df["latitude"] = coordinates.apply(lambda x: round(x[0], 2))
        df["longitude"] = coordinates.apply(lambda x: round(x[1], 2))
        return df[["uid", "latitude", "longitude"]]`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'shared/CodeBlock',
  component: CodeBlock,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CodeBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CodeBlock> = (args) => <CodeBlock {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	code: LONG_EXAMPLE_CODE,
	onCopy: () => alert('Copied to clipbaord'),
	language: 'python',
}

export const ShowFilename = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ShowFilename.args = {
	code: EXAMPLE_CODE,
	toolbar: true,
	onCopy: () => alert('Copied to clipbaord'),
	filename: "user_dataset.py",
	language: 'python',
}

export const NoToolbar = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoToolbar.args = {
	code: EXAMPLE_CODE,
	toolbar: false,
	language: 'python',
}
