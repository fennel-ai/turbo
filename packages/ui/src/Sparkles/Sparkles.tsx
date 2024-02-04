import { PropsWithChildren, useState } from 'react';
import styled from '@emotion/styled';
import { usePrefersReducedMotion, useRandomInterval } from 'hooks';
import { range } from 'utils';

import { generateSparkle } from "./generateSparkle";
import { SparkleInstance } from './SparkleInstance';

const DEFAULT_COLOR = '#FFC777';

type Props = {
	color?: string;
}

export const Sparkles = ({ color = DEFAULT_COLOR, children, ...props }: PropsWithChildren<Props>) => {
	const [sparkles, setSparkles] = useState(() => {
		return range(4).map(() => generateSparkle(color));
	});

	const prefersReducedMotion = usePrefersReducedMotion();
	
	useRandomInterval(() => {
		const now = Date.now();

		const sparkle = generateSparkle();

		const nextSparkles = sparkles.filter(sparkle => {
			const delta = now - sparkle.createdAt;
			return delta < 1000;
		});
		
		nextSparkles.push(sparkle);
		
		setSparkles(nextSparkles);
	}, prefersReducedMotion ? 0 : 50, prefersReducedMotion ? 0 : 1500);

	return (
		<Wrapper {...props}>
			{sparkles.map(sparkle => (
				<SparkleInstance
					key={sparkle.id}
					color={sparkle.color}
					size={sparkle.size}
					style={sparkle.style}
				/>
			))}
			<ChildWrapper>
				{children}
			</ChildWrapper>
		</Wrapper>
	);
}

const Wrapper = styled.span`
	position: relative;
	display: inline-block;
`;

const ChildWrapper = styled.strong`
	position: relative;
	z-index: 1;
	font-weight: bold;
`;