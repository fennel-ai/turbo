import { PropsWithChildren } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import LinkExternalIcon from 'ui/icons/link-external.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Root = styled(Link)`
	border: 1px solid rgba(${({ theme }) => theme.ref.grey[100]}, 8%);
	display: flex;
	flex-direction: column;
	border-radius: 1rem;

	& img {
		width: 100%;
		height: auto;
	}
`;

const Header = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: ${({ theme }) => theme.text};
	padding: 1.5rem;
	padding-bottom: 0;

	& svg {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

const Title = styled.h6`
	font-size: 1.25rem;
	line-height: 1.5rem;
	font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.extrabold};
`;

const Text = styled.div`
	padding: 1.5rem;
	padding-top: 1rem;
	& > p {
		margin: 0;
		font-size: 1.125rem;
		line-height: 1.5rem;
		color: ${({ theme }) => theme['text-alt']};
		font-variation-settings: 'wght' ${({ theme }) => theme.fontWeights.medium};
	}
`;

export const PageReference = ({ children, illustration, href, title }: PropsWithChildren< { href: string, illustration: string, title: string}>) => {
	const router = useRouter();
	return (
		<Root href={href}>
			<Header>
				<Title>{title}</Title>
				<LinkExternalIcon />
			</Header>
			{/**\// TODO Figure out a solution for either using next/image or using the svg directly in some way 
			 * For now I've hardcoded the width and height so we can use next/image, as all of the illustration SVGs are the same size.
			 * Will want to circle back and make this more dynamic in the future.
			*/}
			<Image src={router.basePath ? `${router.basePath}/${illustration}` : illustration} width={392} height={168} alt={title} /> {/* eslint-disable-line @next/next/no-img-element */}
			<Text>
				{children}
			</Text>
		</Root>
	)
};