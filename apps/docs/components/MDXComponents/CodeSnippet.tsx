import { CodeBlock } from "ui";

export const CodeSnippet = (props) => {
	return <CodeBlock code={props.children.props.children} language="" />;
}