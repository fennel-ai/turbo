import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SubmittableInput } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Inputs/SubmittableInput',
	component: SubmittableInput,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof SubmittableInput>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SubmittableInput> = (args) => (
    <SubmittableInput {...args} />

);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
    placeholder: "Enter your email"
};

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
    placeholder: "Enter your email",
    size: 'large'
};
