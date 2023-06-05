import styled from "@emotion/styled";
import { Card } from 'ui';
import { media } from "styles/utils";

export const Illustration = styled(Card)`
	height: 20rem;

	${media('sm')} {
		height: 40rem;
	}
`;