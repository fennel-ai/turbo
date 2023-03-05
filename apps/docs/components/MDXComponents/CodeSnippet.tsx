import styled from '@emotion/styled';
import { PropsWithChildren, ReactElement, useMemo } from "react";
import { media } from "styles/utils";
import { CodeBlock } from "ui";

const Root = styled(CodeBlock)`
	margin: 1rem -1rem 3rem -1rem;

	${media('2xs')} {
		margin: 1rem -1.5rem 3rem -1.5rem;
	}

	${media('xs')} {
		margin: 1.5rem -3rem 3rem -3rem;
	}
	
	${media('sm')} {
		margin: 1.5rem 0 3rem 0;
	}
`

export const CodeSnippet = (props: PropsWithChildren<{ className: string, filename?: string, language?: string, snippet?: string }>) => {
	const language = useMemo(() => props.language || props.className?.replace("language-", "") || "python", [props.className, props.language]);

	return <Root filename={props.filename} code={props.snippet || (props.children as ReactElement).props.children} language={language} />;
}