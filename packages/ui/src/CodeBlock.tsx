import styled from '@emotion/styled';
import CopyIcon from '../icons/copy.svg';

import { media, rgba } from 'styles/utils';
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
		box-shadow: 0px 33px 22px 0px rgba(47, 47, 65, 0.13), 0px 16.516000747680664px 11.01099967956543px 0px rgba(47, 47, 65, 0.10), 0px 9.949000358581543px 6.631999969482422px 0px rgba(47, 47, 65, 0.08), 0px 6.375999927520752px 4.25px 0px rgba(47, 47, 65, 0.07), 0px 4.131999969482422px 2.755000114440918px 0px rgba(47, 47, 65, 0.06), 0px 2.6010000705718994px 1.7339999675750732px 0px rgba(47, 47, 65, 0.06), 0px 1.4950000047683716px 0.9959999918937683px 0px rgba(47, 47, 65, 0.05), 0px 0.6579999923706055px 0.4390000104904175px 0px rgba(47, 47, 65, 0.03);
		border-radius: 1.25rem;
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

const Filename = styled.a`
	font-size: 0.875rem;
	line-height: 1.5rem;
	font-family: 'Jetbrains Mono', monospace;
	color: ${({ theme }) => rgba(theme.syntax.plain.foreground, 0.64)} !important;
	text-decoration: none;
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	cursor: pointer;
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
					{filename ? <Filename target="_blank" rel="noopener noreferrer" href={`https://github.com/fennel-ai/client/blob/main/docs/${filename}`}>{filename}</Filename> : null}
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