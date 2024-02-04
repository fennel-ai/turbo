import { ComponentStory, ComponentMeta } from '@storybook/react';
import styled from '@emotion/styled';

import TwitterIcon from 'ui/icons/twitter.svg';
import { PillButton, TextBlock } from 'ui';

const Root = styled.div`
	width: 100%;
	max-width: 80.5rem;
	margin: 0 auto;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Wrapper = styled.div`
	grid-column: span 3;
`;

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Web/TextBlock',
	component: TextBlock,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof TextBlock>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextBlock> = (args) => (
	<Root>
		<Wrapper>
			<TextBlock {...args} />
		</Wrapper>
	</Root>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {
	icon: <TwitterIcon />,
	children: [<b>Immutability & Versioning</b>, " tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae."]
};

export const WithButton = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithButton.args = {
	icon: <TwitterIcon />,
	children: [<b>Immutability & Versioning</b>, " tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae."],
	button: <PillButton>Learn More</PillButton>,
};