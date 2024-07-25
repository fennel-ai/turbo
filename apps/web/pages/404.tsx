import { Button } from "ui";
import styled from '@emotion/styled';

import { media } from "styles/utils";
import { useRouter } from "next/router";
import { GetStaticPropsResult } from "next";

const Main = styled.main`
	min-height: calc(100vh - 4.5rem - 10rem);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	gap: 1rem;
	text-align: center;
	padding-left: 1rem;
	padding-right: 1rem;

	h2 {
		margin: 0;
		font-size: 1.5rem;
		line-height: 2rem;
		font-variation-settings: "wght" 900;
		
		${media('2xs')} {
			font-size: 1.75rem;
			line-height: 2.5rem;
		}

		${media('xs')} {
			font-size: 2rem;
			line-height: 2.5rem;
		}
	}

	p {
		margin: 0;
		color: ${({ theme }) => theme.on_alt};
		font-size: 1rem;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.medium};
		${media('xs')} {
			font-size: 1.5rem;
		}
	}

	button {
		margin-top: 1rem;
	}
`;

const BackgroundText = styled.span`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	font-size: 20rem;
	line-height: 20rem;
	font-variation-settings: "wght" 900;
	letter-spacing: -56px;
	opacity: 0.24;
	color: ${({ theme }) => theme.border};
	user-select: none;
	pointer-events: none;
	z-index: -1;
`;

export default function NotFoundPage() {
	const router = useRouter();
	return (
		<Main>
			<BackgroundText>404</BackgroundText>
			<h2>We can&apos;t find the page you&apos;re looking for!</h2>
			<p>The page you&apos;re looking for either doesn&apos;t exist, or was moved.</p>
			<Button color="primary" label="Go Back" onClick={() => router.back()} />
		</Main>
	);
}
