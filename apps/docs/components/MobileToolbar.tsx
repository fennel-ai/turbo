import styled from '@emotion/styled';
import { IconButton } from "ui";
import SidebarLeftIcon from 'ui/icons/sidebar-left.svg';
import { media, get } from 'styles/utils';

import Container from 'components/Container';
import { useShell } from 'context/Shell';
import { useLayoutContext } from './Layout';

const Root = styled(Container)`
	grid-column: span 12;
	position: sticky;
	top: 4.5rem;
	left: 0;
	z-index: 1;
	background-color: rgba(255, 255, 255, 0.85);
	backdrop-filter: blur(16px);
`;

const Wrapper = styled.div`
	height: 3rem;
	display: flex;
	align-items: center;
	gap: 0.5rem;
	color: ${get('text-alt')};
	font-variation-settings: "wght" 700;
	border-bottom: 1px solid ${get('border')};

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
		<Root as="nav">
			<Wrapper>
				<IconButton icon={SidebarLeftIcon} onClick={toggleMobileMenu} />
				<p>{section.title}</p>
				<p>/</p>
				<p>{page.title}</p>
			</Wrapper>
		</Root>
	);
};

export default MobileToolbar;