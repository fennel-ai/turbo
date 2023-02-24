import { useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from "@emotion/styled";
import { motion, usePresence } from 'framer-motion';
import { IconButton } from 'ui';
import CloseIcon from 'ui/icons/close.svg';

import { NavigationTree } from 'lib/utils';
import { media } from 'styles/utils';

import { useShell } from 'context/Shell';

import Masthead from 'components/Masthead';
import NavigationItem from "./NavigationItem";
import NavigationSection from './NavigationSection';

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
	display: flex;
	align-items: stretch;
	flex-direction: column;
	padding: 0.5rem 1rem;
	gap: 1.5rem;

	${media('2xs')} {
		top: 1rem;
		left: 1rem;
		right: 1rem;
		bottom: 1rem;
		border-radius: 1.25rem;
		padding: 1rem 2rem;
		gap: 2rem;
	}

	${media('xs')} {
		top: 1rem;
		left: 1rem;
		width: 25rem;
		bottom: 1rem;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const Menu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.5rem;
	padding-bottom: 1rem;
`;

type Props = {
	onClose: (e: MouseEvent) => void,
	items: NavigationTree
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
		initial: { x: -240, opacity: 0 },
		animate: { x: 0, opacity: 1 },
		exit: { x: 0, scale: 0.97, opacity: 0, borderRadius: 24 },
	}
}

const MobileMenu = (props: Props) => {
	const { items, onClose } = props;
	const [isPresent, safeToRemove] = usePresence()

	const rootRef = useRef(null);
	const router = useRouter();
	const { toggleMobileMenu } = useShell();
	
	useEffect(() => {
		if (isPresent) {
			document.body.style.overflow = 'hidden';
		}
		
		if (safeToRemove) {
			safeToRemove();
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isPresent])

	return createPortal(
		<>
			<Sheet initial={ANIM.sheet.initial} animate={ANIM.sheet.animate} exit={ANIM.sheet.exit} transition={ANIM.sheet.transition} onClick={onClose} />
			<Root ref={rootRef} initial={ANIM.root.initial} animate={ANIM.root.animate} exit={ANIM.root.exit} transition={ANIM.root.transition}>
				<Header>
					<Masthead />
					<IconButton icon={CloseIcon} size="large" onClick={onClose} />
				</Header>
				<Menu>
					{
						items.map((section) => {
							const sectionActive = section.slug === router.query.slug![0];
							return (
								<NavigationSection
									expand
									key={section.slug}
									title={section.title}
									href={`/${section.slug}/${section.pages[0].slug}`}
								>
									{section.pages.map(({ title, slug }) => {
										const href = `/${section.slug}/${slug}`;
										const active = router.asPath === href;
										return (
											<NavigationItem active={active} fade={sectionActive && !active} key={slug} onClick={toggleMobileMenu}><Link aria-label={title} href={href}>{title}</Link></NavigationItem>
										)
									})}
								</NavigationSection>
							)
						})
					}
				</Menu>
			</Root>
		</>, 
	document.body);
}

export default MobileMenu;