import { PropsWithChildren, ReactElement, useMemo } from "react";
import { CodeBlock } from "ui";

export const CodeSnippet = (props: PropsWithChildren<{ className: string }>) => {
	const code = props.children as ReactElement;
	const language = useMemo(() => props.className?.replace("language-", "") || "python", [props.className]);
	
	return <CodeBlock code={code.props.children} language={language} />
}