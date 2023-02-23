import styled from '@emotion/styled';
import { get } from 'styles/utils';

const NavigationItem = styled.li<{ active: boolean, fade: boolean }>`
	font-size: 1.125rem;
	line-height: 2rem;
	color: ${(props) => props.active ? get('primary.accent') : get('text-alt')};
	font-variation-settings: 'wght' 500;
	opacity: ${({ fade }) => fade ? 0.64 : 1};
	display: flex;
	align-items: stretch;

	&:hover {
		color: ${props => props.active ? get('primary.accent') : get('text')};
	}

	& > a {
		text-decoration: none;
		color: inherit;
		flex: 1;
	}
`;

export default NavigationItem;