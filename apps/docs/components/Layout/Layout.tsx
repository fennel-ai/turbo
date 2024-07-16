import { ReactNode } from "react";
import styled from '@emotion/styled';
import { media, rgba, stateLayer } from "styles/utils";
import { Footer } from 'ui';

import type { NavigationTree, Outline } from "lib/utils";

import Header from './Header';
import Navigation from "./Navigation";
import Container from "../Container";
import MobileMenu from "./Navigation/MobileMenu";
import { useShell } from "context/Shell";
import { AnimatePresence } from "framer-motion";
import { haskoyVariable } from "pages/_app";
import { PageNavigation } from "./PageNavigation";

type Props = {
	children: ReactNode,
	navigation: NavigationTree,
	isAPI?: boolean,
	headings?: Outline,
	path? :string
	navRoute?: string;
    version: string;
}

const Root = styled(Container)<{isAPI?: boolean}>`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	scroll-behavior: smooth;
    font-family: ${haskoyVariable.style.fontFamily}, sans-serif;

	${media('xs')} {
		grid-template-columns: repeat(8, 1fr);
	}

	${media('md')} {
		grid-template-columns: repeat(5, 1fr);
	}

	& > main {
		padding-top: 2rem;
		padding-bottom: 5rem;
		color: ${({ theme }) => theme.on};
		

		/** Content Styles */
		h1, h2, h3, h4, h5, h6 {
			color: ${({ theme }) => theme.on};
			font-family: ${haskoyVariable.style.fontFamily}, sans-serif;
			font-weight: 500;
			margin: 0;
			scroll-margin-top: 4rem;

			${media('md')} {
				scroll-margin-top: 5rem; 
			}
		}

		h2 {
			${({ theme }) => theme.subtitle.large};
            font-family: ${haskoyVariable.style.fontFamily}, sans-serif;
			margin-bottom: 0.5rem;
		}
		
		h3 {
            ${({ theme }) => theme.subtitle.default};
            font-family: ${haskoyVariable.style.fontFamily}, sans-serif;
            margin-bottom: 0.75rem;
		}

		h4 {
            ${({ theme }) => theme.subtitle.small};
            font-family: ${haskoyVariable.style.fontFamily}, sans-serif;
			padding-bottom: 0.5rem;
			margin-bottom: 1rem;
			border-bottom: 1px solid ${({ theme }) => theme.border};
		}

		& a {
			position: relative;
			text-decoration: none;
            cursor: pointer;
			color: ${({ theme }) => theme.on_alt};
			opacity: 0.8;
			transition: 160ms opacity ease-out;

			&::after {
				content: '';
				position: absolute;
				bottom: -1px;
				left: 0;
				right: 0;
				height: 1px;
				background-color: ${({ theme }) => theme.on};
				opacity: 0.4;
				transition: 80ms opacity ease-out;
				z-index: -1;
			}

			&:hover {
				opacity: 1;

				&::after {
					opacity: 0.64;
				}
			}
		}

		hr {
			background-color: ${({ theme }) => theme.border};
			border: none;
			height: 2px;
		}

		img {
			max-width: 100%;
			height: auto;
			margin-bottom: 1rem;
		}

		ul, ol {
			padding-inline-start: 2rem;
			margin-top: 0.5rem;
			margin-bottom: 1rem;

		}

		li {
			font-size: 1rem;
			line-height: 1.75rem;
			font-variation-settings: "wght" ${props => props.theme.fontWeights.primary.medium};
			margin-bottom: 0.75rem;
			&:last-child {
				margin-bottom: 0rem;
			}
		}
		
		code:not(pre > code) {
            word-break: break-word;
			display: inline-flex;
            align-items: center;
            justify-content: center;
			padding: 0.125rem 0.25rem;
			color: ${({ theme }) => theme.on};
			border: 0.5px solid ${({ theme }) => theme.border};
			border-radius: 0.25rem;
            overflow: hidden;
			${props => props.theme.syntax.label.small}
			${stateLayer({ initial: 0.06 , interact: false})}
		}

		strong {
			font-variation-settings: "wght" 700;
			color: ${({ theme }) => theme.on};
		}

		/** Grid style */
		grid-column: span 4;

		${media('xs')} {
			grid-column: span 8;
		}

		${media('md')} {
			code:not(pre > code) {
				word-break: keep-all;
			}
			grid-column: span 12;
			padding-top: 2.5rem;
		}

		${media('lg')} {
			grid-column: ${({ isAPI }) => isAPI ? "span 4" : "span 3" };
			padding-top: 4rem;
			padding-bottom: 7.5rem;
			
		}

		summary {
    		width: 100%;
    		text-overflow: ellipsis;
			overflow-x: hidden;
		}
	}
`;

const Layout = ({ children, navigation, isAPI, headings, path, navRoute, version }: Props) => {
	const { showMobileMenu, closeMobileMenu } = useShell();
	return (
		<>
			<Header version={version} />
			<Root isAPI={isAPI}>
				<Navigation items={navigation} isAPI={isAPI} navRoute={navRoute} version={version} />
				<AnimatePresence>
					{showMobileMenu ? (
						<MobileMenu items={navigation} onClose={closeMobileMenu} isAPI={isAPI}/>
					) : null}
				</AnimatePresence>
				<main>
					{children}
				</main>
				{!isAPI && <PageNavigation headings={headings!} path={path || ''} />}
			</Root>
			<Footer />
		</>
	)
};

export default Layout;
