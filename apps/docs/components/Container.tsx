import styled from '@emotion/styled';
import { media } from 'styles/utils';

const Container = styled.div`
	max-width: 87.5rem; /** 1400px (1240px + 80px padding on each side) */
	width: 100%;
	margin: 0 auto;
	padding-left: 1rem;
	padding-right: 1rem;

	${media('2xs')} {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	${media('xs')} {
		padding-left: 3rem;
		padding-right: 3rem;
	}
	
	${media('md')} {
		padding-left: 5rem;
		padding-right: 5rem;
	}
`;

export default Container;