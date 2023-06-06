import styled from '@emotion/styled';
import { PropsWithChildren, StyleHTMLAttributes } from 'react';
import { media } from 'styles/utils';

type Props = {
	actions?: JSX.Element[];
	align?: 'left' | 'center';
	className?: string;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

const Root = styled.div<{ align: Props['align'] }>`
	display: flex;
	flex-direction: column;
	align-items: ${props => props.align === 'left' ? 'flex-start' : props.align};
	gap: 1.5rem;

	/** Large Title **/
	& h1 {
		margin: 1rem 0;
		font-size: 2rem;
		line-height: 2rem;
		font-variation-settings: "wght" 900;

		${media("xs")} {
			font-size: 2.5rem;
			line-height: 2.5rem;
		}

		${media("sm")} {
			font-size: 4rem;
			line-height: 4rem;
		}
	}
	
	/** Standard Title **/
	& h2 {
		margin: 0.5rem 0;
		font-size: 2rem;
		line-height: 2.5rem;
		font-variation-settings: "wght" 900;

		${media("sm")} {
			font-size: 2.5rem;
			line-height: 3rem;
		}
	}
	
	/** Small Title **/
	& h3 {
		margin: 0.5rem 0;
		font-size: 1.75rem;
		line-height: 2rem;
		font-variation-settings: "wght" 800;
		letter-spacing: -1.5px;

		${media("md")} {
			font-size: 2rem;
			line-height: 2.5rem;
		}
	}

	/** Subtitle */
	& h6 {
		margin: 0;
		font-size: 1rem;
		line-height: 1rem;
		opacity: 50%;
		font-variation-settings: "wght" 500;
	}

	& p {
		margin: 0;
		font-size: 1rem; 
		line-height: 1.5rem;
		font-variation-settings: "wght" 500;

		& b {
			font-variation-settings: "wght" 800;
		}

		${media("sm")} {
			font-size: 1.125rem; 
			line-height: 2rem;
		}
	}

	& p + p {
		margin-top: 1rem;
	}
`;

const Content = styled.div<{ align: Props['align'] }>`
	display: flex;
	flex-direction: column;
	align-items: ${props => props.align === 'left' ? 'flex-start' : props.align};
	text-align: ${props => props.align};
`;

const Actions = styled.div<{ align: Props['align'] }>`
	display: flex;
	align-items: ${props => props.align === 'left' ? 'flex-start' : props.align};
	gap: 1rem;
`;

export const TitleBlock = (props: PropsWithChildren<Props>) => {
	const { actions, align, children, className, style } = props;

	return (
		<Root align={align}>
			<Content align={align} className={className} style={style}>
				{children}
			</Content>
			{
				actions?.length ? (
					<Actions align={align}>
						{actions}
					</Actions>
				) : null
			}
		</Root>
	);
};

