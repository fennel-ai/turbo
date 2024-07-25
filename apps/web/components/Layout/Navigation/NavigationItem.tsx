import styled from '@emotion/styled';
import { Page } from 'contentlayer/generated';

const NavigationItem = styled.li<{ active: boolean, fade: boolean, status: Page['status'] }>`
	font-size: ${({ active }) => active ? "1rem" : "0.875rem"};
	line-height: 1rem;
	color: ${({ active, theme }) => active ? theme.on : theme.on_alt};
	font-variation-settings: 'wght' ${({ active, theme }) => active ? theme.fontWeights.primary.semibold : theme.fontWeights.primary.medium};
	position: relative;
	display: flex;
	align-items: stretch;
	padding: ${({ active }) => active ? "1.5rem" : "0"} 0;
	
	-webkit-transition: all 0.3s ease;
	-moz-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;
	-ms-transition: all 0.3s ease;

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
				case 'draft': { return theme.border }
				case 'wip': { return theme.caution.accent }
				case 'published': { return theme.success.accent }
			}
		}};
		display: ${process.env.NODE_ENV === 'development' ? 'block' : 'none'};
	}

	&:hover {
		color: ${({ theme }) => theme.on};
	}

	& > a {
		text-decoration: none;
		color: inherit;
		flex: 1;
	}
`;

export default NavigationItem;