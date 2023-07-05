import styled from '@emotion/styled';
import CopyIcon from '../icons/copy.svg';

import { media, rgba } from 'styles/utils';
import { Syntax } from './Syntax';

type Props = {
	className?: string,
	code: string,
	language: string,
	filename?: string,
	filenameHref?: string,
	toolbar?: boolean,
	onCopy?: () => void
}

const Root = styled.div<{ toolbar?: boolean }>`
	background-color: ${({ theme }) => theme.syntax.plain.background};
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
		box-shadow: 0px 4px 16px 0px ${({ theme }) => rgba(theme.shadow, theme.type === 'dark' ? 0 : 0.32)};
		border: 0.5px solid ${({ theme }) => theme.border};
		border-radius: 1.25rem;
	}
`;

const Toolbar = styled.div`
	height: 3.5rem;
	position: relative;
	display: flex;
	align-items: center;
	gap: 0.5rem;
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

const Filename = styled.a`
	font-size: 0.875rem;
	line-height: 1.5rem;
	font-family: 'Jetbrains Mono', monospace;
	color: ${({ theme }) => rgba(theme.syntax.plain.foreground, 0.64)} !important;
	text-decoration: none;
	position: absolute;
	cursor: pointer;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 40%;
	user-select: none;

	&:hover {
		color: ${({ theme }) => rgba(theme.syntax.plain.foreground, 1)} !important;
	}
	
	&:active {
		color: ${({ theme }) => rgba(theme.syntax.plain.foreground, 0.64)} !important;
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

export const CodeBlock = ({ className, code, filename, filenameHref, language, onCopy, toolbar = true }: Props) => {
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
					{filename ? <Filename target="_blank" rel="noopener noreferrer" href={filenameHref}>{filename}</Filename> : null}
					<CopyButton onClick={handleCopy}>
						Copy
						<CopyIcon />
					</CopyButton>
				</Toolbar>
			) : null}
			<Code toolbar={toolbar} language={language} code={code} />
		</Root>
	);
}