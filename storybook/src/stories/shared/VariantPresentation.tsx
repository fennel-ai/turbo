import styled from '@emotion/styled';

export const VariantGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
`;

export const VariantSection = styled.div`
    grid-column: span 3;
    & h4 {
        margin: 0;
        margin-top: 1rem;
    }
`;

export const VariantItem = styled.div`
    background-color: ${({ theme }) => theme.glass};
    border: 0.5px solid ${({ theme }) => theme.border};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    min-height: 10rem;
`;