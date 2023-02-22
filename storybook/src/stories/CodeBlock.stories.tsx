import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CodeBlock } from 'ui';

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
	code: `# This is a comment
@dataset
class User:
    uid: int = field(key=True)
    dob: datetime
    country: string
    sum_ratings: int
    update_time: datetime = field(timestamp=True)`,
	language: 'python'
}
