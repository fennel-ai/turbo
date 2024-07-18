import { HTMLAttributes, MouseEventHandler, forwardRef } from "react";
import styled from '@emotion/styled';
import { Button } from "../Button";
import { media } from "styles/utils";

const Root = styled.div<{ size: 'small' | 'large', fill?: boolean }>`
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

    ${({fill, theme, size}) => fill && `
        background-color: transparent;
        padding: 0;
        border: 0;
        box-shadow: none;
        display: block;
        height: auto;
        input {
            border-radius: 0.75rem;
            background-color: ${theme.glass};
            box-shadow: 0px 2px 4px -2px rgba(13, 18, 27, 0.16), 0px 0px 0px 0.5px rgba(7, 4, 58, 0.08);
            height: ${size === 'large' ? 3 : 2.5}rem;
        }
        button {
            margin: 0.5rem 0;
            width: 100%;
        }
    `}

    ${media('md')} {
        display: flex;
        ${({fill}) => fill && `
            button {
                margin: 0.25rem 0.5rem;
                width: auto;
            }
       `
    }
`;

interface SubmittableInputProps extends HTMLAttributes<HTMLInputElement> {
    size?: "small" | "large";
    onButtonClick?: MouseEventHandler<HTMLButtonElement>
    variant?: 'ghost' | 'flat';
    fill?: boolean;
    placeholder?: string;
}

export const SubmittableInput = forwardRef<HTMLInputElement,SubmittableInputProps>(({ size = 'small', variant = 'ghost', ...props }, ref) => {
    return (
        <Root size={size} fill={props.fill}>
            <input {...props} ref={ref}/>
            <Button label="Subscribe" color="primary" variant={variant} size={size} onClick={props.onButtonClick}/>
        </Root>
    )
});