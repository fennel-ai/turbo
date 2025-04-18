import { Container } from "ui";
import styled from '@emotion/styled';
import { TeamMember } from './TeamMember';
import { media } from 'styles/utils';

const Root = styled.div`
	padding: 5rem 0;
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
				<TeamMember additional="Ex-Facebook · Ex-Google Research" name="Aditya Nambiar" role="Co-Founder" src="/images/Person=Aditya.png" />
				<TeamMember additional="Ex-Databricks" name="Ryan Horner" role="Sales" src="/images/Person=Ryan.png" />
				<TeamMember additional="Ex-Dremio" name="Peeyush Bhatt" role="Sales" src="/images/Person=Peeyush.png" />
				<TeamMember additional="Ex-Stream" name="Luke Smetham" role="Design" src="/images/Person=Luke.png" />
                <TeamMember additional="Ex-Sumo Logic" name="Rahul Khanna" role="Engineer" src="/images/Person=Rahul.png" />
				<TeamMember additional="Ex-Rippling · Ex-Uber" name="Sai Harsha Vellanki" role="Engineer" src="/images/Person=Harsha.png" />
				<TeamMember additional="Ex-Faire · Ex-Google" name="Hoang Phan" role="Engineer" src="/images/Person=Hoang.png" />
				<TeamMember additional="Ex-Civo" name="Balajinaidu V" role="Engineer" src="/images/Person=Balaji.png" />
				<TeamMember additional="Ex-Epifi · Ex-CureFit" name="Nitin Bansal" role="Engineer" src="/images/Person=Nitin.png" />
				<TeamMember additional="Ex-Cred · Ex-Innovaccer" name="Vedant Rathore" role="Engineer" src="/images/Person=Vedant.png" />
				<TeamMember additional="Ex-Rubrik" name="Satwant Rana" role="Engineer" src="/images/Person=Satwant.png" />
				<TeamMember additional="Ex-Onehouse · Ex-Uber" name="Hemanth Kannekanti" role="Engineer" src="/images/Person=Hemanth.png" />
			</Wrapper>
		</Root>
	);
};

export default TeamMembers;
