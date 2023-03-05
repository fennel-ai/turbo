import { PropsWithChildren } from "react";
import styled from '@emotion/styled';
import { media } from "styles/utils";

const Root = styled.div`
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 1rem;

	${media('xs')} {
		gap: 0rem;
	}
`;

// Ideally this component would be some variation on a table, so it may be temporary.
// For now it let's us get the UI looking 1:1 with figma.
export const TypesList = ({ children }: PropsWithChildren) => {
	return (
		<Root>
			{children}
		</Root>
	);
};

