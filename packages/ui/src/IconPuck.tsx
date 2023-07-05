import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { rgba } from 'styles/utils';

const Root = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.75rem;
	background-color: rgb(${({ theme }) => theme.ref.purple['70']});
	box-shadow: 0px 0px 0px 2px ${({ theme }) => theme.border};
	color: ${({ theme }) => rgba(theme.primary.on, 0.8)};
	width: 3rem;
	height: 3rem;

	& > svg {
		filter: drop-shadow(0px 4px 3px rgba(${({ theme }) => theme.ref.purple['10']}, 0.24));
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export const IconPuck = ({ children }: PropsWithChildren) => (
	<Root>
		{children}
	</Root>
);