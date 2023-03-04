import styled from '@emotion/styled';
import { PropsWithChildren, ReactElement, useMemo } from "react";
import { media } from "styles/utils";
import { CodeBlock } from "ui";
import { allExampleGroups } from 'contentlayer/generated';

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

export const CodeSnippet = (props: PropsWithChildren<{ className: string, snippet?: string }>) => {
	const code = useMemo(() => {
		if (props.snippet) {
			let [groupId, snippetId] = props.snippet.split('/');
			return allExampleGroups.find((g) => g.id === groupId)!.snippets[snippetId] as String;
		}

		return (props.children as ReactElement).props.children;
	}, [props.children, props.snippet])

	const language = useMemo(() => props.className?.replace("language-", "") || "python", [props.className]);

	return <Root filename={props.snippet ? `${props.snippet}.py` : ''} code={code} language={!!props.snippet ? 'python' : language} />;
}