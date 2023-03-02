import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { get, media } from 'styles/utils';

import AlertCircleIcon from 'ui/icons/alert-circle.svg';
import CheckCircleIcon from 'ui/icons/check-circle.svg';
import InfoCircleIcon from 'ui/icons/info-circle.svg';
import XCircleIcon from 'ui/icons/x-circle.svg';
import ZapCircleIcon from 'ui/icons/zap-circle.svg';

const COLOR_MAP = {
	info: {
		bg: 'primary.background',
		fg: 'primary.on-background',
		border: 'ref.purple.800',
	},
	caution: {
		bg: 'caution.background',
		fg: 'caution.on-background',
		border: 'ref.yellow.800'
	}, 
	tip: {
		bg: 'secondary.background',
		fg: 'secondary.on-background',
		border: 'ref.blue.800'
	}, 
	error: {
		bg: 'error.background',
		fg: 'error.on-background',
		border: 'ref.red.800'
	}, 
	success: {
		bg: 'success.background',
		fg: 'success.on-background',
		border: 'ref.success.800'
	}, 
}

const ICON_MAP = {
	info: InfoCircleIcon,
	caution: AlertCircleIcon,
	tip: ZapCircleIcon,
	error: XCircleIcon,
	success: CheckCircleIcon,
}

type Props = {
	type: keyof typeof COLOR_MAP;
};

const Root = styled.div<{ type: Props['type'] }>`
	background-color: ${({ type }) => get(COLOR_MAP[type].bg)};
	color: ${({ type }) => get(COLOR_MAP[type].fg)};
	box-shadow: 0px 0px 0px 4px rgba(${({ type }) => get(COLOR_MAP[type].border)}, 32%);
	padding: 1rem;
	border-radius: 0.75rem;
	margin: 1rem 0 2rem 0;
	display: flex;
	align-items: flex-start;
	gap: 1rem;

	${media('sm')} {
		padding: 2rem;
		gap: 1rem;
		border-radius: 1.25rem;
	}

	& svg {
		margin-top: 0.25rem;
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;

		${media('sm')} {
			margin-top: 0;
			width: 2rem;
			height: 2rem;
		}
	}

	& > p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.75rem;
		font-variation-settings: "wght" ${props => props.theme.fontWeights.semibold};

		${media('sm')} {
			font-size: 1.25rem;
			line-height: 2rem;
		}
	}

	& p > code:not(pre > code) {
		background-color: ${({ type }) => get(COLOR_MAP[type].bg)};
		color: ${({ type }) => get(COLOR_MAP[type].fg)};
		border-color: rgb(${({ type }) => get(COLOR_MAP[type].border)});
	}
`;

export const Admonition = ({ children, type }: PropsWithChildren<Props>) => {
	const Icon = ICON_MAP[type];
	return (
		<Root type={type}>
			<Icon />
			{children}
		</Root>
	)
}