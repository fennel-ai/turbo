import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Buttons/PillButton',
	component: Button,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
	label: 'Button',
	color: 'primary',
	variant: "pill"
};

export const PrimaryAlt = Template.bind({});
PrimaryAlt.args = {
	label: 'Button',
	color: 'primary-alt',
	variant: "pill"
};

export const Neutral = Template.bind({});
Neutral.args = {
	label: 'Button',
	color: "neutral",
	variant: "pill"
};
