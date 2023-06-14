import { MouseEventHandler, useRef } from 'react';
import { TeamMember } from './TeamMember';
import styles from './TeamMembers.module.scss';

import { Container } from "components/Container";

const TeamMembers = () => {
	const el = useRef<HTMLDivElement>(null);

	const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
		if (el.current) {
			el.current.style.setProperty('--mouse-x', `${e.pageX}`);
			el.current.style.setProperty('--mouse-y', `${e.pageY}`);
		}
	};

	function handleMouseEnter() {
		if (el.current) {
			el.current.style.setProperty('--global-shimmer-alpha', "0.6");
		}
	}

	function handleMouseLeave() {
		if (el.current) {
			el.current.style.setProperty('--global-shimmer-alpha', "0");
		}
	}

	return (
		<div data-section ref={el} className={styles.root} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
			<Container className={styles.container}>
				<TeamMember additional="Ex-Facebook · Ex-Quora" name="Nikhil Garg" role="Co-Founder & CEO" src="/images/Person=Nikhil.png" />
				<TeamMember additional="Ex-ThoughtSpot · Ex-Facebook" name="Abhay Bothra" role="Co-Founder & CTO" src="/images/Person=Abhay.png" />
				<TeamMember additional="Ex-Google Brain · Ex-Google Cloud" name="Mohit Reddy" role="Founding Engineer" src="/images/Person=Mohit.png" />
				<TeamMember additional="Ex-Facebook · Ex-Google Research" name="Aditya Nambiar" role="Founding Engineer" src="/images/Person=Aditya.png" />
				<TeamMember additional="Ex-Facebook · Ex-Flexport" name="Xiao Jiang" role="Founding Engineer" src="/images/Person=Xiao.png" />
				<TeamMember additional="Ex-Stream" name="Luke Smetham" role="Design" src="/images/Person=Luke.png" />
				<TeamMember additional="Ex-Confluent · Ex-MongoDB" name="Cree Thompson" role="Sales" src="/images/Person=Nikhil.png" />
			</Container>
		</div>
	);
};

export default TeamMembers;
