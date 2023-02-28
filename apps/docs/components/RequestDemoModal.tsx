import { MouseEventHandler } from 'react';
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { motion } from 'framer-motion';
import { Button, IconButton } from 'ui';
import CloseIcon from 'ui/icons/close.svg';
import Logo from 'ui/icons/logo.svg';
import { media } from 'styles/utils';

import { useModalPresence } from 'hooks/useModalPresence';
import ModalSheet from './ModalSheet';

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
	display: flex;
	flex-direction: column;
	gap: 1rem;

	${media('2xs')} {
		top: 50%;
		left: 50%;
		right: unset;
		bottom: unset;
		border-radius: 1.25rem;
		padding: 1.5rem;
		max-width: 29rem;
		width: 100%;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const LogoWrapper = styled.div`
	align-self: center;
	width: 4rem;
	height: 4rem;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 1rem;
	color: ${({ theme }) => theme.primary.accent};
	box-shadow: 0px 0.4150884747505188px 2.2138051986694336px 0px hsla(260, 6%, 29%, 0.02), 0px 0.9975153207778931px 5.32008171081543px 0px hsla(260, 6%, 29%, 0.03), 0px 1.8782328367233276px 10.017241477966309px 0px hsla(260, 6%, 29%, 0.04), 0px 3.3504464626312256px 17.869047164916992px 0px hsla(260, 6%, 29%, 0.05),  0px 6.266641616821289px 33.422088623046875px 0px hsla(260, 6%, 29%, 0.06), 0px 15px 80px 0px hsla(260, 6%, 29%, 0.08);
`;

const Intro = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 0.25rem;
	padding-left: 2rem;
	padding-right: 2rem;

	& h2 {
		margin: 0;
		font-size: 1.5rem;
		line-height: 2rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.extrabold};
	}

	& p {
		text-align: center;
		margin: 0;
		font-size: 0.875rem;
		line-height: 1.25rem;
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.medium};
		color: ${({ theme }) => theme['text-alt']};
	}
`;

const Form = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1rem;
	padding-left: 1rem;
	padding-right: 1rem;
	padding-bottom: 1rem;
	
	& input {
		height: 2.5rem;
		border: 1px solid ${({ theme }) => theme['border']};
		border-radius: 0.5rem;
		outline: none;
	}
`;

const SubmitButton = styled(Button)`
	width: 100%;
`;

type Props = {
	onClose: MouseEventHandler;
}

const ANIM = {
	transition: { type: "spring", damping: 15, mass: 0.2, stiffness: 200 },
	initial: { y: '-45%', x: '-50%', opacity: 0 },
	animate: { y: '-50%', opacity: 1 },
	exit: { y: '-50%', scale: 0.97, opacity: 0, borderRadius: 24 },
}

const RequestDemoModal = (props: Props) => {
	const { onClose } = props;
	const isPresent = useModalPresence();

	return createPortal(
		<>
			<ModalSheet isPresent={isPresent} onClick={onClose} />
			<Root initial={ANIM.initial} animate={ANIM.animate} exit={ANIM.exit} transition={ANIM.transition}>
				<Header>
					<IconButton icon={CloseIcon} size="large" onClick={onClose} />
				</Header>
				<LogoWrapper>
					<Logo width={40} height={24} />
				</LogoWrapper>
				<Intro>
					<h2>Request a demo</h2>
					<p>The team is excited to show you just how much Fennel is capable of; Submit a request today and we'll be in touch soon.</p>
				</Intro>
				<Form>
					<input />
					<input />
					<input />
					<SubmitButton label="Submit" variant="pill" />
				</Form>
			</Root>
		</>,
		document.body);
}

export default RequestDemoModal;