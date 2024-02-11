import { type ReactNode } from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
    & > p + p {
        margin-top: 1rem;
    }
`;

export const ContentBlock = (props: { children: ReactNode }) => {
    return <Root>{props.children}</Root>
}