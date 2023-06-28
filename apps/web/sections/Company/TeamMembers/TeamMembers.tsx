import { Container } from "ui";
import styled from '@emotion/styled';
import { TeamMember } from './TeamMember';
import { media } from 'styles/utils';

const Root = styled.div`
	padding: 5rem 0;
	background-color: ${({ theme }) => theme.surface};
`;

const Wrapper = styled(Container)`
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 0rem;

	${media('sm')} {
		gap: 2rem;
	};

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

const TeamMembers = () => {
	return (
		<Root data-section>
			<Wrapper>
				<TeamMember additional="Ex-Facebook · Ex-Quora" name="Nikhil Garg" role="Co-Founder & CEO" src="/images/Person=Nikhil.png" />
				<TeamMember additional="Ex-ThoughtSpot · Ex-Facebook" name="Abhay Bothra" role="Co-Founder & CTO" src="/images/Person=Abhay.png" />
				<TeamMember additional="Ex-Google Brain · Ex-Google Cloud" name="Mohit Reddy" role="Founding Engineer" src="/images/Person=Mohit.png" />
				<TeamMember additional="Ex-Facebook · Ex-Google Research" name="Aditya Nambiar" role="Founding Engineer" src="/images/Person=Aditya.png" />
				<TeamMember additional="Ex-Facebook · Ex-Flexport" name="Xiao Jiang" role="Founding Engineer" src="/images/Person=Xiao.png" />
				<TeamMember additional="Ex-Stream" name="Luke Smetham" role="Design" src="/images/Person=Luke.png" />
				<TeamMember additional="Ex-Confluent · Ex-MongoDB" name="Cree Thompson" role="Sales" src="/images/Person=Cree.png" />
			</Wrapper>
		</Root>
	);
};

export default TeamMembers;
