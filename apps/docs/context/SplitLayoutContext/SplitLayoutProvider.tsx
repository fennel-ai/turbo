import { ReactNode, useState } from "react";
import styled from '@emotion/styled';
import { media } from 'styles/utils';

import { SplitLayoutContext } from './context';

const SplitLayout = styled.div`
	display: grid;
    width: 100%;
	grid-template-columns: 1fr;
	grid-gap: 2rem;

	${media('sm')} {
		grid-template-columns: repeat(12, 1fr);
	}
`;

const Right = styled.div`
	grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    align-items: stretch;

    ${media('md')} {
        grid-column: span 7;
		position: sticky;
        top: 8rem;
        align-self: start;
        & div:first-of-type {
            margin-top: 0px !important;
        }
	}
`

const Left = styled.div`
	grid-column: span 12;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: stretch;

    ${media('md')} {
        grid-column: span 5;
		position: sticky;
        top: 8rem;
        align-self: start;
	}
`

const SplitLayoutProvider = ({ children }: { children: ReactNode }) => {
    const [stickyRef, setRef] = useState<HTMLDivElement | null>(null);
    return (
        <SplitLayoutContext.Provider value={stickyRef}>
            <SplitLayout>
                <Left>{children}</Left>
                <Right ref={(el) => setRef(el as HTMLDivElement)} />
            </SplitLayout>
        </SplitLayoutContext.Provider>
    );
};

export default SplitLayoutProvider;
