import { type ReactNode } from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
    border: 4px inset red;
    & > p + p {
        margin-top: 1rem;
    }
`;

export const ContentBlock = (props: { children: ReactNode }) => {
    return <Root>{props.children}</Root>
}