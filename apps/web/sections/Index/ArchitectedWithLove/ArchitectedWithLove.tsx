import styled from '@emotion/styled';
import { LinkButton, Ticker, TitleBlock } from 'ui';

import { Container } from 'components/Container';

const Root = styled.div`
	padding: 5rem 0;
	display: flex;
	flex-direction: column;
	gap: 3rem;
	align-items: center;
`;

const Wrapper = styled(Container)`
	display: flex;
	flex-direction: column;
	gap: 4rem;
`;

const ArchitectedWithLove = () => {
	return (
		<Root>
			<Wrapper>
				<TitleBlock
					align="center"
					subtitle="Craftsman-like passion for Developer Experience"
					title="Architected with Love"
				/>
			</Wrapper>
			<Ticker isPlaying>
				<p>a</p>
				<p>b</p>
				<p>c</p>
				<p>d</p>
				<p>e</p>
				<p>f</p>
				<p>g</p>
			</Ticker>
			<LinkButton>Explore the Architecture</LinkButton>
		</Root>
	);
};

export default ArchitectedWithLove;