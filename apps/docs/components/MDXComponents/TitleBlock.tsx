import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { media, get } from 'styles/utils';
import { useLayoutContext } from 'components/Layout';

const Root = styled.div`
	border-bottom: 1px solid ${get('border')};
	padding-bottom: 2rem;
	margin-bottom: 2rem;
`;

const Title = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.25rem;

	& h1 {
		margin: 0;
		font-weight: 500;
		font-size: 2.5rem;
		line-height: 2.5rem;

		${media('sm')} {
			font-size: 3rem;
			line-height: 3rem;
		}
	}
`;

const Description = styled.p`
	margin: 0;
	font-size: 1.125rem;
	line-height: 2rem;
	font-variation-settings: "wght" 600;
	color: ${get('text-alt')};
	
	${media('sm')} {
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
		font-size: 1rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" 700;
		color: ${get('primary.accent')}
	}
`;

export const TitleBlock = ({ children }: PropsWithChildren) => {
	const { frontmatter, section } = useLayoutContext();
	return (
		<Root>
			{section?.title ? <SectionTitle><p>{section.title}</p></SectionTitle> : null}
			<Title>
				<h1>{children}</h1>
				{frontmatter?.description ? <Description>{frontmatter.description}</Description> : null}
			</Title>
		</Root>
	)
};