import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled from '@emotion/styled';
import { get } from 'styles/utils';

type Props = {
	code: string,
	language: string,
	filename?: string,
	toolbar?: boolean
}

const Root = styled.div<{ toolbar?: boolean }>`
	background-color: ${({ theme }) => theme.syntax.plain.background};
	color: ${({ theme }) => theme.syntax.plain.foreground};
	box-shadow: ${({ theme }) => theme['code-block'].shadow};
	border-radius: ${({ theme }) => theme['code-block'].radius};
	overflow: hidden;
	margin: 1rem 0 2rem 0;

	code[class*="language-"],
	pre {
		color: ${({ theme }) => theme.syntax.plain.foreground};
		direction: ltr;
		text-align: left;
		white-space: pre;
		word-spacing: normal;
		word-break: normal;
		${({ theme }) => theme['code-block'].snippet.code};

		-moz-tab-size: 4;
		-o-tab-size: 4;
		tab-size: 4;

		-webkit-hyphens: none;
		-moz-hyphens: none;
		-ms-hyphens: none;
		hyphens: none;
	}

	/* Code blocks */
	pre {
		margin: 0;
		padding: 1.5rem;
		padding-top: ${({ toolbar }) => toolbar ? '0.5rem' : '1.5rem'};
		overflow: auto;
	}

	pre ::selection {
		background: rgb(${({ theme }) => theme.ref.grey['300']});
	}

	:not(pre)>code[class*="language-"],
	pre {
		background: ${({ theme }) => theme.syntax.plain.background}
	}

	/* Inline code */
	:not(pre)>code[class*="language-"] {
		padding: .1em;
		border-radius: .3em;
	}


	/* Line Numbers */
	pre.line-numbers {
		position: relative;
		padding-left: 3rem; /* 2rem container width + 1rem spacing between numbers and code lines */
		counter-reset: linenumber;
	}

	pre.line-numbers>code {
		position: relative;
		white-space: inherit;
	}

	.line-numbers .line-numbers-rows {
		${({ theme }) => theme['code-block'].snippet['line-number']};
		position: absolute;
		pointer-events: none;
		top: -0.25rem;
		left: -3rem;
		width: 2rem;

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;

	}

	.line-numbers-rows>span {
		display: block;
		counter-increment: linenumber;
	}

	.line-numbers-rows>span:before {
		content: counter(linenumber);
		color: ${get('syntax.plain.foreground')};
		opacity: 56%;
		display: block;
		text-align: right;
	}

	/* Syntax tokens */
	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: ${get('syntax.plain.foreground')};
		opacity: 56%;
	}

	.namespace {
		opacity: .7;
	}

	.token.keyword,
	.token.builtin {
		color: ${get('syntax.keyword')};;
	}

	.token.class-name {
		color: ${get('syntax.class-name')};
	}

	.token.function,
	.token.symbol,
	.token.regex,
	.token.variable,
	.token.constant {
		color: ${get('syntax.constant')};
	}

	.token.boolean {
		color: ${get('syntax.boolean')};
	}

	.token.number,
	.token.important {
		color: ${get('syntax.number')};;
	}

	.token.string,
	.token.char,
	.token.url {
		color: ${get('syntax.string')};;
	}

	.token.operator { 
		color: ${get('syntax.operator')};;
	}

	.token.property {
		color: ${get('syntax.property')};
	}

	.token.punctuation:not(.decorator) {
		color: ${get('syntax.punctuation')};;
	}

	.token.decorator.annotation.punctuation {
		color: ${get('syntax.function')}; !important;
	}
`;

const Toolbar = styled.div`
	height: 3.5rem;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-left: 1.5rem;
	padding-right: 1.5rem;
`;

const FakeButtons = styled.div`
	display: flex;
	align-items: center;
	gap: 0.75rem;
	& span {
		width: 1rem;
		height: 1rem;
		border-radius: 50%;
		background-color: rgba(255, 255, 255, 0.12);
	}
`;

const Filename = styled.div`
	${({ theme }) => theme['code-block'].filename.text};
	color: ${({ theme }) => theme['code-block'].filename.color};
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
`;

const style_reset = {
	['pre[class*="language-"]']: {}
}

export const CodeBlock = ({ code, filename, language, toolbar = true }: Props) => {
	return (
		<Root toolbar={toolbar}>
			{toolbar ? (
				<Toolbar>
					<FakeButtons>
						<span />
						<span />
						<span />
					</FakeButtons>
					{filename ? <Filename>{filename}</Filename> : null}
				</Toolbar>
			) : null}
			<SyntaxHighlighter language={language} style={style_reset}>
				{code}
			</SyntaxHighlighter>
		</Root>
	);
}