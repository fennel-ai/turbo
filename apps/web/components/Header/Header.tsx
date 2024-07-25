import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { Masthead, IconButton, PillButton, Container } from 'ui';
import { media, rgba, stateLayer } from 'styles/utils';

import MenuIcon from 'ui/icons/menu.svg';
import CloseIcon from 'ui/icons/close.svg';
import { MobileMenu } from './MobileMenu';

const Root = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	height: 3rem;
	display: flex;
	align-items: center;
	z-index: 9;
	transition: background 400ms ease 0s;
	background-color: linear-gradient(to bottom, ${({ theme }) => theme.surface}, ${({ theme }) => rgba(theme.surface, 0)} 3rem);
	color: ${({ theme }) => theme.surface};
	
	${media('md')} {
		height: 4.5rem;
		background-color: linear-gradient(to bottom, ${({ theme }) => theme.surface}, ${({ theme }) => rgba(theme.surface, 0)} 4.5rem);
	}
`;

const Backdrop = styled.div`
	&::before,
	&::after {
		content: "";
		position: absolute;
		inset: -1px 0px -60%;
		pointer-events: none;
		user-select: none;
	}

	&::before {
		backdrop-filter: blur(20px);
		-webkit-mask-image: linear-gradient(to bottom, black 3rem, transparent);
		mask-image: linear-gradient(to bottom, black 3rem, transparent);

		${media('md')} {
			-webkit-mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
			mask-image: linear-gradient(to bottom, black 4.5rem, transparent);
		}
	}
`;

const Wrapper = styled.nav`
	position: relative;
	z-index: 1;
	flex: 1;
	width: 100%;
	height: 100%;
	max-width: 86.5rem;
	width: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	padding-left: 1rem;
	padding-right: 1rem;

	${media('2xs')} {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}

	${media('md')} {
		padding-left: 3rem; 
		padding-right: 3rem;
	}
`;

const Brand = styled(Masthead)`
	& h2 {
		color: ${({ theme }) => theme.on};
	}
`;

const Actions = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

const Menu = styled.div`
	display: none;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate3d(-50%, -50%, 0);
	align-items: center;
	gap: 2rem;

	${media('md')} {
		display: flex;
	}
`;

const MenuButton = styled(IconButton)`
	display: flex;
	color: ${({ theme }) => theme.on_alt};

	${media('md')} {
		display: none;
	}
`;

const Border = styled(Container)`
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	height: 1px;

	& > div {
		width: 100%;
		height: 100%;
		background-color: ${({ theme }) => rgba(theme.on, 0.06)};
	}
`;

const NavButton = styled.button`
	height: 2.5rem;
	padding: 0 0.75rem;
	border-radius: 0.5rem;
	background-color: transparent;
	overflow: hidden;
	font-size: 1rem;
	line-height: 1.5rem;
	font-variation-settings: "wght" 600;
	color: ${({ theme }) => theme.on_alt};
	opacity: 0.5;
	user-select: none;
	cursor: pointer;
	
	${stateLayer()}
	
	&:hover {
		opacity: 1;
		color: ${({ theme }) => theme.on};
	}
`;

export const Header = () => {
	const router = useRouter();
	const [showMobileMenu, toggleMobileMenu] = useState(false);

	useEffect(() => {
		if (showMobileMenu) {
			toggleMobileMenu(false)
		}
	}, [router.pathname, showMobileMenu]);

	return (
		<Root data-header>
			<Backdrop />
			<Wrapper>
				<Brand />
				<Menu>
					<Link href="/company">
						<NavButton>
							Company
						</NavButton>
					</Link>
					<Link href="/careers">
						<NavButton>
							Careers
						</NavButton>
					</Link>
					<Link href="https://fennel.ai/blog">
						<NavButton>
							Blog
						</NavButton>
					</Link>
					<Link href="/docs">
						<NavButton>
							Documentation
						</NavButton>
					</Link>
				</Menu>
				<Actions>
					<Link href="/get-a-demo">
						<PillButton
							icon={null}
							invert
							size="large"
						>
							Request a demo
						</PillButton>
					</Link>
					<MenuButton 
						icon={showMobileMenu ? CloseIcon : MenuIcon}
						onClick={() => toggleMobileMenu(prev => !prev)}
					/>
				</Actions>
			</Wrapper>
			<Border>
				<div />
			</Border>
			<AnimatePresence>
				{
					showMobileMenu ? <MobileMenu /> : null
				}
			</AnimatePresence>
		</Root>
	);
};