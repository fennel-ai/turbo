import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MouseEventHandler, useRef } from 'react';

import { GlassCard } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
 	title: 'Shared/GlassCard',
	component: GlassCard,
} as ComponentMeta<typeof GlassCard>;

const gridStyles = {
	paddingLeft: '2rem',
	paddingRight: '2rem',
	width: '100%',
	maxWidth: '960px',
	display: 'grid',
	gridAutoRows: '282px',
	gridAutoColumns: '0.5fr'
};

// The template here initializes some mouse handlers to show the "Glass Shimmer" effect.
const Template: ComponentStory<typeof GlassCard> = (args) => {
	const el = useRef<HTMLDivElement>(null);

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
		if (el.current) {
			el.current.style.setProperty('--mouse-x', `${e.pageX}`);
			el.current.style.setProperty('--mouse-y', `${e.pageY}`);
		}
	};

	function handleMouseEnter() {
		if (el.current) {
			el.current.style.setProperty('--global-shimmer-alpha', "0.6");
		}
	}

	function handleMouseLeave() {
		if (el.current) {
			el.current.style.setProperty('--global-shimmer-alpha', "0");
		}
	}

	return (
		<div ref={el} style={gridStyles} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
			<GlassCard {...args}><p>Content</p></GlassCard>
		</div>
	)
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};