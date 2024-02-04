import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { media, get } from 'styles/utils';
import { useLayoutContext } from 'components/Layout';

const Root = styled.div`
	margin: 0.25rem 0;
`;

const TitleWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.5rem;

	${media('md')} {
		gap: 0.25rem;
	}
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;

	& h1 {
		position: relative;
		margin: 0;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.bold};
		font-size: 2.5rem;
		line-height: 3rem;
		
		${media('md')} {
			font-size: 2.5rem;
			line-height: 3rem;
		}
	}

	& > span  {
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.medium};
		font-size: 1.5rem;
		line-height: 2rem;
		vertical-align: middle;
		opacity: 0.64;
	}
`;

const Description = styled.p`
	margin: 0;
	font-size: 1.125rem;
	line-height: 1.75rem;
	font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.semibold};
	color: ${({ theme }) => theme.on_alt};

	${media('md')} {
		font-size: 1.25rem;
		line-height: 2.25rem;
	}
`;

const SectionTitle = styled.div`
	display: none;
	align-items: center;

	${media('lg')} {
		display: flex;
	}

	& > p {
		margin: 0;
		font-size: 1.5rem;
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.semibold};
		color: ${({ theme }) => theme.primary.accent};
	}
`;

export const TitleBlock = ({ children }: PropsWithChildren) => {
	const { page, section } = useLayoutContext();

	return (
		<Root>
			{section.title ? <SectionTitle><p id="section_title">{section.title}</p></SectionTitle> : null}
			<TitleWrapper>
				<Title><h1>{children}</h1>{page.status === 'wip' ? <span>WIP</span> : null}</Title>
				{page.description ? <Description id="page_description">{page.description}</Description> : null}
			</TitleWrapper>
		</Root>
	)
};