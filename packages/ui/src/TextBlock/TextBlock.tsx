import { PropsWithChildren, ReactElement, StyleHTMLAttributes } from "react";
import styled from '@emotion/styled';
import { media } from "styles/utils";

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
	font-size: 0.875rem;
	line-height: 1.25rem;
	font-variation-settings: "wght" 500;
	color: ${({ theme }) => theme.on_alt};

	${media('md')} {
		font-size: 1rem;
		line-height: 1.5rem;
	}

	& b {
		color: ${({ theme }) => theme.on};
		font-variation-settings: "wght" 700;
	}

	& svg {
		color: ${({ theme }) => theme.on};
		display: block;
		flex-shrink: 0;
		width: 1rem;
		height: 1rem;
		position: relative;
		top: 0.125rem;
		margin-bottom: 0.25rem;

		${media('md')} {
			display: inline;
			margin-bottom: 0;
			margin-right: 0.25rem;
		}
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