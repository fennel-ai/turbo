import styled from '@emotion/styled';

type Props = {
	label: string,
};

const Root = styled.button`
	border: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	border-radius: 0.5rem;
	gap: 0.5rem;
	padding: 0 0.75rem;
	font-size: 0.875rem;
	line-height: 1rem;
	height: 2.5rem;
`;

export const Button = ({
	label,
}: Props) => {
	return (
		<Root>
			{label}
		</Root>
	);
};