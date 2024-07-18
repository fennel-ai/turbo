import { useTheme } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { rgba } from 'styles/utils';
import { Video, Hero, VIDEO_STATE} from 'ui';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
	title: 'Layout/VideoHero',
	component: Video,
	// More on argTypes: https://storybook.js.org/docs/react/api/argtypes
	argTypes: {},
} as ComponentMeta<typeof Video>;

const getSampleOverlay = ({state, actions}: any) => {
    return state==VIDEO_STATE.PAUSED && <div style={{
        position: 'absolute',
        left: '0px',
        top: '0px',
        color: '#FFF',
        background: 'red',
        width: '100%',
        height: '100%',
    }} onClick={actions.onPlay}>
        Sample Overlay
    </div>
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Video> = () => {
    const theme = useTheme();
    return (
        <div>
            <Hero title={"See Fennel in Action"} text={"Check out our introductory video below to learn more about what you can achieve with Fennel."} />
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: '77.5rem',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    padding: '0 0.5rem',
                    marginTop: '-12rem',
                    zIndex: 10,
                    height: '35rem',
                }}
            >
                <div
                    style={{
                        width: '100%',
                        borderRadius: 24,
                        background: rgba(theme.surface, 0.64),
<<<<<<< HEAD
                        border: `0.5px solid ${theme.border.light}`,
=======
                        border: `0.5px solid ${theme.border}`,
>>>>>>> 2da07ea50d653211e88c983bdaef0314c250e545
                        height: '46.5rem',
                        backdropFilter: 'blur(1.5rem)',
                        boxShadow: `0px 2.26915px 1.54966px 0px ${rgba(theme.shadow, 0.01)}, 0px 5.45308px 3.72406px 0px ${rgba(theme.shadow, 0.01)}, 0px 10.26767px 7.01207px 0px ${rgba(theme.shadow, 0.01)}, 0px 18.31577px 12.50833px 0px ${rgba(theme.shadow, 0.02)}, 0px 34.25764px 23.39546px 0px ${rgba(theme.shadow, 0.02)}, 0px 82px 56px 0px ${rgba(theme.shadow, 0.03)}`,
                    }}
                >
                    <div style={{width: "100%", padding: '20px', height: '100%'}}><Video url="https://www.youtube.com/watch?v=S8xk3E-Zvz4" getOverlay={getSampleOverlay}/></div>
                </div>
                
            </div>
        </div>
    )
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
