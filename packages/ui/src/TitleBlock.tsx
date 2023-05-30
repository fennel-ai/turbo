import styled from '@emotion/styled';
import { ElementType, PropsWithChildren, StyleHTMLAttributes } from 'react';

type Props = {
	align?: 'left' | 'center';
	className?: string;
	size?: 'default' | 'large';
	style?: StyleHTMLAttributes<HTMLDivElement>;
	subtitle?: string;
	text?: string;
	titleAs?: ElementType<any>;
	title: string;
}

const Root = styled.div<{ align: Props['align'] }>`
	display: flex;
	flex-direction: column;
	align-items: ${props => props.align === 'left' ? 'flex-start' : props.align};
	gap: 1.5rem;
`;

const Content = styled.div<{ align: Props['align'], size: Props['size'] }>`
	display: flex;
	flex-direction: column;
	align-items: ${props => props.align === 'left' ? 'flex-start' : props.align};
	text-align: ${props => props.align};
	gap: ${props => props.size === 'large' ? '1rem' : '0.5rem'};
`;

const Subtitle = styled.h5<{ size: Props['size'] }>`
	margin: 0;
	font-size: 1rem; 
	line-height: 1rem;
	opacity: 50%;
	font-variation-settings: "wght" 500;
`;

const Title = styled.h2<{ size: Props['size'] }>`
	margin: 0;
	font-size: ${props => props.size === 'large' ? '4rem' : '2.5rem'};
	line-height: ${props => props.size === 'large' ? '4rem' : '3rem'};
	font-variation-settings: "wght" 900;
`;

const Text = styled.p<{ size: Props['size'] }>`
	margin: 0;
	font-size: 1.125rem;
	line-height: 2rem;
	font-variation-settings: "wght" 500;
`;

export const TitleBlock = (props: PropsWithChildren<Props>) => {
	const { align = 'center', children, className, size = 'default', style, subtitle, text, titleAs, title } = props;

	return (
		<Root align={align}>
			<Content align={align} className={className} size={size} style={style}>
				{subtitle ? <Subtitle size={size}>{subtitle}</Subtitle> : null}
				<Title as={titleAs} size={size}>
					{title}
				</Title>
				{text ? <Text size={size}>{text}</Text> : null}
			</Content>
			{children}
		</Root>
	);
};

