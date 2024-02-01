import styled from '@emotion/styled';
import { Page } from 'contentlayer/generated';
import { rgba } from "styles/utils";

const NavigationItem = styled.li<{ active: boolean, fade: boolean, status: Page['status'] }>`
	font-size: 0.875rem;
	height: 2rem;
	color: ${({ active, theme }) => active ? theme.on : theme.on_alt};
	font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.medium};
	position: relative;
	display: flex;
	align-items: center;
	padding-left: 1rem;
	border-left:  1px solid ${({ theme, active }) => active ? theme.primary.accent : theme.border.light};

	&::after {
		content: '';
		width: 6px;
		height: 6px;
		margin-right: 50px;
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
		background-color: ${({ theme }) => rgba(theme.border.light, 0.04)};
		border-radius: 0 5px 5px 0;
	}

	& > a {
		text-decoration: none;
		color: inherit;
		flex: 1;
	}
`;

export default NavigationItem;