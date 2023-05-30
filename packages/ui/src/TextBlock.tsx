import { PropsWithChildren, ReactElement, StyleHTMLAttributes } from "react";
import styled from '@emotion/styled';

type Props = {
	button?: ReactElement;
	className?: string;
	icon?: ReactElement;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

const Root = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	align-items: flex-start;
`;

const Text = styled.p`
	align-self: stretch;
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
	const { button, children, icon } = props;
	return (
		<Root>
			<Text>
				{icon ? icon : null}{children}
			</Text>	
			{button}
		</Root>
	);
};