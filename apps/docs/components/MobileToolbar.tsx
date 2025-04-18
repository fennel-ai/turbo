import styled from '@emotion/styled';
import { Container, IconButton } from "ui";
import ChevronDownSmall from 'ui/icons/chevron-down-small.svg';
import SidebarLeft from 'ui/icons/sidebar-left.svg';
import { media, get, rgba } from 'styles/utils';

import { useShell } from 'context/Shell';
import { useLayoutContext } from './Layout';
import SearchIcon from 'ui/icons/search.svg';

const Root = styled(Container)`
	height: 3rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	position: relative;
	color: ${({ theme }) => theme.on_alt};
	font-variation-settings: "wght" 600;
	z-index: 0;

	${media('lg')} {
		display: none;
	}

	& p:first-of-type {
		font-variation-settings: "wght" 400;
	}

	& p:last-of-type {
		color: ${({ theme }) => theme.on};
	}
`;

const Border = styled(Container)`
	display: block;	
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 1px;
	z-index: 1;

	& > div {
		width: 100%;
		height: 100%;
		background-color: ${({ theme }) => rgba(theme.on_alt, 0.06)};
	}

	${media('lg')} {
		display: none;
	}
`;

const MenuButton = styled(IconButton)`
	position: relative;
	color: ${({ theme }) => theme.on};
`;


const SearchButton = styled(IconButton)`
	margin-left: auto;
	${media('md')} {
		display: none;
	}
`;

const MobileToolbar = ({ openSearch }: { openSearch: () => void }) => {
	const { toggleMobileMenu } = useShell();
	const { page, section } = useLayoutContext();

	if (!section) {
		return null;
	}
	return (
		<Root as="nav">
			{section.title && page.title ? <>
				<p>{section.title}</p>
				<p>/</p>
				<p>{page.title}</p>
				<MenuButton aria-label="Navigation Menu" icon={ChevronDownSmall} onClick={toggleMobileMenu} />
			</> :
				<MenuButton aria-label="Navigation Menu" icon={SidebarLeft} onClick={toggleMobileMenu} />
			}
			<SearchButton ariaLabel="Search" icon={SearchIcon} onClick={openSearch} size='small' />
			<Border>
				<div />
			</Border>
		</Root>
	);
};

export default MobileToolbar;