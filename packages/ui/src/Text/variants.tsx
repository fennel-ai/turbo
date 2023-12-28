import styled from '@emotion/styled';

export type Size = 's' | 'm' | 'l';

export const TEXT_COMPONENTS = {
    'display': (size: Size) => styled.h1`
        font-family: "Haskoy", sans-serif;
        font-size:  ${({ theme }) => theme.typescale[16]};
        font-weight: ${({ theme }) => theme.fontWeights.extrabold};
        line-height:${({ theme }) => theme.typescale[17]};
        letter-spacing: -1.5px;
        ${({ theme }) => size!='l' && `
            line-height:${theme.typescale[15]};
            font-size: ${theme.typescale[14]};
            line-spacing: -1.0px;
        `};
    `,
    'title': (size: Size) => styled.h2`
        font-family: "Haskoy", sans-serif;
        font-size:  ${({ theme }) => theme.typescale[11]};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        line-height:${({ theme }) => theme.typescale[12]};
        letter-spacing: -1.0px;
        ${({theme }) => size == 'l' ? `
        font-size:  ${theme.typescale[12]};
        line-height:${theme.typescale[14]};
        ` : `
        font-size:  ${theme.typescale[9]};
        line-height:${theme.typescale[10]};
        letter-spacing: -0.75px;
        `};
    `,
    'subtitle':(size: Size) => styled.h3`
        font-family: "Haskoy", sans-serif;
        font-size:  ${({ theme }) => theme.typescale[7]};
        font-weight: ${({ theme }) => theme.fontWeights.bold};
        line-height:${({ theme }) => theme.typescale[8]};
        ${({ theme }) => size == 'l' ? `
        font-size:  ${theme.typescale[8]};
        line-height:${theme.typescale[9]};
        letter-spacing: -0.75px;
        ` : `
        font-size:  ${theme.typescale[5]};
        line-height:${theme.typescale[7]};
        `};
    `,
    'label': (size: Size) => styled.div`
        font-family: "Haskoy", sans-serif;
        font-size:  ${({ theme }) => theme.typescale[3]};
        font-weight: ${({ theme }) => theme.fontWeights.semibold};
        line-height:${({ theme }) => theme.typescale[3]};
        ${({ theme }) => size == 'l' ? `
        font-size:  ${theme.typescale[7]};
        line-height:${theme.typescale[7]};
        ` : `
        font-weight: ${theme.fontWeights.medium};
        font-size:  ${theme.typescale[2]};
        line-height:${theme.typescale[3]};
        `};
    `,
    'body': (size: Size) => styled.p`
        font-family: "Haskoy", sans-serif;
        font-size:  ${({ theme }) => theme.typescale[3]};
        font-weight: ${({ theme }) => theme.fontWeights.medium};
        line-height:${({ theme }) => theme.typescale[8]};
        ${({ theme }) => size == 'l' ? `
        font-size:  ${theme.typescale[5]};
        line-height:${theme.typescale[8]};
        ` : `
        font-size:  ${theme.typescale[2]};
        line-height:${theme.typescale[7]};
        `};
    `,
    'code': (size: Size) => styled.pre`
        font-family: monospace;
        font-size:  ${({ theme }) => theme.typescale[3]};
        font-weight: ${({ theme }) => theme.fontWeights.regular};
        line-height:${({ theme }) => theme.typescale[8]};
        line-spacing: 0.5px;
        ${({ theme }) => size=='s' && `
        line-height:${theme.typescale[8]};
        font-size: ${theme.typescale[2]};
        line-spacing: 0px;
    `};
    `
}
