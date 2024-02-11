import { Children, ReactElement } from "react";
import styled from '@emotion/styled';
import { motion } from "framer-motion";
import { get, media, stateLayer } from "styles/utils";
import ArrowRightIcon from 'ui/icons/arrow-narrow-right.svg';
import { useBreakpoint } from "hooks/useBreakpoint";

const Wrapper = styled.div`
	margin: 1rem 0 2rem 0;
`;

const TableRoot = styled.table`
    width: 100%;
	overflow-x: auto;
	border-spacing: 0;
	font-size: 0.875rem;
	line-height: 1.5rem;
	border-radius: ${({ theme }) => theme.radii.sm};
	border: 0.5px solid ${({ theme }) => theme.border};

	tr {
		display: flex;
		border-bottom: 0.5px solid ${({ theme }) => theme.border };
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
		${({ theme }) => stateLayer({ initial: 0.04, color: theme.on_alt, interact: false })};
        ::before {
            border-top-left-radius: ${({ theme }) => theme.radii.sm};
            border-top-right-radius: ${({ theme }) => theme.radii.sm};
        }

		tr {
			text-align: left;

			th {
				border: none;
				text-transform: uppercase;
				padding: 0 1rem;
                vertical-align: middle;
                height: 2.5rem;
				${({ theme }) => theme.label.small};
				color: ${({ theme }) => theme.on_alt };
            }
		}
	}

	& tbody {
		tr td {
			padding: 1rem; 
			font-variation-settings: "wght" ${({ theme }) => theme.fontWeights.primary.medium};
			vertical-align: top;
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
