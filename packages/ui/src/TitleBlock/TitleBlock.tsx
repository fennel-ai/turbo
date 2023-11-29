import { PropsWithChildren, StyleHTMLAttributes } from 'react';
import styled from '@emotion/styled';
import { media } from 'styles/utils';

type Props = {
	actions?: JSX.Element[];
	center?: boolean;
	className?: string;
	style?: StyleHTMLAttributes<HTMLDivElement>;
}

const Root = styled.div<{ center: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	align-self: center;
	gap: 1rem;
	color: ${({ theme }) => theme.on};

	${media('sm')} {
		align-self: inherit;
		align-items: ${({ center }) => center ? 'center' : 'flex-start'};
	}

	h1 {
		margin: 1rem 0;
		font-size: 2rem;
		line-height: 2rem;
		font-variation-settings: "wght" 700;
        letter-spacing: -2px;

		${media('xs')} {
			font-size: 2.5rem;
			line-height: 2.5rem;
		}
		
		${media('sm')} {
			font-size: 4.5rem;
			line-height: 5rem;
		}
	}

	h2 {
		margin: 0.5rem 0 1rem 0;
		font-size: 2.5rem;
        line-height: 3rem;
		font-variation-settings: "wght" 800;

		${media('sm')} {
			font-size: 3.5rem;
			line-height: 4rem;
		}
	}

	h2 br {
		display: none;

		${media('md')} {
			display: block;
		}
	}

	h3 {
		margin: 0.5rem 0;
		font-size: 1.75rem;
		line-height: 2rem;
		font-variation-settings: "wght" 800;

		${media('xl')} {
			font-size: 2rem;
			line-height: 2.5rem;
		}
	}

	h6 {
		margin: 0;
		font-size: 1rem;
		line-height: 1rem;
		opacity: 50%;
		font-variation-settings: "wght" 500;
		color: ${({ theme }) => theme.on_alt};
	}

	p {
		margin: 0;
		font-size: 1rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" 500;
		color: ${({ theme }) => theme.on_alt};
		
		b {
			font-variation-settings: "wght" 800;
		}

		${media('sm')} {
			font-size: 1.125rem;
			line-height: 2rem;
		}
	}

	p + p {
		margin-top: 1rem;
	}
`;

const Content = styled.div<{ center: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;

	${media('sm')} {
		align-items: ${({ center }) => center ? 'center' : 'flex-start'};
		text-align: ${({ center }) => center ? 'center' : 'left'};
	}
`;

const Actions = styled.div<{ center: boolean }>`
	display: flex;
	align-items: center;
	gap: 1rem;

	${media('sm')} {
		align-items: ${({ center }) => center ? 'center' : 'flex-start' };
	}
`;

export const TitleBlock = (props: PropsWithChildren<Props>) => {
	const { actions, center = false, children, className, style } = props;

	return (
		<Root center={center}>
			<Content center={center} className={className} style={style}>
				{children}
			</Content>
			{
				actions?.length ? (
					<Actions center={center}>
						{actions}
					</Actions>
				) : null
			}
		</Root>
	);
};

