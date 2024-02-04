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

// Wraps our CodeBlock component to override the code prop, either with the children from the original markdown, or the docsnip snippet referenced from the snippet prop.
export const CodeSnippet = (props: PropsWithChildren<{ className: string, filename?: string, language?: string, snippet?: string, snippet_id?: string, status?: string, message?: string, title?: string }>) => {
	const language = useMemo(() => props.language || props.className?.replace("language-", "") || "python", [props.className, props.language]);
	const short_filename = useMemo(() => props.filename?.split('/').pop(), [props.filename]);

	return <Root filename={short_filename} filenameHref={`https://github.com/fennel-ai/client/blob/main/docs/${props.filename}`} code={props.snippet || (props.children as ReactElement).props.children} language={language} status={props.status} message={props.message} title={props.title}/>;
}