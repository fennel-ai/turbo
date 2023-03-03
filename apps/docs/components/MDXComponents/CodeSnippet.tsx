import styled from '@emotion/styled';
import { PropsWithChildren, ReactElement, useMemo } from "react";
import { media } from "styles/utils";
import { CodeBlock } from "ui";

const Root = styled(CodeBlock)`
	margin: 2rem -1.5rem 3rem -1.5rem;

	${media('xs')} {
		margin: 2rem -3rem 3rem -3rem;
	}
	
	${media('sm')} {
		margin: 2rem 0 3rem 0;
	}
`

export const CodeSnippet = (props: PropsWithChildren<{ className: string }>) => {
	const code = props.children as ReactElement;
	const language = useMemo(() => props.className?.replace("language-", "") || "python", [props.className]);
	
	return <Root code={code.props.children} language={language} />;
}