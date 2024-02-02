import { Children, ReactElement } from "react";
import styled from '@emotion/styled';
import { motion } from "framer-motion";
import { get, media } from "styles/utils";
import ArrowRightIcon from 'ui/icons/arrow-narrow-right.svg';
import { useBreakpoint } from "hooks/useBreakpoint";

const Wrapper = styled.div`
	margin: 1rem 0 2rem 0;
`;

const TableRoot = styled.table`
	display: block;
	width: 100%;
	overflow-x: auto;
	border-collapse: separate;

	tr {
		display: flex;

		${media('sm')} {
			display: table-row;
		}
	}

	th, td {
		min-width: 50%;

		${media('sm')} {
			min-width: unset;
		}
	}

	& thead {
		box-shadow: 0px 2px 0px ${({ theme }) => theme.border};
		
		tr {
			text-align: left;

			th {
				padding: 1rem;
				border-collapse: separate;
				font-size: 1.125rem;
				line-height: 1.5rem;
				color: ${({ theme }) => theme.on_alt };

				&:first-of-type {
					padding-left: 0;
				}

				&:last-of-type {
					padding-right: 0;
				}
			}
		}
	}

	& tbody {
		tr td {
			padding: 1rem; 
			font-size: 1rem;
			line-height: 1.5rem;
			font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.medium};
			vertical-align: top;

			&:first-of-type {
				padding-left: 0;
			}

			&:last-of-type {
				padding-right: 0;
			}
		}
	}
`;

const Footer = styled.div`
	padding-top: 0.5rem;
	display: flex;
	justify-content: flex-end;
`;

const SwipeIndicator = styled(motion.div)`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.medium};
	color: ${({ theme }) => theme.primary.accent};
`;

const SWIPE_ANIM = {
	x: [0, -8, 0, 0, -4, 0],
	transition: {
		duration: 1.5,
		ease: ["easeOut", "easeOut", "easeOut", "easeOut", "easeOut"],
		repeatDelay: 1,
		times: [0, 0.5, 1],
		repeat: Infinity
	}
};

export const Table = (props: { children: ReactElement }) => {
	const isMobile = useBreakpoint('sm', 'max');
	return (
		<Wrapper>
			<TableRoot>
				{props.children}
			</TableRoot>
			{
				isMobile ? (
					<Footer>
						<SwipeIndicator
							animate={SWIPE_ANIM}
						>
							Swipe
							<ArrowRightIcon />
						</SwipeIndicator>
					</Footer>
				) : null
			}
		</Wrapper>
	)
};
