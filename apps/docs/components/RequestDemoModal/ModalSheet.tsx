import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { MouseEventHandler } from 'react';

const Root = styled(motion.div)<{ isPresent: boolean }>`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.48);
	backdrop-filter: blur(16px);
	z-index: 10;
	pointer-events: ${({ isPresent }) => isPresent ? 'all' : 'none'};
`;

const ANIM = {
	transition: { type: "spring", damping: 15, mass: 0.5, stiffness: 120 },
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
}

const ModalSheet = ({ isPresent, onClick }: { isPresent: boolean, onClick: MouseEventHandler<HTMLDivElement> }) => 
	<Root 
		onClick={onClick}
		isPresent={isPresent}
		initial={ANIM.initial}
		animate={ANIM.animate}
		exit={ANIM.exit}
		transition={ANIM.transition}
	/>

export default ModalSheet;