import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Canvas } from "@react-three/fiber";
import { Helix } from 'ddd';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'ddd/Helix',
	component: Helix,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof Helix>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Helix> = (args) => (
	<Canvas>
		<Helix {...args} />
	</Canvas>
);

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {};