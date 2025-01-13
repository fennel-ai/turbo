import { type MouseEventHandler, type ReactNode } from 'react';
import styled from '@emotion/styled';
import { rgba } from 'styles/utils';
import { IconButton } from 'ui';
import CloseIcon from 'ui/icons/close.svg';

const Root = styled.div`
    position: relative;
    appearance: none;
    height: 100%;
    border-radius: 0.5rem;
    flex: 1 1 auto;
    background-color: ${({ theme }) => rgba(theme.primary.on_container, 0.04)};
    color: ${({ theme }) => rgba(theme.primary.on_container, 0.5)};
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5rem;
    padding: 0 0.625rem;
    padding-right: 1.75rem;
    cursor: pointer;
    min-width: 9rem;
    font-size: 0.75rem; 
    line-height: 1.25rem;
    
    & p {
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    svg {
        width: 1rem;
        height: 1rem; 
        flex-shrink: 0;
    }

    &:not([data-selected=true]) {
        &:hover {
            color: ${({ theme }) => theme.primary.on_container};
        }
    }

    &[data-selected=true] {
        cursor: default;
        background-color: transparent;
        color: ${({ theme }) => theme.primary.on_container};
    }
`;

const CloseButton = styled(IconButton)`
    position: absolute;
    top: 50%;
    right: 0.25rem;
    transform: translateY(-50%);
    display: none;

    div:hover > & {
        display: flex;
    }
`;

export const ToolbarTab = ({ active, children, onClick, onClose }: { active?: boolean; children: ReactNode; onClick?: MouseEventHandler; onClose?: MouseEventHandler; }) => {
    return (
        <Root data-selected={active} onClick={onClick}>
            {children}
            {onClose ? <CloseButton icon={CloseIcon} size="small" onClick={onClose} /> : null}
        </Root>
    );
};