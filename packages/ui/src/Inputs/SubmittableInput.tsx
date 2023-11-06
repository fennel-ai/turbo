import { HTMLAttributes } from "react";
import styled from '@emotion/styled';
import { Button } from "../Button";

const Root = styled.div<{ size: 'small' | 'large' }>`
    border-radius: 0.75rem;
    background-color: ${({ theme }) => theme.glass};
    box-shadow: 0px 2px 4px -2px rgba(13, 18, 27, 0.16), 0px 0px 0px 0.5px rgba(7, 4, 58, 0.08);
    padding: 0.25rem;
    display: flex;
    align-items: stretch;
    height: ${({ size }) => size === 'large' ? 3 : 2.5}rem;
    
    input {
        border: 0;
        width: 100%;
        background-color: transparent;
        color: ${({ theme }) => theme.on};
        font-size: 0.875rem;
        line-height: 1rem;
        font-family: "Haskoy", sans-serif;
        padding: 0 0.5rem;
        outline: none;
    }
`;

interface SubmittableInputProps extends HTMLAttributes<HTMLInputElement> {
    size?: "small" | "large";
}

export const SubmittableInput = ({ size = 'small', ...props }: SubmittableInputProps) => {
    return (
        <Root size={size}>
            <input {...props} />
            <Button label="Subscribe" color="primary" variant="ghost" size={size} />
        </Root>
    )
};