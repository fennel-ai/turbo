import { useTheme } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Video } from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Layout/Video',
	component: Video,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof Video>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Video> = () => {
    const theme = useTheme();

    return (
        <div style={{width: '800px', height: '600px'}}>
                <Video url="https://www.youtube.com/watch?v=IWahj6TdOp4"/>
        </div>
    )
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
