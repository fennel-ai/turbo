import { forwardRef } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '../icons/search.svg';
import { KeyIndicator } from './KeyIndicator';

const Root = styled.button`
	position: relative;
	width: 100%;
	height: 2.5rem;
	border-radius: 0.5rem;
	color: ${({ theme }) => theme['text-alt']};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.75rem;
	background-color: rgba(${({ theme }) => theme.ref.grey['100']}, 2%);
	border: 1px solid rgba(${({ theme }) => theme.ref.grey['100']}, 8%);
	cursor: pointer;
	overflow: hidden;

	& > svg, & > p {
		transition: 120ms opacity ease-in-out;
		opacity: 0.64;
	}

	&:hover > svg, &:hover > p {
		opacity: 1;
	}

	& svg {
		width: 1rem;
		height: 1rem;
		opacity: 60%;
	}

	& > p {
		opacity: 60%;
		margin: 0;
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0%);
		user-select: none;
		pointer-events: none;
		font-size: 0.875rem;
		line-height: 1rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold}};
	}
`;

const ShortcutIndicator = styled(KeyIndicator)`
	opacity: 0.4;
`;

type Props = {
	onClick?: (e: MouseEvent) => void;
	placeholder?: string;
	ref: React.RefObject<HTMLButtonElement>;
}

export const Searchbar = forwardRef<HTMLButtonElement, Props>(({ onClick, placeholder = "Search" }: Props, ref) => {
	return (
		<Root ref={ref} onClick={onClick}>
			<SearchIcon />
			<p>{placeholder}</p>
			<ShortcutIndicator label="⌘K" />
		</Root>
	);
});

Searchbar.displayName = 'Searchbar';
