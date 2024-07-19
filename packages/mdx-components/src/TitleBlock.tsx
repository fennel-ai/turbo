import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { media, get } from 'styles/utils';
import { useLayoutContext } from 'components/Layout';

const Root = styled.div`
	padding-bottom: 0.5rem;

	${media('md')} {
		margin-bottom: 1rem;
		border-bottom: 1px solid ${({ theme }) => theme.border};
	}
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
		${({ theme }) => theme.title.default};
	}

	& > span  {
        ${({ theme }) => theme.title.default};
		font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.medium};
		vertical-align: middle;
		opacity: 0.64;
	}
`;

const SectionTitle = styled.div`
	display: none;
	align-items: center;

	${media('md')} {
		display: flex;
	}

	& > p {
		margin: 0;
		font-size: 1rem;
		line-height: 1rem;
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
			</TitleWrapper>
		</Root>
	)
};