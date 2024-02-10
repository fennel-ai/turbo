import { type ReactNode, useContext } from 'react';
import { createPortal } from 'react-dom';
import { SplitLayoutContext } from 'context/SplitLayoutContext';


const Sticky = ({ children }: { children: ReactNode | undefined }) => {
    const stickyRef = useContext(SplitLayoutContext)
    return stickyRef ? createPortal(children, stickyRef as HTMLDivElement) : children;
};

export default Sticky;