import styled from '@emotion/styled';
import CopyIcon from '../icons/copy.svg';

import { media, rgba, stateLayer } from 'styles/utils';
import { Syntax } from './Syntax';
import GithubIcon from '../icons/github.svg'
import XIcon from '../icons/x-circle.svg'
import CheckIcon from '../icons/check-circle.svg'

type Props = {
	className?: string,
	code: string,
	language: string,
	filename?: string,
	filenameHref?: string,
	toolbar?: boolean,
	onCopy?: () => void,
	message?: string;
	status?: string;
	title?: string;
}

const Root = styled.div<{ toolbar?: boolean }>`
	background-color: ${({ theme }) => theme.syntax.plain.background};
	${props => stateLayer(0.04, props.theme.on_alt)}
	color: ${({ theme }) => theme.syntax.plain.foreground};
	overflow: hidden;
	position: relative;
	border-radius: 0;

	${media('sm', 'max')} {
		&::before {
			content: "";
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.1);
		}
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
	border-bottom: 0.5px solid ${({ theme }) => theme.syntax.plain.border};
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

const Filename = styled.a`
	color: ${({ theme }) => rgba(theme.syntax.plain.foreground, 0.64)} !important;
	cursor: pointer;
	display: flex;

	&:hover {
		color: ${({ theme }) => rgba(theme.syntax.plain.foreground, 1)} !important;
	}
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

const Code = styled(Syntax)<{ toolbar: boolean }>`
	& > pre {
		padding-top: ${({ toolbar }) => toolbar ? '0.5rem' : '1rem'};
	}
`;

const InfoBar=styled.div<{ status?: string}>`
	display: flex;
	height: 2.5rem;
	padding-left: 1.5rem;
	align-items: center;
	gap: 0.5rem;
	border-top: 0.5px solid ${({ theme }) => theme.syntax.plain.border};
	color:  ${({ theme, status }) => status === "success" ? theme.success.accent : status === "error" ? theme.error.accent : theme.on}

`
const Title = styled.div`
	text-transform: uppercase;
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

export const CodeBlock = ({ className, code, filename, filenameHref, language, onCopy, toolbar = true, message, status, title }: Props) => {
	const handleCopy = () => {
		navigator.clipboard.writeText(code);
		if (onCopy) onCopy();
	};

	return (
		<Root className={className} toolbar={toolbar}>
			{toolbar ? (
				<Toolbar>
					<Title>
						{title?.length ? title : 'Example'}
					</Title>
					<Actions>
					{language}
					{filename && <Filename target="_blank" rel="noopener noreferrer" href={filenameHref}><GithubIcon/></Filename>}
					<CopyButton onClick={handleCopy}>
						<CopyIcon />
					</CopyButton>
					</Actions>
				</Toolbar>
			) : null}
			<Code toolbar={toolbar} language={language} code={code} />
			{(status?.length || message?.length) && (
			<InfoBar status={status}>
				{getStatusIcon(status)}<div>{message}</div>
			</InfoBar>)}
		</Root>
	);
}