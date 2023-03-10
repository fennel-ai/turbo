import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled from '@emotion/styled';
import CopyIcon from '../icons/copy.svg';

import { get, media } from 'styles/utils';

type Props = {
	className?: string,
	code: string,
	language: string,
	filename?: string,
	toolbar?: boolean,
	onCopy?: () => void
}

const Root = styled.div<{ toolbar?: boolean }>`
	background-color: ${({ theme }) => theme.syntax.plain.background};
	color: ${({ theme }) => theme.syntax.plain.foreground};
	overflow: hidden;
	position: relative;
	border-radius: 0;

	${media('sm')} {
		box-shadow: ${({ theme }) => theme['code-block'].shadow};
		border-radius: ${({ theme }) => theme['code-block'].radius};
	}

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
		padding-left: 0;
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

	.linenumber {
		${({ theme }) => theme['code-block'].snippet['line-number']};
		pointer-events: none;
		text-align: right;
		user-select: none;
		color: ${({ theme }) => theme.syntax.comment};
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

const CopyButton = styled.button`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	cursor: pointer;
	margin: 0;
	padding: 0;
	outline: 0;
	background: none;
	color: ${({ theme }) => theme.syntax.plain.foreground};
	opacity: 0.5;
	font-size: 0.875rem;
	line-height: 1.5rem;

	&:hover {
		opacity: 1;
	}

	&:active {
		opacity: 0.5;
	}
`;

const style_reset = {
	['pre[class*="language-"]']: {}
}

const line_number_style = {
	minWidth: 0,
	paddingLeft: '1.5rem',
	paddingRight: '1rem'
}

export const CodeBlock = ({ className, code, filename, language, onCopy, toolbar = true }: Props) => {
	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		if (onCopy) onCopy();
	};

	return (
		<Root className={className} toolbar={toolbar}>
			{toolbar ? (
				<Toolbar>
					<FakeButtons>
						<span />
						<span />
						<span />
					</FakeButtons>
					{filename ? <Filename>{filename}</Filename> : null}
					<CopyButton onClick={handleCopy}>
						Copy
						<CopyIcon />
					</CopyButton>
				</Toolbar>
			) : null}
			<SyntaxHighlighter 
				useInlineStyles={false} 
				lineNumberStyle={line_number_style} 
				language={language} 
				style={style_reset} 
				showLineNumbers
			>
				{code}
			</SyntaxHighlighter>
		</Root>
	);
}