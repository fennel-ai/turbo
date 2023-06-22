import styled from '@emotion/styled';
import CopyIcon from '../icons/copy.svg';

import { media } from 'styles/utils';
import { Syntax } from './Syntax';

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

const Code = styled(Syntax)<{ toolbar: boolean }>`
	& > pre {
		padding-top: ${({ toolbar }) => toolbar ? '0.5rem' : '1.5rem'};
	}
`;

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
			<Code toolbar={toolbar} language={language} code={code} />
		</Root>
	);
}