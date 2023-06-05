import { PropsWithChildren, ReactElement, StyleHTMLAttributes } from 'react';
import styled from '@emotion/styled';

import { Container } from './Container';
import { media } from 'styles/utils';

type Props = {
	className?: string;
	direction?: 'forward' | 'reverse';
	illustration: ReactElement;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

const Root = styled.div`
	padding: 2rem 0;

	${media('sm')} {
		padding: 5rem 0;
	}
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	row-gap: 2rem;

	${media('md')} {
		row-gap: 0;
	}
`;

const IllustrationWrapper = styled.div<{ direction: Props['direction'] }>`
	grid-column: span 12;

	${media('sm')} {
		grid-column: ${props => props.direction === 'reverse' ? '8 / span 5' : 'span 5' };
	}
`;

const Content = styled.div<{ direction: Props['direction'] }>`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	align-items: flex-start;
	justify-content: center;
	order: ${props => props.direction === 'reverse' ? -1 : 2 };
	grid-column: span 12;

	${media('sm')} {
		grid-column: ${props => props.direction === 'reverse' ? 'span 6' : '7 / span 6' };
		gap: 4rem;
	}
`;

export const  SplitSection = ({ className, children, direction = "forward", illustration, style }: PropsWithChildren<Props>) => {
	return (
		<Root className={className} style={style}>
			<Wrapper>
				<IllustrationWrapper direction={direction}>
					{illustration}
				</IllustrationWrapper>
				<Content direction={direction}>
					{children}
				</Content>
			</Wrapper>
		</Root>
	)
};