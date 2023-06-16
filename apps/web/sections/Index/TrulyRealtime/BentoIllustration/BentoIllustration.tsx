import styled from '@emotion/styled';
import { media } from 'styles/utils';
import { Card, TitleBlock } from 'ui';

import { LowLatency } from './LowLatency';
import { Freshness } from './Freshness';
import { Canvas } from '@react-three/fiber';
import { Helix } from 'ddd';

const Root = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	grid-template-rows: 280px 192px 192px;
	gap: 1rem;

	${media('sm')} {
		gap: 2rem;
		grid-template-rows: 280px 192px;
	}
`;

const StreamingJoins = styled(Card)`
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: flex-end;
	padding: 2rem 3rem;
	position: relative;
`;

const Title = styled(TitleBlock)`
	max-width: 20rem;
`;

const Illustration = styled.div`
	position: absolute;
	inset: 0;
	z-index: -1;
	overflow: hidden;
	mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));

	${media('sm')} {
		mask-image: unset;
	}

	& svg {
		position: absolute; 
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);

		${media('sm')} {
			left: unset;
			transform: none;
			right: 2rem;
		}
		
		${media('lg')} {
			right: 6rem;
		}
	}
`;


const BentoIllustration = () => {
	return (
		<Root>
			<StreamingJoins>
				<Illustration>
					<svg width="168" height="314" viewBox="0 0 168 314" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fillRule="evenodd" clipRule="evenodd" d="M0 34V105.769C0 120.754 6.00594 135.114 16.6745 145.637L64.0896 192.406C71.71 199.923 76 210.18 76 220.884V314H92V220.884C92 210.18 96.29 199.923 103.91 192.406L151.325 145.637C161.994 135.114 168 120.754 168 105.769V34H152V105.769C152 116.472 147.71 126.73 140.09 134.246L92.6746 181.015C89.3033 184.341 86.3977 188.049 84 192.039C81.6023 188.049 78.6967 184.341 75.3254 181.015L27.9104 134.246C20.29 126.73 16 116.472 16 105.769V34H0Z" fill="#F0F0F5" />
						<rect x="152" y="70" width="16" height="48" rx="8" fill="url(#paint0_linear_1023_12952)" />
						<circle cx="160" cy="110" r="8" fill="#5B44DE" />
						<rect x="76" y="234" width="16" height="48" rx="8" fill="url(#paint1_linear_1023_12952)" />
						<circle cx="84" cy="274" r="8" fill="#5B44DE" />
						<g clip-path="url(#clip0_1023_12952)">
							<rect x="10.6001" y="139.313" width="16" height="48" rx="8" transform="rotate(-45 10.6001 139.313)" fill="url(#paint2_linear_1023_12952)" />
							<circle cx="44.5412" cy="161.941" r="8" transform="rotate(-45 44.5412 161.941)" fill="#2D6DEB" />
						</g>
						<rect width="16" height="48" rx="8" fill="url(#paint3_linear_1023_12952)" />
						<circle cx="8" cy="40" r="8" fill="#2D6DEB" />
						<defs>
							<linearGradient id="paint0_linear_1023_12952" x1="160" y1="70" x2="160" y2="118" gradientUnits="userSpaceOnUse">
								<stop stopColor="#5B44DE" stop-opacity="0.4" />
								<stop offset="1" stopColor="#5B44DE" stopOpacity="0" />
							</linearGradient>
							<linearGradient id="paint1_linear_1023_12952" x1="84" y1="234" x2="84" y2="282" gradientUnits="userSpaceOnUse">
								<stop stopColor="#5B44DE" stopOpacity="0.4" />
								<stop offset="1" stopColor="#5B44DE" stopOpacity="0" />
							</linearGradient>
							<linearGradient id="paint2_linear_1023_12952" x1="18.6001" y1="139.313" x2="18.6001" y2="187.313" gradientUnits="userSpaceOnUse">
								<stop stopColor="#2D6DEB" stopOpacity="0.4" />
								<stop offset="1" stopColor="#2D6DEB" stopOpacity="0" />
							</linearGradient>
							<linearGradient id="paint3_linear_1023_12952" x1="8" y1="0" x2="8" y2="48" gradientUnits="userSpaceOnUse">
								<stop stopColor="#2D6DEB" stopOpacity="0.4" />
								<stop offset="1" stopColor="#2D6DEB" stopOpacity="0" />
							</linearGradient>
							<clipPath id="clip0_1023_12952">
								<rect x="10.6001" y="139.313" width="16" height="48" rx="8" transform="rotate(-45 10.6001 139.313)" fill="white" />
							</clipPath>
						</defs>
					</svg>
				</Illustration>
				<Title>
					<h6>Unprecedented Power</h6>
					<h3>Temporally correct streaming joins</h3>
				</Title>
			</StreamingJoins>
			<Freshness />
			<LowLatency />
		</Root>
	);
};

export default BentoIllustration;