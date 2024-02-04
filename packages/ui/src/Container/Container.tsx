import styled from '@emotion/styled';
import { media } from 'styles/utils';

export const Container = styled.div`
	max-width: 86.5rem;
	width: 100%;
	margin: 0 auto;
	padding-left: 1rem;
	padding-right: 1rem;

	${media('2xs')} {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	${media('md')} {
		padding-left: 3rem;
		padding-right: 3rem;
	}
`;
