import { useTheme } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'styles';
import { rgba } from 'styles/utils';
import { Button, Hero } from 'ui';

import ArrowNarrowUpRightIcon from 'ui/icons/arrow-narrow-up-right.svg';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Layout/Hero',
    component: Hero,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {},
} as ComponentMeta<typeof Hero>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Hero> = () => {
    const theme = useTheme() as Theme;

    return (
        <div>
            <Hero
                actions={[<Button color="primary" shape="pill" label="Read the Documentation" icon={<ArrowNarrowUpRightIcon />} />]}
                title="Realtime Feature Platform. Beautifully Built."
                text="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features."
            />
            <div
                style={{
                    position: 'relative',
                    marginTop: '-12rem',
                    zIndex: 10,
                    height: '35rem',
                    width: '100%',
                    overflow: 'hidden',
                }}>
                <div
                    style={{
                        width: '100%',
                        maxWidth: '77.5rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '0 0.5rem',
                        // WebkitMaskImage: 'linear-gradient(180deg, #000 31.14%, rgba(0, 0, 0, 0.28) 51.69%, rgba(0, 0, 0, 0.00) 81.76%)'
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            borderRadius: 24,
                            background: rgba(theme.surface, 0.64),
                            border: `0.5px solid ${theme.border.light}`,
                            height: '46.5rem',
                            backdropFilter: 'blur(1.5rem)',
                            boxShadow: `0px 2.26915px 1.54966px 0px ${rgba(theme.shadow, 0.01)}, 0px 5.45308px 3.72406px 0px ${rgba(theme.shadow, 0.01)}, 0px 10.26767px 7.01207px 0px ${rgba(theme.shadow, 0.01)}, 0px 18.31577px 12.50833px 0px ${rgba(theme.shadow, 0.02)}, 0px 34.25764px 23.39546px 0px ${rgba(theme.shadow, 0.02)}, 0px 82px 56px 0px ${rgba(theme.shadow, 0.03)}`,
                        }}
                    />
                </div>
            </div>
        </div>
    )
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
