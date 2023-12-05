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
	background: conic-gradient(from 90deg at 1px 1px, #0000 90deg, ${({ theme }) => rgba(theme.on_alt, 0.64)} 0) 0 0/32px 32px;
	mask-image: radial-gradient(40.07% 50% at 50% 50%, #D9D9D9 0%, rgba(217, 217, 217, 0) 100%);
`;

export const HeroV2 = () => {
	return (
		<div data-section>
			<Background />
                    <Hero
                        actions={[
                            <Link href="https://fennel.ai/docs">
                        <Button color="primary" shape="pill" label="Read the Documentation" icon={<ArrowNarrowUpRightIcon />} />
                        </Link>
                        ]}
                        
                        title="Realtime Feature Platform. Beautifully Built."
                        text="Fennel helps you author, compute, store, serve, monitor & govern both realtime and batch ML features."
                    />
		</div>
	);
};