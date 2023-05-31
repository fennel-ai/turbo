import { TitleBlock } from 'ui';
import { Container } from 'components/Container';
import { HassleFreeScaling, Hero, NoMoreBugs, ShipFaster, TrulyRealtime } from 'sections/Index';

export default function Index() {
  return (
    <main>
		<Hero />
		<ShipFaster />
		<NoMoreBugs />
		<TrulyRealtime />
		<HassleFreeScaling />
		<Container>
			<TitleBlock 
				align="center" 
				subtitle="How it works"
				title="Read & Write Path Separation"
				text="The right abstraction for realtime feature engineering"
			/>
		</Container>
		<Container>
			<TitleBlock 
				align="center" 
				subtitle="Craftsman-like passion for Developer Experience"
				title="Architected with Love"
			/>
		</Container>
		<Container>
			<TitleBlock 
				align="center" 
				title="Experience the Fastest ML Workflow"
			/>
		</Container>
    </main>
  );
}
