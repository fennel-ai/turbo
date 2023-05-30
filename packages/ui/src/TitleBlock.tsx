import styled from '@emotion/styled';
import { ElementType, PropsWithChildren, StyleHTMLAttributes } from 'react';

type Props = {
	className?: string;
	style: StyleHTMLAttributes<HTMLDivElement>;
	subtitle?: string;
	text?: string;
	titleAs: ElementType<any> | undefined;
	title: string;
}

const Root = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

const Subtitle = styled.h5`
	margin: 0;
	font-size: 1rem; 
	line-height: 1rem;
	opacity: 50%;
	font-variation-settings: "wght" 500;
`;

const Title = styled.h2`
	margin: 0;
	font-size: 4rem;
	line-height: 4rem;
	font-variation-settings: "wght" 900;
`;

const Text = styled.p`
	margin: 0;
	font-size: 1.125rem;
	line-height: 2rem;
	font-variation-settings: "wght" 500;
	padding: 0 6.5rem;
`;

export const TitleBlock = (props: PropsWithChildren<Props>) => {
	const { children, className, style, subtitle, text, titleAs, title } = props;

	return (
		<Root>
			<Content className={className} style={style}>
				{subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
				<Title as={titleAs}>
					{title}
				</Title>
				{text ? <Text>{text}</Text> : null}
			</Content>
			{children}
		</Root>
	);
};

