import { ForwardedRef, PropsWithChildren, ReactElement, StyleHTMLAttributes, forwardRef } from 'react';
import styled from '@emotion/styled';
import { Container } from 'ui';
import { media } from 'styles/utils';

type Props = {
	className?: string;
	direction?: 'forward' | 'reverse';
    contentSpan?: number;
	illustration: ReactElement;
    gapSpan?: number;
    illustrationSpan?: number;
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

const Illustration = styled.div<{ reverse: boolean, span: number, gapSpan: number }>`
	grid-column: span 12;

	${media('sm')} {
		grid-column: ${({ reverse, gapSpan, span }) => reverse ? `${(12 - span) + gapSpan} / span ${span}` : `span ${span}`};
	}
`;

const Content = styled.div<{ reverse: boolean, span: number, gapSpan: number }>`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	align-items: flex-start;
	justify-content: center;
	grid-column: span 12;
	order: -1;

	${media('sm')} {
		gap: 1.5rem;
		order: ${({ reverse }) => reverse ? -1 : 2};
		grid-column: ${({ reverse, gapSpan, span }) => reverse ? `span ${span}` : `${(12 - span) + gapSpan} / span ${span}`};
	}
`;

export const SplitSection = forwardRef(({ 
    className, 
    children, 
    contentSpan = 6, 
    direction = "forward", 
    illustration,
    illustrationSpan = 5, 
    gapSpan = 1,
    style 
}: PropsWithChildren<Props>, ref: ForwardedRef<HTMLDivElement>) => {
	return (
		<Root ref={ref} data-section className={className} style={style}>
			<Wrapper>
				<Illustration gapSpan={gapSpan} span={illustrationSpan} reverse={direction === 'reverse'}>
					{illustration}
				</Illustration>
				<Content span={contentSpan} gapSpan={gapSpan} reverse={direction === 'reverse'}>
					{children}
				</Content>
			</Wrapper>
		</Root>
	)
});

SplitSection.displayName = 'SplitSection';