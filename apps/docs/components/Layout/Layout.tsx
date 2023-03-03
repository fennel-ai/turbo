import { ReactNode } from "react";
import styled from '@emotion/styled';
import { media } from "styles/utils";

import type { NavigationTree } from "lib/utils";

import Header from 'components/Header';
import Footer from 'components/Footer';
import MobileToolbar from 'components/MobileToolbar';

import Navigation from "./Navigation";
import Container from "../Container";
import MobileMenu from "./Navigation/MobileMenu";
import { useShell } from "context/Shell";
import { AnimatePresence } from "framer-motion";
import { addingtonCF } from "pages/_app";

type Props = {
	children: ReactNode,
	navigation: NavigationTree
}

const Root = styled(Container)`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	padding-top: 2rem;
	padding-bottom: 5rem;

	${media('xs')} {
		grid-template-columns: repeat(8, 1fr);
	}

	${media('md')} {
		grid-template-columns: repeat(12, 1fr);
		padding-top: 2.5rem;
	}

	${media('lg')} {
		padding-top: 3.5rem;
		padding-bottom: 7.5rem;
	}

	& > main {
		color: ${({ theme }) => theme['text-alt']};

		/** Content Styles */
		h1, h2, h3, h4, h5, h6 {
			color: ${({ theme }) => theme.text};
			font-family: ${addingtonCF.style.fontFamily}, serif;
			font-weight: 500;
			margin: 0;
		}

		h2 {
			font-size: 2rem;
			line-height: 2.5rem;
			margin-top: 2rem;
			margin-bottom: 1rem;

			${media('sm')} {
				font-size: 2.25rem;
				line-height: 2.5rem;
				margin-top: 2.5rem;
			}
		}
		
		h3 {
			font-size: 1.5rem;
			line-height: 2rem;
			margin-top: 1.5rem;
			margin-bottom: 1rem;

			${media('sm')} {
				font-size: 1.75rem;
				line-height: 2.25rem;
				margin-top: 2rem;
			}
		}

		/** Target paragraphs that are direct children of the main element (we don't necessarily want to style paragraphs within e.g. lists in the same way.) */
		& > p {
			margin: 0;
			font-size: 1.125rem;
			line-height: 2rem;
			margin-bottom: 1.5rem;
			font-variation-settings: "wght" ${props => props.theme.fontWeights.medium};

			${media('sm')} {
				font-size: 1.25rem;
				line-height: 2.5rem;
			}
		}

		& a {
			text-decoration: none;
			color: ${({ theme }) => theme.primary.accent};
			font-variation-settings: "wght" ${props => props.theme.fontWeights.bold};
		}

		img {
			max-width: 100%;
			height: auto;
		}

		ul, ol {
			padding-inline-start: 2rem;
		}

		li {
			font-size: 1.125rem;
			line-height: 2rem;
			font-variation-settings: "wght" ${props => props.theme.fontWeights.medium};
			margin-bottom: 0.75rem;

			${media('sm')} {
				font-size: 1.25rem;
				line-height: 2.5rem;
			}
		}
		
		code:not(pre > code) {
			font-size: 0.875rem;
			line-height: 1rem;
			font-family: ${({ theme }) => theme.fontFamilies.code}, monospace;
			font-variation-settings: "wght" ${props => props.theme.fontWeights.medium};
			padding: 0.25rem 0.375rem;
			margin: 0 0.25rem;
			background-color: rgba(${({ theme }) => theme.ref.grey[100]}, 4%);
			color: rgba(${({ theme }) => theme.ref.grey[100]}, 100%);
			border: 1px solid rgba(${({ theme }) => theme.ref.grey[100]}, 12%);
			border-radius: 0.375rem;
		}

		strong {
			font-variation-settings: "wght" 700;
			color: ${({ theme }) => theme.text};
		}

		/** Grid style */
		grid-column: span 4;
		${media('xs')} {
			grid-column: span 8;
		}

		${media('md')} {
			grid-column: span 12;
		}

		${media('lg')} {
			grid-column: span 8;
		}
	}
`;

const Layout = ({ children, navigation }: Props) => {
	const { showMobileMenu, closeMobileMenu } = useShell();
	return (
		<>
			<Header />
			<MobileToolbar />
			<Root>
				<Navigation items={navigation} />
				<AnimatePresence>
					{showMobileMenu ? (
						<MobileMenu items={navigation} onClose={closeMobileMenu} />
					) : null}
				</AnimatePresence>
				<main>
					{children}
				</main>
			</Root>
			<Footer />
		</>
	)
};

export default Layout;
