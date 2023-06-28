import { ForwardedRef, PropsWithChildren, ReactElement, StyleHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Container } from 'ui';
import { media } from 'styles/utils';

type Props = {
	className?: string;
	direction?: 'forward' | 'reverse';
	illustration: ReactElement;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

const Root = styled.div`
	padding: 4rem 0;

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

const Illustration = styled.div<{ reverse: boolean }>`
	grid-column: span 12;

	${media('sm')} {
		grid-column: ${({ reverse }) => reverse ? `8 / span 5` : `span 5`};
	}
`;

const Content = styled.div<{ reverse: boolean }>`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
	align-items: flex-start;
	justify-content: center;
	grid-column: span 12;
	order: -1;

	${media('sm')} {
		gap: 4rem;
		order: ${({ reverse }) => reverse ? -1 : 2};
		grid-column: ${({ reverse }) => reverse ? 'span 6' : '7 / span 6'};
	}
`;

export const SplitSection = forwardRef(({ className, children, direction = "forward", illustration, style }: PropsWithChildren<Props>, ref: ForwardedRef<HTMLDivElement>) => {
	return (
		<Root ref={ref} data-section className={className} style={style}>
			<Wrapper>
				<Illustration reverse={direction === 'reverse'}>
					{illustration}
				</Illustration>
				<Content reverse={direction === 'reverse'}>
					{children}
				</Content>
			</Wrapper>
		</Root>
	)
});

SplitSection.displayName = 'SplitSection';