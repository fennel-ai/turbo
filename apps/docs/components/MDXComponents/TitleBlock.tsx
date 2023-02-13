import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { media, palette } from 'styles/utils';
import { useLayoutContext } from 'components/Layout';

const Root = styled.div`
	border-bottom: 1px solid ${palette('border')};
	padding-bottom: 2rem;
	margin-bottom: 2rem;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 0.25rem;
	
	& h1 {
		margin: 0;
		font-family: "Addington CF", serif;
		font-weight: 500;
		font-size: 2.5rem;
		line-height: 2.5rem;

		${media('sm')} {
			font-size: 3rem;
			line-height: 3rem;
		}
	}

	& p {
		margin: 0;
		font-size: 1.125rem; 
		line-height: 2rem;
		font-variation-settings: "wght" 600;
		color: ${palette('on_alt')};
		
		${media('sm')} {
			font-size: 1.25rem;
			line-height: 2.25rem;
		}
	}
`;

export const TitleBlock = ({ children }: PropsWithChildren) => {
	const { frontmatter } = useLayoutContext();
	return (
		<Root>
			<h1>{children}</h1>
			{frontmatter?.description ? <p>{frontmatter.description}</p> : null}
		</Root>
	)
};