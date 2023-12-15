import { useTheme } from '@emotion/react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Theme } from 'styles';
import { rgba } from 'styles/utils';
import { Hero, Button, TitleBlock, TextBlock, Footer } from 'ui';
import ArrowNarrowUpRightIcon from 'ui/icons/arrow-narrow-up-right.svg'
import PythonIcon from 'ui/icons/python.svg';
import ClockRefreshIcon from 'ui/icons/clock-refresh.svg';
import CubeIcon from 'ui/icons/cube-01.svg';
import SearchIcon from 'ui/icons/search.svg';
import PlayButton from 'ui/icons/play.svg';

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
                    mask: 'linear-gradient(180deg, black, black, transparent)',
                    WebkitMask: 'linear-gradient(180deg, black, black, transparent)',
                }}>
                <div
                    style={{
                        width: '100%',
                        maxWidth: '77.5rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        padding: '0 0.5rem',
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
                    >
                        <div style={{
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: '50%',
                            width: '100%',
                            zIndex: 1
                        }}>
                            <Button variant='glass-highlight' icon={<PlayButton />} color='neutral' label='See Fennel in Action' direction='row-reverse' shape='pill' />
                        </div>
                        <div style={{
                            borderRadius: '1.5rem',
                            filter: `drop-shadow(0px -100px 217px ${rgba(theme.shadow, theme.type === 'dark' ? 0.32 : 0.08)})`,
                            width: '100%',
                            height: '100%'
                        }}>
                            <div style={{
                                WebkitMaskImage: `linear-gradient(to top, rgba(0, 0, 0, 0) 32%, rgba(0, 0, 0, 1) 100%)`,
                                flexShrink: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0.64,
                            }} >
                                <img width="100%" src="https://fennel.ai/_next/image?url=%2Fimages%2Fship_faster.png&w=3840&q=75" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div style={{
                width: '100%',
                maxWidth: '77.5rem',
                marginLeft: 'auto',
                marginRight: 'auto',
                padding: '0 0.5rem',
            }}>
                <TitleBlock>
                    <h2>Ship Features 100x Faster. Yes, 100x.</h2>
                </TitleBlock>
                <div style={{
                    	display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        rowGap: '1.5rem',
                        columnGap: '1rem',
                        margin: '40px 0'
                    
                }}>
                    <TextBlock icon={<PythonIcon />}>
                        <b>Real Python. No DSLs.</b><br />
                        No DSL, no Spark or Flink jobs. Plain old Python & Pandas means zero learning curve for you.
                    </TextBlock>
                    <TextBlock icon={<ClockRefreshIcon />}>
                        <b>Automatic Backfills</b><br />
                        Pipelines backfill automatically on declaration - no more pesky one off scripts.
                    </TextBlock>
                    <TextBlock icon={<CubeIcon />}>
                        <b>Fully-Managed Infrastructure</b><br />
                        Fennel brings up & manages everything that is needed - zero dependencies on your prod infra.
                    </TextBlock>
                    <TextBlock icon={<SearchIcon />}>
                        <b>Feature repository for reuse</b><br />
                        Write standardized features once, share & reuse across all your use cases.
                    </TextBlock>
                </div>
            </div>
            <Footer/>
        </div>
    )
};

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
