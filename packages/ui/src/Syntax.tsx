import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled from '@emotion/styled';

import { get } from 'styles/utils';

const style_reset = {
	['pre[class*="language-"]']: {}
}

const line_number_style = {
	minWidth: 0,
	width: '3rem',
	paddingRight: '1rem'
}

const Root = styled.div`
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
		width: 2rem;
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

export const Syntax = ({ className, code, language }: { className?: string, code: string, language: string }) => (
	<Root className={className}>
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