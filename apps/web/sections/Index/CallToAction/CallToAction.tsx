import { useRef } from 'react';
import styled from '@emotion/styled';
import { Button, Container, TitleBlock } from "ui";
import { Canvas, RootState } from '@react-three/fiber';
import {Space} from 'ddd';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, useInView } from 'framer-motion';

import { media } from 'styles/utils';

const onCreated = ({ size, camera }: RootState) => {
	if (size.width < 600) {
		camera.position.z = 45;
	}
}

const VARIANTS = {
	"skewed": {
		rotateX: -35,
		y: 24,
		scale: 0.9
	},
	"normal": {
		rotateX: 0,
		y: 0,
		scale: 1
	}
}

const TRANSITION = {
	type: 'spring',
	friction: 20,
	damping: 10,
	stiffness: 100,
	delay: 0.25
}

const Root = styled.div`
	padding-top: 2.5rem;
	background-color: ${({ theme }) => theme.background};
	color: ${({ theme }) => theme.on};
	overflow: hidden;
	position: relative;
	z-index: 0;

	${media('sm')} {
		padding-top: 5rem;
	}

	&::before {
		content: "";
		position: absolute;
		inset: 80% 0 0 0;
		z-index: 0;
		background: conic-gradient(from 248deg at 51.63% 52.16%, rgba(12, 66, 167, 1) 0deg, rgb(0, 135, 255) 60deg, rgba(91, 68, 222, 1) 200deg, rgba(12, 23, 50, 1) 240deg, rgba(141, 185, 242, 1) 296deg, rgba(91, 68, 222, 1) 360deg);
		filter: blur(160px);
	}
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	row-gap: 3rem;
	margin-bottom: -2.5rem;
	z-index: 1;
	perspective: 2000px;

	& button {
		align-self: center;
	}

	${media('md')} {
		row-gap: 7.5rem;
	}
`;

const TitleWrapper = styled.div`
	grid-column: span 12;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;

	${media('md')} {
		grid-column: 3 / span 8;
	}
`;

const ConsoleImg = styled(motion.div)`
	position: relative;
	border-radius: 0.75rem;
	height: 14rem;
	grid-column: span 12;
	overflow: hidden;
	transform: rotateX(-25deg);
	z-index: 3;
	mask-image: linear-gradient(to bottom,
				hsl(0 0% 0% / 1),
				hsl(0 0% 0% / 1) 20%,
				hsl(0 0% 0% / 0));

	& img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}

	${media('sm')} {
		border-radius: 1rem;
	}
	
	${media('md')} {
		border-radius: 1.25rem;
		height: 27.5rem;
		grid-column: 3 / span 8;
	}
`;

const Stars = styled.div`
	position: absolute;
	inset: 0 0 40% 0;
	z-index: -2;
`;

const CallToAction = () => {
	const ref = useRef<HTMLDivElement>(null);
	const inView = useInView(ref);
	const router =  useRouter();

	return (
		<Root data-section data-theme="dark">
			<Stars>
				<Canvas onCreated={onCreated}>
					<Space />
				</Canvas>
			</Stars>
			<Wrapper>
				<TitleWrapper>
					<TitleBlock center>
						<h2>Experience the slickest feature engineering workflow</h2>
					</TitleBlock>
					<Button color="primary" label="Request a Demo" onClick={() => router.push('/get-a-demo')} />
				</TitleWrapper>
				<ConsoleImg transition={TRANSITION} variants={VARIANTS} animate={inView ? 'normal' : 'skewed'} ref={ref}>
					<Image src="/images/dataset-detail.webp" alt="Console: Dataset Detail" width={2016} height={2954} />
				</ConsoleImg>
			</Wrapper>
		</Root>
	);
};

export default CallToAction;