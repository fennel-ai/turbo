import { ReactNode } from "react";
import styled from '@emotion/styled';
import { media } from "styles/utils";

import type { NavigationTree } from "lib/utils";

import Header from './Header';
import Footer from './Footer';
import Navigation from "./Navigation";
import Container from "../Container";
import MobileMenu from "./Navigation/MobileMenu";
import { useShell } from "context/Shell";
import { AnimatePresence } from "framer-motion";
import { satoshiVariable } from "pages/_app";

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
			font-family: ${satoshiVariable.style.fontFamily}, serif;
			font-weight: 500;
			margin: 0;
			letter-spacing: -0.5px;
			scroll-margin-top: 8rem;

			&:first-of-type {
				margin-top: 0 !important;
			}

			${media('md')} {
				letter-spacing: -0.75px;
			}
		}

		h2 {
			font-size: 1.5rem;
			line-height: 2rem;
			font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.semibold};
			margin-top: 2rem;
			margin-bottom: 1rem;

			${media('md')} {
				font-size: 2rem;
				line-height: 2.5rem;
			}

			&:not(:first-of-type) {
				margin-top: 2rem;

				${media('md')} {
					margin-top: 2.5rem;
				}
			}
		}
		
		h3 {
			font-size: 1.25rem;
			line-height: 1.5rem;
			font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.extrabold};
			margin-top: 1rem;
			margin-bottom: 1rem;

			${media('sm')} {
				font-size: 1.5rem;
				line-height: 2rem;
				margin-top: 1.5rem;
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

		hr {
			background-color: rgba(${({ theme }) => theme.ref.grey['100']}, 8%);
			border: none;
			height: 2px;
		}

		img {
			max-width: 100%;
			height: auto;
		}

		ul, ol {
			padding-inline-start: 2rem;
			margin-top: 0;
			margin-bottom: 2rem;
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
			grid-column: span 9;
		}
		
		${media('xl')} {
			grid-column: span 8;
		}
	}
`;

const Layout = ({ children, navigation }: Props) => {
	const { showMobileMenu, closeMobileMenu } = useShell();
	return (
		<>
			<Header />
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
