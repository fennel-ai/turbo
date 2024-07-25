import { ReactNode } from "react";
import styled from '@emotion/styled';
import { media, rgba, stateLayer } from "styles/utils";

import type { NavigationTree } from "lib/utils";

import Navigation from "./Navigation";
import Container from "../Container";
import { haskoyVariable } from "pages/_app";

type Props = {
	children: ReactNode,
	navigation: NavigationTree
}

const Root = styled(Container)`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 2rem;
	padding-top: calc(6rem + 2rem);
	padding-bottom: 5rem;

	${media('xs')} {
		grid-template-columns: repeat(8, 1fr);
	}

	${media('md')} {
		grid-template-columns: repeat(12, 1fr);
		padding-top: calc(7.5rem + 2.5rem);
	}

	${media('lg')} {
		padding-top: calc(4.5rem + 3.5rem);
		padding-bottom: 7.5rem;
	}

	& > main {
		color: ${({ theme }) => theme.on_alt};

		/** Content Styles */
		h1, h2, h3, h4, h5, h6 {
			color: ${({ theme }) => theme.on};
			font-family: inherit;
			font-weight: 500;
			margin: 0;

			&:first-of-type {
				margin-top: 0 !important;
			}
		}

		h2 {
			${({ theme }) => theme.subtitle.large};
			font-family: inherit;
			margin-bottom: 0.5rem;
		}
		
		h3 {
            ${({ theme }) => theme.subtitle.default};
			font-family: inherit;
            margin-bottom: 0.75rem;
		}

		h4 {
            ${({ theme }) => theme.subtitle.small};
			font-family: inherit;
			padding-bottom: 0.5rem;
			margin-bottom: 1rem;
			border-bottom: 1px solid ${({ theme }) => theme.border};
		}

		/** Target paragraphs that are direct children of the main element (we don't necessarily want to style paragraphs within e.g. lists in the same way.) */
		& p {
			margin: 1rem 0;
		}

		& a {
			position: relative;
			text-decoration: none;
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
			margin-top: 0;
			margin-bottom: 1rem;
		}

		li {
			font-size: 1.125rem;
			line-height: 2rem;
			font-variation-settings: "wght" ${props => props.theme.fontWeights.primary.medium};
			margin-bottom: 0.75rem;

			${media('sm')} {
				font-size: 1.25rem;
				line-height: 2.5rem;
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
	// const { showMobileMenu, closeMobileMenu } = useShell();
	return (
		<>
			<Root>
				<Navigation navigation={navigation} />
				<main>
					{children}
				</main>
			</Root>
		</>
	)
};

export default Layout;
