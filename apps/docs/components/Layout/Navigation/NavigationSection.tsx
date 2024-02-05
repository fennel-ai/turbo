import { ReactNode, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
	children: ReactNode;
	href: string;
	title: string;
	isAPI?: boolean
}

const Root = styled(motion.ul)`
	list-style: none;
	margin: 0;
	padding-left: 0;
	margin-bottom: 1rem;
`;

const SectionTitle = styled.li<{expand: boolean}>`
	color: ${({ theme }) => theme.on};
	font-size: 1rem;
	line-height: 1rem;
	font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.primary.semibold};
	opacity: ${({ expand }) => expand ? 1 : 0.64};
	cursor: pointer;
	display: flex;
	align-items: stretch;

	&:hover {
		opacity: 1;
	}

	& > a {
		text-decoration: none;
		color: inherit;
		flex: 1;
	}
`;

const Collapsible = styled(motion.section)`
	overflow: hidden;
`;

const PageList = styled.ul`
	list-style: none;
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
	padding-left: 0rem;
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

const NavigationSection = ({ children, href, title, isAPI }: Props) => {
	const [expand, setExpand] = useState(true);
	const toggleExpand = () => setExpand(!expand);
	return (
		<Root>
			<SectionTitle expand={expand} onClick={toggleExpand}>
				{title}
			</SectionTitle>
			<AnimatePresence initial={false}>
				{expand ? (
					<Collapsible
						key="content"
						initial="collapsed"
						animate="open"
						exit="collapsed"
						variants={animation.variants}
						transition={animation.transition}
					>
						<PageList>
							{children}
						</PageList>
					</Collapsible>
				) : null}
			</AnimatePresence>
		</Root>
	)
};

export default NavigationSection;