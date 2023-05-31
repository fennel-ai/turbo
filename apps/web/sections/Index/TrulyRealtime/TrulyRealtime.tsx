import { LinkButton, TitleBlock } from "ui";

import { Illustration } from "components/Illustration";
import { SplitSection } from "components/SplitSection";

const TrulyRealtime = () => {
	return (
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
	);
};

export default TrulyRealtime;