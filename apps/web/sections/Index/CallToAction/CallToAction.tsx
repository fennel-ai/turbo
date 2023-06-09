import styled from '@emotion/styled';
import { Button, LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';
import { media } from 'styles/utils';
import Image from 'next/image';

const Root = styled.div`
	padding-top: 2.5rem;
	background-color: #0C091B;
	color: #EBEBFA;
	overflow: hidden;
	position: relative;
	z-index: 0;

	${media('sm')} {
		padding-top: 5rem;
	}
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	row-gap: 3rem;
	margin-bottom: -2.5rem;
	z-index: 1;

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

const ConsoleImg = styled.div`
	border-radius: 0.75rem;
	background-color: #282150;
	height: 14rem;
	grid-column: span 12;
	overflow: hidden;
	mask-image: linear-gradient(to bottom,
				hsl(0 0% 0% / 1),
				hsl(0 0% 0% / 1) 20%,
				hsl(0 0% 0% / 0));

	${media('sm')} {
		border-radius: 1rem;
	}

	${media('md')} {
		border-radius: 1.25rem;
		height: 27.5rem;
		grid-column: 3 / span 8;
	}

	& img {
		width: 100%;
		height: auto;
		object-fit: contain;
	}
`;

const BlurL = styled(Image)`
	position: absolute;
    bottom: -75%;
    left: -20%;
	z-index: -1;

	${media('md', 'max')} {
		width: 480px;
		height: 480px;
		bottom: -50%;
		left: -50%;
	}
`;

const BlurR = styled(Image)`
	position: absolute;
    bottom: -65%;
    right: -20%;
	z-index: -1;

	${media('md', 'max')} {
		width: 560px;
		height: 560px;
		bottom: -50%;
		right: -50%;
	}
`;

const CallToAction = () => {
	return (
		<Root data-section data-theme="dark">
			<BlurL src="/images/cta_blur_b.png" aria-hidden alt="gradient blur" width={1076} height={1076} />
			<BlurR src="/images/cta_blur_p.png" aria-hidden alt="gradient blur" width={1171} height={1171} />
			<Wrapper>
				<TitleWrapper>
					<TitleBlock
						align="center"
					>
						<h2>Experience the fastest ML workflow</h2>
					</TitleBlock>
					<Button color="primary" label="Request a Demo" />
				</TitleWrapper>
				<ConsoleImg>
					<Image src="/images/dataset-detail.webp" alt="Console: Dataset Detail" width={2016} height={2954} />
				</ConsoleImg>
			</Wrapper>
		</Root>
	);
};

export default CallToAction;