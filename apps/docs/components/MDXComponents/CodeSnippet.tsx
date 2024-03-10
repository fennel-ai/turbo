import { Children, ReactElement, ReactNode, useMemo, useState } from "react";
import styled from '@emotion/styled';
import { media, stateLayer } from "styles/utils";
import { CodeBlock } from "ui";

const Root = styled(CodeBlock)`
	margin: 1rem 0 2rem 0;

	${media('2xs')} {
		margin: 1rem 0 2rem 0;
	}
	
	${media('xs')} {
		margin: 2rem 0 1.5rem 0;
	}

	${media('sm')} {
		margin: 3rem 0rem 2.5rem 0rem;
	}

	${media('md')} {
		margin: 3rem 0 2.5rem 0;
	}
`

const Tabs = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 1.25rem;
    border-bottom: 0.5px solid ${({ theme }) => theme.syntax.plain.border};
    width: 100%;
    height: 2.5rem;
    padding: 0 1rem;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const Tab = styled.div<{ active?: boolean }>`
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    height: 100%;
    cursor: pointer;

    ${stateLayer()}

    &::before {
        inset: 0.25rem -0.5rem;
        border-radius: 0.5rem;
    }
    
    & p {
        display: flex;
        align-items: center;
        height: 100%;
        position: relative;
        opacity: ${({ active }) => active ? 1 : 0.64};
        color: ${({ active, theme }) => active ? theme.on : theme.on_alt};
        transition: 120ms opacity ease-out;

        &::after {
            content: '';
            position: absolute;
            left: 0;
            bottom: 0; 
            right: 0;
            height: 2px;
            opacity: ${({ active }) => active ? 1 : 0};
            background-color: ${({ theme }) => theme.on};
            border-top-left-radius: 2px;
            border-top-right-radius: 2px;        
        }
    }

    &:hover p {
        opacity: 1;
    }
`;

export type CodeSnippetProps = {
    className?: string,
    children: ReactNode | undefined;
    name?: string;
    filename?: string,
    language?: string,
    snippetId?: string,
    status?: string,
    message?: string,
    highlight?: string
};

// Wraps our CodeBlock component to override the code prop, either with the children from the original markdown, or the docsnip snippet referenced from the snippet prop.
export const CodeSnippet = (props: { children: ReactNode }) => {
    const [activeSnippet, setActiveSnippet] = useState<number>(0);
    
    const tabs = Children.toArray(props.children) as ReactElement[];
    const snippet = tabs[activeSnippet] as ReactElement<CodeSnippetProps>;

    const isDocsnip = !!snippet.props.snippetId;
    const children = snippet.props.children as ReactElement;

    const className = isDocsnip ? snippet.props.className : children.props.className;
    const githubUrl = isDocsnip ? `https://github.com/fennel-ai/client/blob/main/docs/${snippet.props.filename}` : undefined;

    // NOTE: If no language is explicitly provided we just assume it's python
	const language = useMemo(() => {
        return snippet.props.language || className?.replace("language-", "") || "python"
	}, [className, snippet.props.language]);

    const header = tabs.length > 1 ? (
        <Tabs>
            {tabs.map((snippet, i) => (
                <Tab key={i} active={i === activeSnippet} onClick={() => setActiveSnippet(i)}>
                    <p>{snippet.props.name || i}</p>
                </Tab>
            ))}
        </Tabs>
    ) : undefined;

	return (
        <Root
            header={header}
            githubUrl={githubUrl}
            code={children.props.children}
            language={language}
            status={snippet.props.status}
            message={snippet.props.message}
            highlight={snippet.props.highlight}
        />
    );
}