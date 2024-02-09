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

type Props = {
	className?: string;
	code: string;
	language: string;
    githubUrl?: string;
	toolbar?: boolean;
	onCopy?: () => void;
	message?: string;
	status?: string;
	title?: string;
	highlight?: string;
}

const Root = styled.div<{ toolbar?: boolean }>`
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

const Toolbar = styled.div`
	height: 2.5rem;
	position: relative;
	align-items: center;
	gap: 0.5rem;
	justify-content: space-between;
	align-self: stretch;
	display: flex;
	padding: 0.25rem 1rem;
	color:${({ theme }) => theme.on_alt};
	border-top: 0.5px solid ${({ theme }) => theme.syntax.plain.border};
`;

const Code = styled(Syntax)<{ toolbar: boolean }>`
	& > pre {
		padding-top: 0.75rem;
        background: transparent;
		padding-bottom: 0.75rem;
	}
`;

const Title = styled.div<{ status?: string }>`
	color: ${({ theme, status }) => status === "success" ? theme.success.accent : status === "error" ? theme.error.accent : theme.on};
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-size: 0.875rem;
`

const Actions = styled.div`
    text-transform: capitalize;
    display: flex;
    height: 2rem;
    justify-content: flex-end;
    align-items: center;
    gap: 1rem;
    font-size: 0.875rem;
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

export const CodeBlock = ({ 
    className, 
    code, 
    githubUrl, 
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
		<ThemeProvider theme={darkTheme}>
            <Root className={className} toolbar={toolbar}>
                <Code toolbar={toolbar} language={language} code={code.trimEnd()} highlight={highlight}/>
                {toolbar ? (
                    <Toolbar>
                        <Title status={status}>
                            {(status?.length || message?.length) ? <>
                                {getStatusIcon(status)}<div>{message}</div>
                            </> : ''}
                        </Title>
                        <Actions>
                            {language}
							<ActionButtons>
                                {githubUrl && <IconButton icon={GithubIcon} size='small' onClick={() => window.open(githubUrl, "_blank")} />}
                                <IconButton icon={CopyIcon} size='small' onClick={handleCopy} />
							</ActionButtons>
                        </Actions>
                    </Toolbar>
                ) : null}
            </Root>
        </ThemeProvider>
	);
}