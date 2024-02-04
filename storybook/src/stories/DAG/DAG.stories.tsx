import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ReactFlowProvider } from 'reactflow';
import { DAG } from './DAG';

import { NODES, EDGES } from './constants';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'DAG/FullExample',
	component: DAG,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof DAG>;

const styles = { width: 'calc(100vw - 2rem)', height: 'calc(100vh - 2rem)' };
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof DAG> = (args) => (
	<ReactFlowProvider>
		<div style={styles}>
			<DAG nodes={NODES} edges={EDGES} />
		</div>
	</ReactFlowProvider>
);

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
