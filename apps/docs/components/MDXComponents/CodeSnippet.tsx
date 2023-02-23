import { css } from "@emotion/react";
import { PropsWithChildren, ReactElement, useMemo } from "react";
import { CodeBlock } from "ui";

const styles = css`
	margin: 1rem 0 2rem 0;
`

export const CodeSnippet = (props: PropsWithChildren<{ className: string }>) => {
	const code = props.children as ReactElement;
	const language = useMemo(() => props.className?.replace("language-", "") || "python", [props.className]);
	
	return <CodeBlock css={styles} code={code.props.children} language={language} />;
}