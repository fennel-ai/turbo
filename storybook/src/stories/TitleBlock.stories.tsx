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
	align: 'left',
	size: 'default',
	subtitle: "Redfine your ML & Data Ops",
	title: "Feature Engineering for Modern Data Scientists",
	text: "Enterprise-grade ML infrastructure for teams of all sizes. Fennel is a feature engineering platform designed to help you store, serve, discover and scale with ease."
};

export const Large = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Large.args = {
	size: 'large',
	subtitle: "Redfine your ML & Data Ops",
	title: "Feature Engineering for Modern Data Scientists",
	text: "Enterprise-grade ML infrastructure for teams of all sizes. Fennel is a feature engineering platform designed to help you store, serve, discover and scale with ease."
};

