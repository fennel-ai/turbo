import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Syntax } from 'ui';
import PythonIcon from 'ui/icons/python.svg';

import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { ToolbarTab } from './ToolbarTab';
import { FILES, fileTree } from './dummy_data';
import { rgba } from 'styles/utils';

const Root = styled.div`
    border: 1px solid ${({ theme }) => rgba(theme.on, 0.06)};
    width: 100%;
    height: 33.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: stretch;
    padding: 0.25rem;
    background-color: ${({ theme }) => theme.type !== 'dark' ? "hsla(0, 0%, 100%, 81%)" : rgba(theme.background, 0.81)};
    background-image: linear-gradient(hsla(0, 0%, 7%, 1%),  hsla(0, 0%, 7%, 1%));
    box-shadow: ${({ theme }) => `0px 93px 56px ${rgba(theme.type === 'dark' ? theme.shadow : theme.primary.on_container, 0.02)}, 0px 41px 41px ${rgba(theme.type === 'dark' ? theme.shadow : theme.primary.on_container, 0.03)}, 0px 10px 23px ${rgba(theme.type === 'dark' ? theme.shadow : theme.primary.on_container, 0.03)}`};
    display: grid;
    grid-template-columns: 12.5rem 1fr;
    grid-auto-rows: 1fr;
    gap: 0.25rem;
`;

const Content = styled.div`
    background-color: ${({ theme }) => theme.type !== 'dark' ? "hsla(0, 0%, 98%, 70%)" : rgba(theme.surface, 0.81)};;
    border-radius: calc(1rem - 0.25rem);
    width: 100%;
    height: 100%;
    border: 1px solid ${({ theme }) => rgba(theme.on, 0.04)};
    overflow: scroll;
`; 

const Code = styled.div`
    overflow: hidden;
`;

const CodeHighlight = styled(Syntax)`
	code[class*="language-"],
    pre {
		background: transparent;
	}
`;

const defaultTabs = ['sync.py'];
export const ExampleCodePreview = () => {
    const [currentTabs, setCurrentTabs] = useState<string[]>(defaultTabs);
    const [activeTab, setActiveTab] = useState<number>(0);

    const handleCloseTab = useCallback((index: number) => {
        setCurrentTabs(prev => {
            setActiveTab(prev => {
                if (index === prev) {
                    return 0
                }

                return prev;
            });

            const value = [...prev];
            value.splice(index, 1);
            return value
        })
    }, []);

    const onSelectFile = useCallback((file: string) => {
        setCurrentTabs(prev => {
            let idx = prev.findIndex((p) => p === file);
            if (idx !== -1) {
                setActiveTab(idx);
                return prev
            } else {
                setActiveTab(prev.length);
                return [...prev, file];
            }
        });
    }, []);

    return (
        <Root>
            <Sidebar onSelect={onSelectFile} tree={fileTree} currentFile={currentTabs[activeTab]} />
            <Content>
                <Toolbar active={activeTab} onSelect={setActiveTab} onClose={currentTabs.length > 1 ? handleCloseTab : undefined}>
                    {
                        currentTabs.map((name) => (
                            <ToolbarTab key={name}>
                                <PythonIcon />
                                <p>{name}</p>
                            </ToolbarTab>
                        ))
                    }
                </Toolbar>
                <Code>
                    <CodeHighlight language="python" code={FILES[currentTabs[activeTab]]} />
                </Code>
            </Content>
        </Root>
    )
};