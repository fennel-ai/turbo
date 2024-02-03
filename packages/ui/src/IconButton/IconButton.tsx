import { ComponentType, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import { media, stateLayer } from 'styles/utils';
import { css } from '@emotion/react';

export const SIZE = {
    'small': () => css`
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;

        & svg {
            width: 1rem;
            height: 1rem;
        }
    `,
    'default': () => css`
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;

        & svg {
            width: 1.25rem;
            height: 1.25rem;
        }
    `,
    'large': () => css`
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.75rem;

        & svg {
            width: 1.5rem;
            height: 1.5rem;
        }
    `,
}

const Root = styled.button<{
    size: keyof typeof SIZE,
}>`
    ${(props) => SIZE[props.size]};
	border: 0;
	background: none;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	color: currentColor; 
	overflow: hidden;
	cursor: pointer;

	& svg {
        pointer-events: none;
		flex-shrink: 0;
        color: ${({ theme }) => theme.on_alt};
	}

    &:hover svg {
        color: ${({ theme }) => theme.on};
    }

	${stateLayer()};
`;

type Props = {
    ariaLabel?: string;
    className?: string,
    icon: ComponentType,
    onClick?: MouseEventHandler<HTMLButtonElement>,
    size: keyof typeof SIZE,
}

export const IconButton = ({ ariaLabel, className, icon: Icon, onClick, size = 'default' }: Props) => {
	return (
		<Root aria-label={ariaLabel} className={className} onClick={onClick} size={size}>
			<Icon />
		</Root>
	);
};