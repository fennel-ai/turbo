import styled from '@emotion/styled';

const Root = styled.div`
	display: inline-flex;
	height: 1.5rem;
	min-width: 1.5rem;
	padding: 0.125rem;
`;

const Bubble = styled.div`
	border-radius: 0.375rem;
	background-color: ${({ theme }) => theme.inv.bg.muted};
	color: ${({ theme }) => theme.inv.fg.default};
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

export const KeyIndicator = ({ label }: { label: string }) => {
	return (
		<Root>
			<Bubble>
				{label}
			</Bubble>
		</Root>
	);
}