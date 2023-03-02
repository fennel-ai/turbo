import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { get, media } from 'styles/utils';

import AlertCircleIcon from 'ui/icons/alert-circle.svg';
import InfoCircleIcon from 'ui/icons/info-circle.svg';
import ZapCircleIcon from 'ui/icons/zap-circle.svg';

const TYPE_MAP = {
	info: {
		title: 'Info',
		title_color: 'ref.purple.100',
		text_color: 'ref.purple.200',
	},
	warning: {
		title: 'Warning',
		title_color: 'ref.red.100',
		text_color: 'ref.red.200',
	}, 
	tip: {
		title: 'Tip',
		title_color: 'ref.blue.100',
		text_color: 'ref.blue.200',
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
	background-color: ${({ theme}) => theme.surface };
	box-shadow: 0px 0px 0px 3px rgba(${({ theme }) => theme.ref.grey[800]}, 48%);
	padding: 0.75rem 1.25rem;
	border-radius: 0.75rem;
	margin: 1rem 0 2rem 0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 0.5rem;
	width: max-content;
	max-width: 100%;

	& > p {
		margin: 0;
		color: rgba(${({ type }) => get(TYPE_MAP[type].text_color)}, 100%);
		font-size: 1rem;
		line-height: 1.75rem;
		font-variation-settings: "wght" ${props => props.theme.fontWeights.medium};

		${media('sm')} {
			font-size: 1.125rem;
			line-height: 2rem;
		}
	}
`;

const Title = styled.div<{ type: Props['type'] }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5rem;
	color: rgba(${({ type }) => get(TYPE_MAP[type].title_color)}, 100%);

	& svg {
		margin: 0.25rem 0;
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
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
				<p>{TYPE_MAP[type].title}</p>
			</Title>
			{children}
		</Root>
	)
}