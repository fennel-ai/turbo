import styled from '@emotion/styled';
import { media, palette } from 'styles/utils';

import Container from 'components/Container';

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
	color: ${palette('on_alt')};
	font-variation-settings: "wght" 700;
	border-bottom: 1px solid ${palette('border')};

	${media('lg')} {
		display: none;
	}

	& p:first-of-type {
		font-variation-settings: "wght" 500;
	}

	& p:last-of-type {
		color: ${palette('on')};
	}
`;

const MobileToolbar = (props) => {
	console.log(props);
	return (
		<Root as="nav">
			<Wrapper>
				<p>{props.section.title}</p>
				<p>/</p>
				<p>{props.metadata.title}</p>
			</Wrapper>
		</Root>
	);
};

export default MobileToolbar;