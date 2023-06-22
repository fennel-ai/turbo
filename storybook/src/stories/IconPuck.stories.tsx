import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconPuck } from 'ui';
import DefaultIcon from 'ui/icons/help-circle.svg';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Shared/IconPuck',
	component: IconPuck,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof IconPuck>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconPuck> = (args) => <IconPuck {...args} />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	children: <DefaultIcon />,
};