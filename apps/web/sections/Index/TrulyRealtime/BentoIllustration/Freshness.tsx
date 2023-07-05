import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { media } from 'styles/utils';
import { Card, Sparkles, TitleBlock } from 'ui';
import { motion } from 'framer-motion';

const Root = styled(Card)`
	position: relative;
	grid-column: span 2;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 1rem;
	overflow: hidden;
	background-color: ${({ theme }) => theme.glass};
	border: 0.5px solid ${({ theme }) => theme.border};

	${media('sm')} {
		grid-column: span 1;
	}
`;

const Illustration = styled.div`
	position: absolute;
	z-index: -1;
`;

const ANIMATE = { rotate: -360 };
const TRANSITION = { 
	type: "spring", 
	damping: 20, 
	stiffness: 150, 
	repeat: Infinity, 
	repeatDelay: 3
};

export const Freshness = () => {
	const theme = useTheme();
	return (
		<Root>
			<Illustration>
				<motion.svg animate={ANIMATE} transition={TRANSITION} width="280" height="280" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.34108 6.34511C7.79005 4.89514 9.78949 4 11.9999 4C16.4182 4 19.9999 7.58172 19.9999 12C19.9999 16.4183 16.4182 20 11.9999 20C8.35416 20 5.27561 17.5605 4.31246 14.2227C4.15934 13.6921 3.60505 13.3861 3.07441 13.5392C2.54378 13.6923 2.23774 14.2466 2.39087 14.7773C3.59441 18.9481 7.43945 22 11.9999 22C17.5227 22 21.9999 17.5228 21.9999 12C21.9999 6.47715 17.5227 2 11.9999 2C9.2375 2 6.73512 3.12139 4.92638 4.93138C4.29031 5.56789 3.6058 6.35772 3 7.09434V4C3 3.44772 2.55228 3 2 3C1.44772 3 1 3.44772 1 4V10C1 10.5523 1.44772 11 2 11H8C8.55228 11 9 10.5523 9 10C9 9.44772 8.55228 9 8 9H4.03073C4.71483 8.14144 5.57684 7.10987 6.34108 6.34511Z" fill={theme.border} />
				</motion.svg>
			</Illustration>
			{/* <Sparkles> */}
				<TitleBlock center>
					<h6>No more stale data</h6>
					<h3>Sub-second Feature Freshness</h3>
				</TitleBlock>
			{/* </Sparkles> */}
		</Root>
	);
} 