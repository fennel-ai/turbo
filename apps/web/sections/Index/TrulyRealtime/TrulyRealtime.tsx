import styled from '@emotion/styled';
import Link from 'next/link';
import { media } from 'styles/utils';
import { LinkButton, TitleBlock } from "ui";

import { Container } from 'components/Container';
import BentoIllustration from "./BentoIllustration/BentoIllustration";

const Root = styled.div`
	padding: 2rem 0;

	${media('sm')} {
		padding: 5rem 0;
	}
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	row-gap: 2rem;

	${media('md')} {
		row-gap: 0;
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	align-items: flex-start;
	justify-content: center;
	grid-column: span 12;

	${media('sm')} {
		grid-column: span 5;
		gap: 4rem;
	}
`;

const IllustrationWrapper = styled.div`
	grid-column: span 12;

	${media('sm')} {
		grid-column: 7 / span 6;
	}
`;

const TrulyRealtime = () => {
	return (
		<Root data-section>
			<Wrapper>
				<Content>
					<div>
						<TitleBlock
							align="left"
							actions={[
								<Link href="https://fennel.ai/docs/concepts/pipeline/">
									<LinkButton>
										Kappa Pipeline Architecture
									</LinkButton>
								</Link>
							]}
						>
							<h6>Powerful & Flexible</h6>
							<h2>Insanely Realtime. <br /> Exact same code as batch.</h2>
							<p>After all, batch is just a special case of stream processing. Why not future proof your ML stack if realtime came for free?</p>
						</TitleBlock>
					</div>
				</Content>
				<IllustrationWrapper>
					<BentoIllustration />
				</IllustrationWrapper>
			</Wrapper>
		</Root>
	);
};

export default TrulyRealtime;