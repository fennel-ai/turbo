import styled from '@emotion/styled';
import { ThemeProvider } from '@emotion/react';
import { dark as darkTheme } from 'styles';
import { toast } from "react-hot-toast"

import { media, stateLayer } from 'styles/utils';
import { Syntax } from './Syntax';
import CopyIcon from '../icons/copy.svg';
import GithubIcon from '../icons/github.svg'
import XIcon from '../icons/x-circle.svg'
import CheckIcon from '../icons/check-circle.svg'
import { IconButton } from './IconButton';

const Root = styled.div`
	background-color: ${({ theme }) => theme.syntax.plain.background};
	${props => stateLayer({ initial: 0.04, color: props.theme.on_alt, interact: false })}
	color: ${({ theme }) => theme.syntax.plain.foreground};
	overflow: hidden;
	position: relative;
	border-radius: 0;

	${media('sm', 'max')} {
		margin-left: -1rem;
		margin-right: -1rem;
	}

	${media('sm')} {
		border: 0.5px solid ${({ theme }) => theme.border};
		border-radius: 0.5rem;
	}
`;

const Toolbar = styled.div<{ status?: string }>`
	height: 2.5rem;
	position: relative;
	align-items: center;
	gap: 0.5rem;
	justify-content: space-between;
	align-self: stretch;
	display: flex;
	padding: 0.25rem 1rem;
	color: ${({ theme, status }) => status === "success" ? theme.color.green['90'] : status === "error" ? theme.color.red['90'] : theme.on};
	border-top: 0.5px solid ${({ theme }) => theme.syntax.plain.border};
    ${stateLayer({ initial: 0.04, interact: false })};
`;

const Code = styled(Syntax)`
	& > pre {
		padding-top: 0.75rem;
        background: transparent;
		padding-bottom: 0.75rem;
	}
`;

const Message = styled.div`
	color: currentColor;
	display: flex;
	align-items: center;
	gap: 0.5rem;
    font-size: ${({ theme }) => theme.label.small!.fontSize};
    font-weight: ${({ theme }) => theme.label.small!.fontWeight};
    line-height: ${({ theme }) => theme.label.small!.lineHeight};
`

const Actions = styled.div`
    text-transform: capitalize;
    height: 2rem;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    color: ${({ theme }) => theme.on_alt};
    & > p {
        margin: 0;
        font-size: ${({ theme }) => theme.label.small!.fontSize};
        font-weight: ${({ theme }) => theme.label.small!.fontWeight};
        line-height: ${({ theme }) => theme.label.small!.lineHeight};
    }
`

const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`

const getStatusIcon = (status?: string) => {
	switch(status) {
		case 'error':
			return <XIcon/>
		case 'success':
			return <CheckIcon/>
		default:
			return ''
	}
}

type Props = {
    className?: string;
    code: string;
    language: string;
    githubUrl?: string;
    header?: JSX.Element;
    toolbar?: boolean;
    onCopy?: () => void;
    message?: string;
    status?: string;
    title?: string;
    highlight?: string;
}

export const CodeBlock = ({ 
    className, 
    code, 
    githubUrl, 
    header,
    language, 
    onCopy, 
    toolbar = true, 
    message, 
    status, 
    highlight 
}: Props) => {
	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		if (onCopy) onCopy();
		toast.success(`Copied snippet`);
	};

	return (
        <Root className={className}>
                <ThemeProvider theme={darkTheme}>
                    {header || null}
                </ThemeProvider>
                <Code 
                    language={language} 
                    code={code.trimEnd()} 
                    highlight={highlight} 
                />
                {toolbar ? (
                    <ThemeProvider theme={darkTheme}>
                        <Toolbar status={status}>
                            <Message>
                                {(status?.length || message?.length) ? <>
                                    {getStatusIcon(status)}<div>{message}</div>
                                </> : ''}
                            </Message>
                            <Actions>
                                <p>{language}</p>
                                <ActionButtons>
                                    {githubUrl ? <IconButton icon={GithubIcon} size='small' onClick={() => window.open(githubUrl, "_blank")} /> : null}
                                    <IconButton icon={CopyIcon} size='small' onClick={handleCopy} />
                                </ActionButtons>
                            </Actions>
                        </Toolbar>
                    </ThemeProvider>
                ) : null}
            </Root>
	);
}