import { Hero } from "ui";
import styled from '@emotion/styled';

import { media } from "styles/utils";

const Root = styled.div`
    position: relative;
    overflow: hidden;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	background: url('/images/herov2.png') no-repeat;
	background-position: center top;
	height: 35rem;
	filter: ${({ theme }) => theme.type == 'dark' ? 'invert(1)' : 'none'};

	${media('sm')} {
        height: 43rem;
	}
`;

export const HeroV2 = () => {
	return (
		<Root data-section>
			<Background />
            <Hero
                title="Realtime Feature Platform. Beautifully Built."
                text="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features."
            />
		</Root>
	);
};