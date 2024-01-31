import styled from '@emotion/styled';
import { Page } from 'contentlayer/generated';

const NavigationItem = styled.li<{ active: boolean, fade: boolean, status: Page['status'] }>`
	font-size: 1rem;
	height: 2rem;
	color: ${({ active, theme }) => active ? theme.primary.accent : theme.on_alt};
	font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.medium};
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
		background-color: ${({ status, theme }) => {
			switch (status) {
				case 'draft': { return theme.border.light }
				case 'wip': { return theme.caution.accent }
				case 'published': { return theme.success.accent }
			}
		}};
		display: ${process.env.NODE_ENV === 'development' ? 'block' : 'none'};
	}

	&:hover {
		color: ${({ active, theme }) => active ? theme.primary.accent : theme.on};
	}

	& > a {
		text-decoration: none;
		color: inherit;
		flex: 1;
	}
`;

export default NavigationItem;