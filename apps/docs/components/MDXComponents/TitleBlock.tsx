import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { media, get } from 'styles/utils';
import { useLayoutContext } from 'components/Layout';

const Root = styled.div`
	padding-bottom: 1.5rem;

	${media('md')} {
		padding-bottom: 2rem;
		margin-bottom: 2rem;
		border-bottom: 1px solid rgba(${({ theme }) => theme.ref.grey['100']}, 8%);
	}
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.5rem;

	${media('md')} {
		gap: 0.25rem;
	}

	& h1 {
		position: relative;
		margin: 0;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.bold};
		font-size: 2rem;
		line-height: 2rem;
		
		${media('md')} {
			font-size: 3rem;
			line-height: 3rem;
		}
	}
`;

const Description = styled.p`
	margin: 0;
	font-size: 1.125rem;
	line-height: 1.75rem;
	font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.semibold};
	color: ${get('text-alt')};

	${media('md')} {
		font-size: 1.25rem;
		line-height: 2.25rem;
	}
`;

const SectionTitle = styled.div`
	height: 2.5rem;
	display: none;
	align-items: center;

	${media('lg')} {
		display: flex;
	}

	& > p {
		margin: 0;
		font-size: 1.25rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.bold};
		color: ${get('primary.accent')}
	}
`;

export const TitleBlock = ({ children }: PropsWithChildren) => {
	const { page, section } = useLayoutContext();

	return (
		<Root>
			{section.title ? <SectionTitle id="section_title"><p>{section.title}</p></SectionTitle> : null}
			<Title>
				<h1>{children}</h1>
				{page.description ? <Description id="page_description">{page.description}</Description> : null}
			</Title>
		</Root>
	)
};