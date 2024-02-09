import styled from '@emotion/styled';
import { PropsWithChildren, ReactElement, useMemo } from "react";
import { media } from "styles/utils";
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

type CodeSnippetProps = {
    className: string,
    filename?: string,
    language?: string,
    snippet?: string,
    snippet_id?: string,
    status?: string,
    message?: string,
    highlight?: string
};

// Wraps our CodeBlock component to override the code prop, either with the children from the original markdown, or the docsnip snippet referenced from the snippet prop.
export const CodeSnippet = (props: PropsWithChildren<CodeSnippetProps>) => {
    const isDocsnip = !!props.snippet_id;
    const children = props.children as ReactElement;

    const className = isDocsnip ? props.className : children.props.className;

	const language = useMemo(() => {
        return props.language || className?.replace("language-", "") || "python"
	}, [className, props.language]);

	return <Root 
        githubUrl={`https://github.com/fennel-ai/client/blob/main/docs/${props.filename}`} 
        code={isDocsnip ? props.snippet : children.props.children} 
        language={language} 
        status={props.status} 
        message={props.message} 
        highlight={props.highlight}
    />;
}