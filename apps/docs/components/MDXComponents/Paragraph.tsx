import styled from '@emotion/styled';
import { haskoyVariable } from 'pages/_app';

export const Paragraph = styled.p`
    margin: 0;
    ${({ theme}) => theme.body.default};
    font-family: ${haskoyVariable.style.fontFamily}, sans-serif;
`;