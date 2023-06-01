import styled from '@emotion/styled';
import { LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';
import BentoIllustration from "./BentoIllustration/BentoIllustration";

const Root = styled.div`
	padding: 5rem 0;
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4rem;
	align-items: flex-start;
	justify-content: center;
	grid-column: span 5;
`;

const IllustrationWrapper = styled.div`
	grid-column: 7 / span 6;
`;

const TrulyRealtime = () => {
	return (
		<Root>
			<Wrapper>
				<Content>
					<div>
						<TitleBlock
							align="left"
						>
							<h6>Powerful & Flexible</h6>
							<h2>Truly Realtime. <br /> As simple as batch.</h2>
							<p>Fennel is built around the philosophy that advanced ML should not be reserved for only the most advanced teams.</p>
							<p>Realtime can be as simple as batch. Fennels data connectors and APIs were crafted so that the <b>exact same code</b> works regardless of wether your data is realtime or batch.</p>
						</TitleBlock>
					</div>
					<LinkButton>
						Read the Documentation
					</LinkButton>
				</Content>
				<IllustrationWrapper>
					<BentoIllustration />
				</IllustrationWrapper>
			</Wrapper>
		</Root>
	);
};

export default TrulyRealtime;