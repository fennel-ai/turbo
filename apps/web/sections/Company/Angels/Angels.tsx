import styled from '@emotion/styled';
import { Container, TitleBlock } from 'ui';
import { media } from 'styles/utils';
import Image from 'next/image';

import { TeamMember } from '../TeamMembers/TeamMember';

const Root = styled.div`
	padding: 5rem 0;
	background-color: ${({ theme }) => theme.surface};
	display: flex;
	flex-direction: column;
	align-items: stretch;
	gap: 5rem;
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 2rem;
`;

const Content = styled.div`
	grid-column: span 12;

	${media('md')} {
		grid-column: 3 / span 8;
	}
`;

const Grid = styled(Wrapper)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 2rem;

	& > div {
		grid-column: span 12;
		
		${media('xs')} {
			grid-column: span 6;
		}

		${media('sm')} {
			grid-column: span 4;
		}

		${media('lg')} {
			grid-column: span 3;
		}
	}
`;

const Investors = styled(Grid)`
	align-items: center;
	gap: 2rem;
	
	& > div {
		display: flex;
		align-items: center;
		justify-content: center;

		grid-column: span 12;
		
		${media('sm')} {
			grid-column: span 4;
		}
	}	
`;

const Angels = () => {
	return (
		<Root data-section>
			<Wrapper>
				<Content>
					<TitleBlock
						center
					>
						<h2>Backed by Top VCs & Angels</h2>
					</TitleBlock>
				</Content>
			</Wrapper>
			<Grid>
				<TeamMember src="/images/Person=Neha Narkhede.png" name="Neha Narkhede" role="Co-Founder & Board Member at Confluent · Creator of Kafka" />
				<TeamMember src="/images/Person=Adam D'Angelo.png" name="Adam D'Angelo" role="Founder & CEO, Quora · Ex-CTO Facebook" />
				<TeamMember src="/images/Person=Ajeet Singh.png" name="Ajeet Singh" role="2x Unicorn Founder · Co-Founder & Executive Chairman, ThoughtSpot" />
				<TeamMember src="/images/Person=John Hegeman.png" name="John Hegeman" role="VP Ads & Business Products, Facebook" />
				<TeamMember src="/images/Person=Anantha Kancherala.png" name="Anantha Kancherla" role="AI Platform Engineering, Facebook · ex-VP of Engineering, Lyft" />
				<TeamMember src="/images/Person=Mikhail Parakhin.png" name="Mikhail Parakhin" role="CEO, Advertising & Web Services, Microsoft · Ex-Yandex CTO" />
			</Grid>
			<Investors>
				<div>
					<Image src="/images/foundation.svg" alt="Foundation Capital Logo" width={226} height={72} />
				</div>
				<div>
					<Image src="/images/scribble.svg" alt="Scribble Ventures Logo" width={204} height={72} />
				</div>
				<div>
					<Image src="/images/essence.svg" alt="Essence Logo" width={264} height={48} />
				</div>
			</Investors>
		</Root>
	);
};

export default Angels;
