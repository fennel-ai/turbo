import { type ReactNode, Children, cloneElement, ReactElement } from 'react';
import styled from '@emotion/styled';
import { rgba } from 'styles/utils';

const Root = styled.div`
    height: 3rem;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    position: sticky;
    top: 0;
    left: 0;
    z-index: 5;
    background-color: ${({ theme }) => theme.type !== 'dark' ? "hsla(0, 0%, 98%, 70%)" : rgba(theme.surface, 0.81)};;
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.25rem;
    overflow-x: auto;
    scrollbar-width: none;
`;

type ToolbarProps = {
    active: number;
    children: ReactNode;
    onSelect: (index: number) => void;
    onClose?: (index: number) => void;
}

export const Toolbar = ({ active, children, onClose, onSelect }: ToolbarProps) => {
    return (
        <Root>
            {Children.map(children, 
                (child, i) => cloneElement(child as ReactElement, { 
                    active: active === i, 
                    onClick: () => onSelect(i), 
                    onClose: onClose ? () => onClose(i) : undefined
                })
            )}
        </Root>
    );
};