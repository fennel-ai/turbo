import { MouseEventHandler, useRef } from 'react';
import { createPortal } from "react-dom";
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from "@emotion/styled";
import { motion } from 'framer-motion';
import { Button, IconButton, Masthead } from 'ui';
import CloseIcon from 'ui/icons/close.svg';

import { NavigationTree } from 'lib/utils';
import { media } from 'styles/utils';

import { useShell } from 'context/Shell';

import NavigationItem from "./NavigationItem";
import NavigationSection from './NavigationSection';
import { useModalPresence } from 'hooks/useModalPresence';
import ModalSheet from 'components/ModalSheet';
import { useLayoutContext } from '../useLayoutContext';
import { useBreakpoint } from 'hooks/useBreakpoint';

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
	box-shadow: 0px 18px 80px rgba(44, 45, 58, 0.04), 0px 7.51997px 33.4221px rgba(44, 45, 58, 0.0287542), 0px 4.02054px 17.869px rgba(44, 45, 58, 0.0238443), 0px 2.25388px 10.0172px rgba(44, 45, 58, 0.02), 0px 1.19702px 5.32008px rgba(44, 45, 58, 0.0161557), 0px 0.498106px 2.21381px rgba(44, 45, 58, 0.0112458);
	
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

const DemoCta = styled(Button)`
	margin-bottom: 0.5rem;
	width: 100%;
`;

type Props = {
	onClose: MouseEventHandler,
	items: NavigationTree
}

const ANIM = {
	transition: { type: "spring", damping: 15, mass: 0.2, stiffness: 200 },
	initial: { x: -240, opacity: 0 },
	animate: { x: 0, opacity: 1 },
	exit: { x: 0, scale: 0.97, opacity: 0, borderRadius: 24 },
}

const MobileMenu = (props: Props) => {
	const { items, onClose } = props;
	const isPresent = useModalPresence();

	const rootRef = useRef(null);
	const router = useRouter();
	const { toggleMobileMenu } = useShell();
	const ctx = useLayoutContext();
	const showCta = useBreakpoint('sm', 'max');

	return createPortal(
		<>
			<ModalSheet isPresent={isPresent} onClick={onClose} />
			<Root ref={rootRef} initial={ANIM.initial} animate={ANIM.animate} exit={ANIM.exit} transition={ANIM.transition}>
				<Header>
					<Masthead />
					<IconButton icon={CloseIcon} onClick={onClose} />
				</Header>
				<Menu>
					{
						showCta ? (
							<a aria-label="Request a demo" href="https://fennel.ai/get-a-demo">
								<DemoCta ariaLabel="Request a demo" label='Request a demo' />
							</a> 
						) : null
					}
					{
						items.map((section) => {
							const sectionActive = ctx.section.slug === section.slug;
							return (
								<NavigationSection
									expand
									key={section.slug}
									title={section.title}
									href={section.pages[0].slug}
								>
									{section.pages.map(({ title, slug, status }) => {
										const active = router.asPath === `/${slug}`;
										return (
											<NavigationItem 
												active={active} 
												status={status} 
												fade={sectionActive && !active} 
												key={slug} 
												onClick={toggleMobileMenu}
											>
												<Link aria-label={title} href={slug}>{title}</Link>
											</NavigationItem>
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