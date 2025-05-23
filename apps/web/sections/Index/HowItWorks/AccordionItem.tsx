import styled from '@emotion/styled';
import { PropsWithChildren, ReactElement } from 'react';
import { motion } from "framer-motion";
import { Collapsible } from 'ui';

type Props = {
	animate: boolean;
	icon: ReactElement;
	open: boolean;
	onComplete: () => void;
	onToggle: () => void;
	title: string; 
}

const Root = styled.div`
	position: relative;
	font-size: 0.875rem;
	line-height: 1.5rem;
	font-variation-settings: "wght" 500;
	padding: 2rem 0;
	user-select: none;
	cursor: pointer;
	
	& p {
		margin: 0;
		margin-top: 1rem;
		color: ${({ theme }) => theme.on};
	}
`;

const Header = styled.div<{ open: boolean }>`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	color: ${({ open, theme }) => open ? theme.on : theme.on_alt};
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	gap: 0.5rem;

	& svg {
		width: 1rem;
		height: 1rem;
	}
	
	& h4 {
		margin: 0;
		font-size: 1.125rem;
		line-height: 1.5rem;
		font-variation-settings: "wght" 600;
	}
`;

const Progress = styled.div`
	position: relative;
	width: 100%;
	height: 1px;
	background-color: ${({ theme }) => theme.border};

	& > div {
		position: absolute;
		inset: -1px;
		border-radius: 99px;
		transform-origin: left;
		background-color: ${({ theme }) => theme.primary.accent};
	}
`;

const variants = {
	start: {
		width: '0%',
	},
	end: {
		width: '100%',
	},
	exit: {
		opacity: 0,
	}
};

const transition = {
	duration: 6
};

export const AccordionItem = ({ animate, children, icon, open, onComplete, onToggle, title }: PropsWithChildren<Props>) => {
	return (
		<>
			<Root onClick={onToggle}>
				<Header open={open}>
					<Title>
						{icon || null}
						<h4>{title}</h4>
					</Title>
				</Header>
				<Collapsible open={open}>
					{children}
				</Collapsible>
			</Root>
			<Progress>
				{animate && open ? <motion.div initial="start" animate="end" exit="exit" onAnimationComplete={onComplete} variants={variants} transition={transition} /> : null}
			</Progress>
		</>
	);
};