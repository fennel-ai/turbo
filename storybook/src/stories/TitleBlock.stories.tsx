import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled';

import { TitleBlock } from 'ui';

const Root = styled.div`
	width: 100%;
	max-width: 80.5rem;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Wrapper = styled.div`
	grid-column: 3 / span 8;
`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Web/TitleBlock',
	component: TitleBlock,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof TitleBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TitleBlock> = (args) => (
	<Root>
		<Wrapper>
			<TitleBlock {...args} />
		</Wrapper>
	</Root>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	center: false,
	children: (
		<>
			<h6>Redefine your ML ops</h6>
			<h2>Realtime Feature Platform. Beautifully Built.</h2>
			<p>Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features.</p>
		</>
	)
};

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
	center: true,
	children: (
		<>
			<h6>Redefine your ML ops</h6>
			<h1>Realtime Feature Platform. Beautifully Built.</h1>
			<p>Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features.</p>
		</>
	)
};

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
	center: true,
	children: (
		<>
			<h6>Redefine your ML ops</h6>
			<h3>Realtime Feature Platform. Beautifully Built.</h3>
			<p>Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features.</p>
		</>
	)
};

