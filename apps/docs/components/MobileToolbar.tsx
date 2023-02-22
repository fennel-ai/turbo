import styled from '@emotion/styled';
import { IconButton } from "ui";
import SidebarLeftIcon from 'ui/icons/sidebar-left.svg';
import { media, get } from 'styles/utils';

import Container from 'components/Container';
import { ManifestPage, NavigationSection, NavigationTree } from 'lib/utils';

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

type Props = {
	metadata: ManifestPage,
	navigation: NavigationTree,
	section: NavigationSection
}

const MobileToolbar = (props: Props) => {
	return (
		<Root as="nav">
			<Wrapper>
				<IconButton icon={SidebarLeftIcon} />
				<p>{props.section.title}</p>
				<p>/</p>
				<p>{props.metadata.title}</p>
			</Wrapper>
		</Root>
	);
};

export default MobileToolbar;