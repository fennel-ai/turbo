import { CSSProperties, useCallback, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import styled from '@emotion/styled';

const style_reset = {
	['pre[class*="language-"]']: {}
}

const lineNumberStyle: CSSProperties = {
    minWidth: '2.5rem',
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
		${({ theme }) => theme.syntax.code.small};
        font-weight: 500;

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
		padding: 1rem;
		padding-left: 0;
		overflow: auto;
	}

	code[class*="language-"]::selection, pre ::selection {
		background: rgb(${({ theme }) => theme.ref.grey['120']}) !important;
	}

	:not(pre)>code[class*="language-"],
	pre {
		background: ${({ theme }) => theme.syntax.plain.background};
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
        position: relative;
        font-size: ${({ theme }) => theme.syntax['lineNumber'].small.fontSize};
        font-weight: ${({ theme }) => theme.syntax['lineNumber'].small.fontWeight};
        line-height: ${({ theme }) => theme.syntax['lineNumber'].small.lineHeight};
        letter-spacing: ${({ theme }) => theme.syntax['lineNumber'].small.letterSpacing};
		pointer-events: none;
		text-align: right;
		user-select: none;
		color: ${({ theme }) => theme.syntax.plain['line-number']};
		min-width: 2.5rem;
        padding-right: 0.75rem;
	}

    [data="highlighted"] .linenumber::after {
        content: '';
        position: absolute;
        right: 0.25rem;
        width: 0.25rem;
        height: ${({ theme }) => theme.syntax['lineNumber'].small.lineHeight};
        background-size: 3px 3px;
        background-repeat: repeat-y;
        background-image: ${({ theme }) => `linear-gradient(-45deg,${theme.color.yellow['70']} 25%,${theme.syntax.plain.background} 25%,${theme.syntax.plain.background} 50%,${theme.color.yellow['70']} 50%,${theme.color.yellow['70']} 75%,${theme.syntax.plain.background} 75%,${theme.syntax.plain.background})`};
    }

	/* Syntax tokens */
	.token.comment,
	.token.prolog,
	.token.doctype,
	.token.cdata {
		color: ${({ theme }) => theme.syntax.plain.foreground };
		opacity: 56%;
	}

	.namespace {
		opacity: .7;
	}

	.token.keyword,
	.token.builtin {
		color: ${({ theme }) => theme.syntax.keyword };
	}

	.token.class-name {
		color: ${({ theme }) => theme.syntax['class-name'] };
	}

	.token.function,
	.token.symbol,
	.token.regex,
	.token.variable,
	.token.constant {
		color: ${({ theme }) => theme.syntax.constant };
	}

	.token.boolean {
		color: ${({ theme }) => theme.syntax.boolean };
	}

	.token.number,
	.token.important {
		color: ${({ theme }) => theme.syntax.number };
	}

	.token.string,
	.token.char,
	.token.url {
		color: ${({ theme }) => theme.syntax.string };
	}

	.token.operator { 
		color: ${({ theme }) => theme.syntax.operator };
	}

	.token.property {
		color: ${({ theme }) => theme.syntax.property };
	}

	.token.punctuation:not(.decorator) {
		color: ${({ theme }) => theme.syntax.punctuation };
	}

	.token.decorator.annotation.punctuation {
		color: ${({ theme }) => theme.syntax['function-call']} !important;
	}
`;

export const Syntax = ({ className, code, language, highlight }: { className?: string, code: string, language: string, highlight?: string }) => {
    const highlights = useMemo(() => {
        let highlights: { start: number, end: number }[] | undefined = [];
        highlights = highlight?.split?.(',').map((line) => line.includes('-') ? {
            start: parseInt(line.split('-')[0]),
            end: parseInt(line.split('-')[1])
        } : { start: parseInt(line), end: parseInt(line) });

        return highlights
    }, [highlight]);

    const lineProps = useCallback((lineNumber: number) => {
        let style: CSSProperties = {};
		let isHighlighted: boolean = false;

        // if (highlights?.length && highlights.every(h => h.start > lineNumber || h.end < lineNumber)) {
        //     style.opacity = 0.64;
        // }
        highlights?.forEach((h) => {
            if (lineNumber >= h.start && lineNumber <= h.end) {
                style.backgroundColor = "rgba(197, 198, 201, 0.06)";
                style.display = "block";
                isHighlighted = true;
            }
        })
        return { style, data: isHighlighted?  'highlighted' : undefined};
    }, [highlights]);

    return (
        <Root className={className}>
            <SyntaxHighlighter
                useInlineStyles={false}
                lineNumberStyle={lineNumberStyle}
                language={language}
                style={style_reset}
                wrapLines={true}
                showLineNumbers 
                lineProps={lineProps}
            >
                {code}
            </SyntaxHighlighter>
        </Root>
    )
};