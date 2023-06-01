import styled from '@emotion/styled';
import { PropsWithChildren, ReactElement, useState } from 'react';
import { Collapsible } from 'ui';

type Props = {
	icon: ReactElement;
	open: boolean;
	onToggle: () => void;
	title: string; 
}

const Root = styled.div`
	position: relative;
	font-size: 0.875rem;
	line-height: 1.5rem;
	font-variation-settings: "wght" 500;
	padding: 2rem 0;

	& p {
		margin: 0;
		margin-top: 1rem;
	}
`;

const Header = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	user-select: none;
	cursor: pointer;
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
	width: 100%;
	height: 1px;
	background-color: #f0f0f5;
`;

export const AccordionItem = ({ children, icon, open, onToggle, title }: PropsWithChildren<Props>) => {
	return (
		<>
			<Root>
				<Header onClick={onToggle}>
					<Title>
						{icon || null}
						<h4>{title}</h4>
					</Title>
				</Header>
				<Collapsible open={open}>
					{children}
				</Collapsible>
			</Root>
			<Progress />
		</>
	);
};