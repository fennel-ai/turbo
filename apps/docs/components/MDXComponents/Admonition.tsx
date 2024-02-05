import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { get, media, rgba } from 'styles/utils';

import AlertCircleIcon from 'ui/icons/alert-circle.svg';
import InfoCircleIcon from 'ui/icons/info-circle.svg';
import ZapCircleIcon from 'ui/icons/zap-circle.svg';

const TYPE_MAP = {
	info: {
		title: 'Note',
		icon_color: 'primary.accent',
		text_color: 'primary.accent',
		dark_text_color: 'syntax.char'
	},
	warning: {
		title: 'Warning',
		icon_color: 'caution.accent',
		text_color: 'caution.accent',
		dark_text_color: 'caution.accent'
	}, 
	tip: {
		title: 'Tip',
		icon_color: 'on',
		text_color: 'on',
		dark_text_color: 'on'
	}
}

const ICON_MAP = {
	info: InfoCircleIcon,
	warning: AlertCircleIcon,
	tip: ZapCircleIcon,
}

type Props = {
	type: keyof typeof TYPE_MAP;
};

const Root = styled.div<{ type: Props['type'] }>`
	padding: 0rem 1rem;
	margin: 0.5rem 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	width: max-content;
	max-width: 100%;
	font-size: 0.875rem;
	font-weight: ${props => props.theme.fontWeights.primary.bold};
	border-left: 1px solid ${({ type,theme }) => rgba(get(TYPE_MAP[type].icon_color)({theme}), 1)};
	& > p {
		color: ${({theme }) => theme.on_alt};
		margin-bottom: 0 !important;
		font-size: 1rem !important;
		line-height: 1.75rem !important;
	}
`;

const Title = styled.div<{type: Props['type']}>`
	color: ${({ type,theme }) => rgba(get(TYPE_MAP[type].text_color)({theme}), 1)}};
	line-height: 1rem;
`;

export const Admonition = ({ children, type }: PropsWithChildren<Props>) => {
	return (
		<Root type={type}>
			<Title type={type}>
				{TYPE_MAP[type].title}
			</Title>
			{children}
		</Root>
	)
}