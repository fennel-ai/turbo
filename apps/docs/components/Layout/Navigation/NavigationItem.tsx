import styled from '@emotion/styled';
import { get } from 'styles/utils';
import { DocPage } from 'contentlayer/generated';

const COLOR_MAP: Record<DocPage['status'], string> = {
	draft: 'ref.grey.700',
	wip: 'ref.yellow.600',
	published: 'ref.green.400'
}

const NavigationItem = styled.li<{ active: boolean, fade: boolean, status: DocPage['status'] }>`
	font-size: 1.125rem;
	line-height: 2rem;
	color: ${(props) => props.active ? get('primary.accent') : get('text-alt')};
	font-variation-settings: 'wght' 500;
	opacity: ${({ fade }) => fade ? 0.64 : 1};
	position: relative;
	display: flex;
	align-items: stretch;

	&::before {
		content: '';
		width: 6px;
		height: 6px;
		position: absolute;
		top: calc(50% - 3px);
		left: calc(-16px - 3px);
		border-radius: 50%;
		background-color: rgb(${({ status }) => get(COLOR_MAP[status])});
		display: ${process.env.NODE_ENV === 'development' ? 'block' : 'none'};
	}

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