import styled from '@emotion/styled';
import { TitleBlock } from "ui";

const Section = styled.div`
	max-width: 80.5rem;
	margin: 0 auto;
	padding: 5rem 0;
`;

export default function Web() {
  return (
    <main>
		<Section>
			<TitleBlock 
				align="center" 
				size="large"
				title="Feature Engineering for Modern Data Scientists"
				text="Enterprise-grade ML infrastructure for teams of all sizes. Fennel is a feature engineering platform designed to help you store, serve, discover and scale with ease."
			/>
		</Section>
		<Section>
			<TitleBlock 
				align="left" 
				subtitle="Redefine your ML & Data Ops"
				title="Ship Features 100x Faster"
			/>
		</Section>
		<Section>
			<TitleBlock 
				align="left" 
				subtitle="Best-in-class data quality tooling"
				title="No more feature or data bugs"
			/>
		</Section>
		<Section>
			<TitleBlock 
				align="left" 
				subtitle="Powerful & Flexible"
				title="Truly Realtime. As simple as batch."
			/>
		</Section>
		<Section>
			<TitleBlock 
				align="center" 
				subtitle="Enterprise-Grade Performance"
				title="Hassle-free Scaling"
			/>
		</Section>
		<Section>
			<TitleBlock 
				align="center" 
				subtitle="How it works"
				title="Read & Write Path Separation"
				text="The right abstraction for realtime feature engineering"
			/>
		</Section>
		<Section>
			<TitleBlock 
				align="center" 
				subtitle="Craftsman-like passion for Developer Experience"
				title="Architected with Love"
			/>
		</Section>
		<Section>
			<TitleBlock 
				align="center" 
				title="Experience the Fastest ML Workflow"
			/>
		</Section>
    </main>
  );
}
