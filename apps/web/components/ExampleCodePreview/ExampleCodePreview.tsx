import { useCallback, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import { Syntax } from 'ui';
import PythonIcon from 'ui/icons/python.svg';

import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';
import { ToolbarTab } from './ToolbarTab';
import { FILES, fileTree } from './dummy_data';

const Root = styled.div`
    border: 1px solid hsla(0, 0%, 7%, 4%);
    width: 100%;
    height: 33.5rem;
    border-radius: 1rem;
    display: flex;
    align-items: stretch;
    padding: 0.25rem;
    background-color: hsla(0, 0%, 100%, 81%);
    background-image: linear-gradient(hsla(0, 0%, 7%, 1%),  hsla(0, 0%, 7%, 1%));
    box-shadow: 0px 93px 56px rgba(43, 39, 100, 0.02), 0px 41px 41px rgba(43, 39, 100, 0.03), 0px 10px 23px rgba(43, 39, 100, 0.03);
    display: grid;
    grid-template-columns: 12.5rem 1fr;
    grid-auto-rows: 1fr;
    gap: 0.25rem;
`;

const Content = styled.div`
    background-color: hsla(0, 0%, 98%, 70%);
    border-radius: calc(1rem - 0.25rem);
    width: 100%;
    height: 100%;
    border: 1px solid hsla(0, 0%, 7%, 4%);
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
                                <span>{name}</span>
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