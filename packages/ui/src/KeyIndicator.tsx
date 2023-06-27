import styled from '@emotion/styled';

const Root = styled.div`
	display: inline-flex;
	height: 1.5rem;
	min-width: 1.5rem;
	padding: 0.125rem;
	user-select: none;
	pointer-events: none;
`;
// TODO - Update the typescript definition for the theme.
const Bubble = styled.div`
	border-radius: 0.375rem;
	background-color: ${({ theme }) => theme.palette.neutral.accent};
	color: ${({ theme }) => theme.palette.neutral['on-accent']};
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-size: 0.75rem;
	line-height: 0.5rem;
	padding-left: 0.25rem;
	padding-right: 0.25rem;
	flex: 1;
	font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold};
`;

export const KeyIndicator = ({ className, label }: { className?: string, label: string }) => {
	return (
		<Root className={className}>
			<Bubble>
				{label}
			</Bubble>
		</Root>
	);
}