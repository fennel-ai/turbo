import { useEffect, useRef } from 'react';
import { createPortal } from "react-dom";
import { useRouter } from 'next/router';
import Link from 'next/link';
import styled from "@emotion/styled";
import { motion } from 'framer-motion';
import { IconButton } from 'ui';
import CloseIcon from 'ui/icons/close.svg';

import { NavigationTree } from 'lib/utils';

import { useShell } from 'context/Shell';

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
	top: 1rem;
	left: 1rem;
	width: 25rem;
	bottom: 1rem;
	border-radius: 1rem;
	background-color: #fff;
	z-index: 5;
	overflow-y: auto;
	padding: 2rem;
	display: flex;
	align-items: stretch;
	flex-direction: column;
	gap: 2rem;
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

const MobileMenu = (props: Props) => {
	const { items, onClose } = props;

	const rootRef = useRef(null);
	const router = useRouter();
	const { toggleMobileMenu } = useShell();
	
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = '';
		};
	}, [])

	return createPortal(
		<>
			<Sheet initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
			<Root ref={rootRef} initial={{ x: -56, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -56, opacity: 0 }}>
				<Header>
					<p>Documentation</p>
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