import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { get, media } from 'styles/utils';

import AlertCircleIcon from 'ui/icons/alert-circle.svg';
import InfoCircleIcon from 'ui/icons/info-circle.svg';

const COLOR_MAP = {
	info: {
		bg: 'primary.background',
		fg: 'primary.on-background',
		border: 'ref.purple.800'
	},
	warning: {
		bg: 'caution.background',
		fg: 'caution.on-background',
		border: 'ref.yellow.800'
	}, 
}

const ICON_MAP = {
	info: InfoCircleIcon,
	warning: AlertCircleIcon,
}

type Props = {
	type: keyof typeof COLOR_MAP;
};

const Root = styled.div<{ type: Props['type'] }>`
	background-color: ${({ type }) => get(COLOR_MAP[type].bg)};
	color: ${({ type }) => get(COLOR_MAP[type].fg)};
	box-shadow: 0px 0px 0px 4px rgba(${({ type }) => get(COLOR_MAP[type].border)}, 32%);
	padding: 2rem;
	border-radius: 1.25rem;
	margin: 1rem 0 2rem 0;
	display: flex;
	align-items: flex-start;
	gap: 1rem;

	& svg {
		margin-top 0.25rem;
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
	}

	& > p {
		margin: 0;
		font-size: 1.125rem;
		line-height: 2rem;
		font-variation-settings: "wght" ${props => props.theme.fontWeights.semibold};

		${media('sm')} {
			font-size: 1.25rem;
			line-height: 2rem;
		}
	}
`;

export const Callout = ({ children, type }: PropsWithChildren<Props>) => {
	const Icon = ICON_MAP[type];
	return (
		<Root type={type}>
			<Icon />
			<p>{children} even longer text </p>
		</Root>
	)
}