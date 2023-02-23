import { ComponentStory, ComponentMeta } from '@storybook/react';

import { KeyIndicator } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Shared/KeyIndicator',
	component: KeyIndicator,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof KeyIndicator>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof KeyIndicator> = (args) => <KeyIndicator {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	label: 'R'
};

export const Search = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Search.args = {
	label: '⌘K'
};

