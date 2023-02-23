import { useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { motion } from 'framer-motion';

import { NavigationTree } from 'lib/utils';

import Navigation from './Layout/Navigation';

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
	top: 1rem;
	left: 1rem;
	width: 15rem;
	bottom: 1rem;
	border-radius: 1rem;
	background-color: #fff;
	z-index: 5;
`;

type Props = {
	onClose: (e: MouseEvent) => void,
	navigation: NavigationTree
}

const MobileMenu = (props: Props) => {
	const rootRef = useRef(null);
	
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, [])

	return createPortal(
		<>
			<Sheet initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={props.onClose} />
			<Root ref={rootRef} initial={{ x: -56, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -56, opacity: 0 }}>
				<Navigation items={props.navigation} />
			</Root>
		</>, 
	document.body);
}

export default MobileMenu;