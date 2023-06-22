import { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Collapsible } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Shared/Collapsible',
	component: Collapsible,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof Collapsible>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Collapsible> = (args) => {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<div>
			<p>{open ? 'Closed' : 'Open'}</p>
			<button onClick={() => setOpen(prev => !prev)}>Toggle</button>
			<Collapsible {...args} open={open} />
		</div>
	)
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	children: <p>Perspiciatis facilis earum. Qui delectus sed porro rerum tempora voluptates quia quis. Necessitatibus officiis fugiat quaerat consectetur possimus facere.</p>,
};