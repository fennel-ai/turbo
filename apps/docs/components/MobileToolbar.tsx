import styled from '@emotion/styled';
import { IconButton } from "ui";
import SidebarLeftIcon from 'ui/icons/sidebar-left.svg';
import { media, get } from 'styles/utils';

import { useShell } from 'context/Shell';
import { useLayoutContext } from './Layout';

const Root = styled.nav`
	height: 3rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: ${get('text-alt')};
	font-variation-settings: "wght" 700;
	border-bottom: 1px solid rgba(${({ theme }) => theme.ref.grey['100']}, 8%);

	${media('lg')} {
		display: none;
	}

	& p:first-of-type {
		font-variation-settings: "wght" 500;
	}

	& p:last-of-type {
		color: ${get('text')};
	}
`;

const MobileToolbar = () => {
	const {toggleMobileMenu} = useShell();
	const { page, section } = useLayoutContext();

	if (!section) {
		return null;
	}
	return (
		<Root>
			<IconButton aria-label="Navigation Menu" icon={SidebarLeftIcon} onClick={toggleMobileMenu} />
			<p>{section.title}</p>
			<p>/</p>
			<p>{page.title}</p>
		</Root>
	);
};

export default MobileToolbar;