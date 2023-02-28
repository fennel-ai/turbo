import { MouseEventHandler } from 'react';
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { motion } from 'framer-motion';
import { IconButton } from 'ui';
import CloseIcon from 'ui/icons/close.svg';
import { media } from 'styles/utils';

import { useModalPresence } from 'hooks/useModalPresence';

const Sheet = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.64);
	z-index: 5;
`;

const Root = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #fff;
	z-index: 5;
	overflow-y: auto;
	padding: 0.5rem 1rem;

	${media('2xs')} {
		top: 50%;
		left: 50%;
		right: unset;
		bottom: unset;
		border-radius: 1.25rem;
		padding: 1rem 2rem;
		max-width: 29rem;
		width: 100%;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

type Props = {
	onClose: MouseEventHandler;
}

const ANIM = {
	sheet: {
		transition: { type: "spring", damping: 15, mass: 0.5, stiffness: 120 },
		initial: { opacity: 0 },
		animate: { opacity: 1 },
		exit: { opacity: 0 },
	},
	root: {
		transition: { type: "spring", damping: 15, mass: 0.2, stiffness: 200 },
		initial: { y: 80, x: '-50%', opacity: 0 },
		animate: { y: '-50%', opacity: 1 },
		exit: { y: '-50%', scale: 0.97, opacity: 0, borderRadius: 24 },
	}
}

const RequestDemoModal = (props: Props) => {
	const { onClose } = props;
	useModalPresence();

	return createPortal(
		<>
			<Sheet initial={ANIM.sheet.initial} animate={ANIM.sheet.animate} exit={ANIM.sheet.exit} transition={ANIM.sheet.transition} onClick={onClose} />
			<Root initial={ANIM.root.initial} animate={ANIM.root.animate} exit={ANIM.root.exit} transition={ANIM.root.transition}>
				<Header>
					<IconButton icon={CloseIcon} size="large" onClick={onClose} />
				</Header>
			</Root>
		</>,
		document.body);
}

export default RequestDemoModal;