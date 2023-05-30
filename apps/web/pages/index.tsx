import styled from '@emotion/styled';
import { LinkButton, TextBlock, TitleBlock } from 'ui';
import PythonIcon from 'ui/icons/python.svg';
import { Hero } from 'components/Hero';
import { Section } from 'components/Section';
import { SplitSection } from 'components/SplitSection';
import { Illustration } from 'components/Illustration';

const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	row-gap: 3rem;
	column-gap: 2rem;
`;

export default function Index() {
  return (
    <main>
		<Hero />
		<SplitSection illustration={<Illustration />}>
			<TitleBlock
				align="left"
				subtitle="Redefine your ML & Data Ops"
				title="Ship Features 100x Faster"
			/>
			<Grid>
				<TextBlock icon={<PythonIcon />}>
					<b>Real Python. No DSLs.</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Automatic Backfills</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<PythonIcon />}>
					<b>Fully Managed Infrastructure</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock button={<LinkButton>Learn more</LinkButton>} icon={<PythonIcon />}>
					<b>Feature repository for reuse</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
			</Grid>
		</SplitSection>
		  <SplitSection direction="reverse" illustration={<Illustration />}>
			<TitleBlock
				align="left"
				subtitle="Best-in-class data quality tooling"
				title="No more feature or data bugs"
			/>
			<Grid>
				<TextBlock icon={<PythonIcon />}>
					<b>Strong Typing</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Immutability & Versioning</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Unit Testing</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Compile Time Validation</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Data Expectation</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
				<TextBlock icon={<PythonIcon />}>
					<b>Online / Offline Skew</b><br />
					tempor sunt. Qui explicabo ut aut eum illum sint ut est a. Dolorem voluptatem eveniet quae.
				</TextBlock>
			</Grid>
			<LinkButton>
				Learn more about Data Quality with Fennel
			</LinkButton>
		</SplitSection>
		  <SplitSection direction="reverse" illustration={<Illustration />}>
			<div>
				<TitleBlock
					align="left"
					subtitle="Powerful & Flexible"
					title="Truly Realtime. As simple as batch."
				/>
				<p>Fennel is built around the philosophy that advanced ML should not be reserved for only the most advanced teams.</p>
				<p>Realtime can be as simple as batch. Fennels data connectors and APIs were crafted so that the exact same code works regardless of wether your data is realtime or batch.</p>
			</div>
			<LinkButton>
				Read the Documentation
			</LinkButton>
		</SplitSection>
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
