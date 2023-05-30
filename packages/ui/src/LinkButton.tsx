import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import InternalLinkIcon from '../icons/arrow-narrow-up-right.svg';

const Root = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	background-color: rgba(24, 24, 37, 0.04);
	backdrop-filter: blur(0.5rem);
	color: rgba(24, 24, 37, 1);
	height: 2rem;
	font-size: 0.875rem;
	line-height: 1.5rem;
	border-radius: 99px;
	padding-left: 0.75rem;
	padding-right: 0.5rem;
	cursor: pointer;
	user-select: none;

	&:hover {
		background-color: rgba(24, 24, 37, 0.08);
	}
	
	&:active {
		background-color: rgba(24, 24, 37, 0.1);
	}
`;

export const LinkButton = (props: PropsWithChildren) => {
	const { children } = props;
	return (
		<Root>
			{children}
			<InternalLinkIcon />
		</Root>
	);
};