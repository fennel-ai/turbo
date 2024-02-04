import { forwardRef, MouseEventHandler } from 'react';
import styled from '@emotion/styled';
import SearchIcon from '../icons/search.svg';
import { KeyIndicator } from './KeyIndicator';
import { rgba } from 'styles/utils';

const Root = styled.button`
	position: relative;
	width: 100%;
	height: 2.5rem;
	border-radius: 0.5rem;
	color: ${({ theme }) => theme.on_alt};
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0.75rem;
	background-color: ${({ theme }) => rgba(theme.on, 0.04)};
	border: 0.5px solid ${({ theme }) => rgba(theme.on_alt, 0.06)};
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
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.primary.semibold};
	}
`;

const ShortcutIndicator = styled(KeyIndicator)`
	opacity: 0.64;
`;

type Props = {
	onClick?: MouseEventHandler<HTMLButtonElement>;
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
