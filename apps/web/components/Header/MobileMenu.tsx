import { createPortal } from "react-dom";
import { useModalPresence } from "hooks";
import styled from '@emotion/styled';
import Link from "next/link";

const Root = styled.div`
	position: fixed;
	inset: 0;
	backdrop-filter: blur(16px);
	padding-top: 3rem;

	nav ul {
		margin: 1rem 0;
		padding: 0 1.5rem;
		list-style: none;
		color: ${({ theme }) => theme.on_alt};
		
		a {
			color: ${({ theme }) => theme.on_alt};
		}

		li {
			padding: 0;
			display: flex;
			align-items: center;
			user-select: none;
			cursor: pointer;
			height: 3.5rem;
			font-size: 1.25rem;
			line-height: 1.5rem;
			font-variation-settings: "wght" 600;
			border-bottom: 1px solid ${({ theme }) => theme.border.light};;
		}

		li:hover {
			color: theme.get(text);
			opacity: 0.8;
		}
		
		li:active {
			opacity: 0.5;
		}
	}
`;

export const MobileMenu = () => {
	useModalPresence();

	return createPortal(
		<Root>
			<nav>
				<ul>
					<Link href="/company">
						<li>
							Company
						</li>
					</Link>
					<Link href="/careers">
						<li>
							Careers
						</li>
					</Link>
					<Link href="https://fennel.ai/blog">
						<li>
							Blog
						</li>
					</Link>
					<Link href="/docs">
						<li>
							Documentation
						</li>
					</Link>
				</ul>
			</nav>
		</Root>,
		document.body,
	);
};