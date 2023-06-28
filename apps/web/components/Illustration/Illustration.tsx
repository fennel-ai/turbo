import { HTMLAttributes, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Card } from 'ui';
import { media } from 'styles/utils';

const Root = styled(Card)`
	height: 20rem;

	${media('sm')} {
		height: 40rem;
	}
`;

export const Illustration = (props: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) => <Root {...props} />