import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { get, media, rgba } from 'styles/utils';

import AlertCircleIcon from 'ui/icons/alert-circle.svg';
import InfoCircleIcon from 'ui/icons/info-circle.svg';
import ZapCircleIcon from 'ui/icons/zap-circle.svg';

const TYPE_MAP = {
	info: {
		title: 'Info',
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
	padding: 0.5rem 0.75rem;
	margin: 0.5rem 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.75rem;
	width: max-content;
	max-width: 100%;
	border-left: 1px solid ${({ type,theme }) => rgba(get(TYPE_MAP[type].icon_color)({theme}), 1)};
	& > p {
		color: ${({ type,theme }) => rgba(get(TYPE_MAP[type][(theme.type === "dark" ? 'dark_text_color' : 'text_color')])({theme}), 1)};
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" ${props => props.theme.fontWeights.medium};
	}
`;

const Title = styled.div<{ type: Props['type'] }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;

	& svg {
		margin: 0.25rem 0;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		fill: ${({ type,theme }) => rgba(get(TYPE_MAP[type].icon_color)({theme}), 1)};
		color: ${({ theme }) => theme.background};
	}

	& p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" ${props => props.theme.fontWeights.bold};
	}
`;

export const Admonition = ({ children, type }: PropsWithChildren<Props>) => {
	const Icon = ICON_MAP[type];
	return (
		<Root type={type}>
			<Title type={type}>
				<Icon />
			</Title>
			{children}
		</Root>
	)
}