import { type ReactNode } from 'react';
import styled from '@emotion/styled';

import GithubIcon from 'ui/icons/github.svg';

const Root = styled.div`
    padding: 0.375rem;
    color: ${({ theme }) => theme.on};
`;

const Header = styled.div`
    margin: 0.25rem 0;
    padding: 0.375rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    line-height: 1.25rem;

    & svg {
        width: 1rem;
        height: 1rem;
    }
`;

export const Sidebar = ({ children }: { children?: ReactNode}) => {
    return (
        <Root>
            <Header>
                <GithubIcon />
                fennel-ai/repo-name
            </Header>
            {children}
        </Root>      
    )
};