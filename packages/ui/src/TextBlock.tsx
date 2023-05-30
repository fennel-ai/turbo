import { PropsWithChildren, ReactElement } from "react";
import styled from '@emotion/styled';

type Props = {
	icon?: ReactElement;
}

const Root = styled.p`
	margin: 0;
	font-size: 1rem 
	line-height: 1.5rem;
	font-variation-settings: "wght" 500;

	& b {
		font-variation-settings: "wght" 800;
	}

	& svg {
		flex-shrink: 0;
		width: 1rem;
		height: 1rem;
		position: relative;
		top: 0.125rem;
		margin-right: 0.125rem;
	}
`;

export const TextBlock = (props: PropsWithChildren<Props>) => {
	const { children, icon } = props;
	return (
		<Root>
			{icon ? icon : null}{children}
		</Root>	
	);
};