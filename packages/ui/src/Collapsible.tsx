import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

const Root = styled(motion.div)`
	overflow: hidden;
`;

const animation = {
	variants: {
		open: {
			height: "auto"
		},
		collapsed: {
			height: 0
		}
	},
	transition: {
		type: 'spring',
		damping: 15,
		mass: 0.5,
		stiffness: 120,
	}
}

export const Collapsible = ({ children, open }: PropsWithChildren<{ open?: boolean }>) => {
	return (
		<AnimatePresence initial={false}>
			{
				open ? (
					<Root
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={animation.variants}
						transition={animation.transition}
					>
						{children}
					</Root>
				) : null
			}
		</AnimatePresence>
	);
}