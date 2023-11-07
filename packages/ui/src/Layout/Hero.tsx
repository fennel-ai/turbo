import styled from '@emotion/styled';

const Root = styled.div`
    background-color: ${({ theme }) => theme.background};
`;

export const Hero = () => {
    return <Root>Hello, from Hero!</Root>
}