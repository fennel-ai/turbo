//! NOTE: This file is no longer used but kept around for backwards compat 
//! until we have remove all mention of <Divider> & <Left|RightSection> 
//! from the content source files. Functionality is now moved to LayoutContext.

import { PropsWithChildren } from "react";


export const Divider = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
        </>
    );
}

export const RightSection = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
        </>
    )
}

export const LeftSection = ({ children }: PropsWithChildren) => {
    return (
        <>
            {children}
        </>
    )
}