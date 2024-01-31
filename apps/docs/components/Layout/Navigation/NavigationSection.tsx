import { ReactNode } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
	children: ReactNode;
	expand: boolean;
	href: string;
	title: string;
	isAPI?: boolean
}

const Root = styled(motion.ul)`
	list-style: none;
	margin: 0;
	padding-left: 0;
`;

const SectionTitle = styled.li<{expand: boolean}>`
	color: ${({ theme }) => theme.on};
	font-size: 1.25rem;
	line-height: 2.5rem;
	font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.semibold};
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
	gap: 0.5rem;
	margin: 1rem 0;
	padding-left: 2rem;
	border-left: 1px solid ${({ theme }) => theme.border.light};
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

const NavigationSection = ({ children, expand, href, title, isAPI }: Props) => {
	return (
		<Root>
			<SectionTitle expand={expand}>
				{isAPI ? <>{title}</> : <Link href={href}>{title}</Link>}
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