import { TitleBlock } from 'ui';
import { Container } from 'components/Container';
import { ArchitectedWithLove, HassleFreeScaling, Hero, HowItWorks, NoMoreBugs, ShipFaster, TrulyRealtime } from 'sections/Index';

export default function Index() {
  return (
    <main>
		<Hero />
		<ShipFaster />
		<NoMoreBugs />
		<TrulyRealtime />
		<HassleFreeScaling />
		<HowItWorks />
		<ArchitectedWithLove />
		<Container>
			<TitleBlock 
				align="center" 
				title="Experience the Fastest ML Workflow"
			/>
		</Container>
    </main>
  );
}
