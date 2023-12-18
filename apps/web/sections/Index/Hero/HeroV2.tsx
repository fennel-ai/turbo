import { Button, Hero } from "ui";
import styled from '@emotion/styled';

import Link from "next/link";
import { rgba } from "styles/utils";
import ArrowNarrowUpRightIcon from 'ui/icons/arrow-narrow-up-right.svg'


const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -1;
	opacity: 0.15;
`;

export const HeroV2 = () => {
	return (
		<div data-section>
			<Background />
                    <Hero
                        title="Realtime Feature Platform. Beautifully Built."
                        text="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features."
                    />
		</div>
	);
};