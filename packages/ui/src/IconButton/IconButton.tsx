import { ComponentType, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { media, stateLayer } from 'styles/utils';

type Props = {
	ariaLabel?: string;
	className?: string,
	icon: ComponentType,
	onClick?: MouseEventHandler<HTMLButtonElement>,
}

const Root = styled.button`
	border: 0;
	background: none;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 0.5rem;
	cursor: pointer;
	color: currentColor; 
	overflow: hidden;
	width: 2rem;
	height: 2rem;

	& svg {
		flex-shrink: 0;
		width: 1.25rem;
		height: 1.25rem;
	}

	${stateLayer()};

	${media('md')} {
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.75rem

		& svg {
			width: 1.5rem;
			height: 1.5rem;
		}
	}
`;

export const IconButton = ({ ariaLabel, className, icon: Icon, onClick }: Props) => {
	return (
		<Root aria-label={ariaLabel} className={className} onClick={onClick}>
			<Icon />
		</Root>
	);
};