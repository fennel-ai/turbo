import { PropsWithChildren, ReactElement } from 'react';
import styled from '@emotion/styled';

import { Section } from './Section';

type Props = {
	direction?: 'forward' | 'reverse';
	illustration: ReactElement;
}

const Root = styled(Section)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	padding: 5rem 0;
`;

const IllustrationWrapper = styled.div<{ direction: Props['direction'] }>`
	grid-column: ${props => props.direction === 'reverse' ? '8 / span 5' : 'span 5' };
`;

const Content = styled.div<{ direction: Props['direction'] }>`
	display: flex;
	flex-direction: column;
	gap: 4rem;
	align-items: flex-start;
	justify-content: center;
	order: ${props => props.direction === 'reverse' ? -1 : 2 };
	grid-column: ${props => props.direction === 'reverse' ? 'span 6' : '7 / span 6' };
`;

export const SplitSection = ({ children, direction = "forward", illustration }: PropsWithChildren<Props>) => {
	return (
		<Root>
			<IllustrationWrapper direction={direction}>
				{illustration}
			</IllustrationWrapper>
			<Content direction={direction}>
				{children}
			</Content>
		</Root>
	)
};