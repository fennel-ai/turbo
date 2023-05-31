import { Children, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import { AnimationPlaybackControls, useAnimate, useInView } from 'framer-motion';

import { Card } from './Card';

type Props = {
	duration?: number;
	isPlaying?: boolean;
	direction?: number;
	gutter?: number;
}

const Root = styled.div`
	width: 100%;
	height: 100%;
	overflow: hidden;
`;

const Track = styled.div<{ gutter: number }>`
	display: flex;
	align-items: center;
	gap: ${({ gutter }) => gutter}px;
`;

const Item = styled(Card)`
	flex-shrink: 0;
	width: 376px;
	height: 352px;
	padding: 2rem;
`;

export const Ticker = (props: PropsWithChildren<Props>) => {
	const { children, direction = -1, duration = 20, isPlaying, gutter = 64 } = props;

	const tickerRef = useRef<HTMLDivElement>(null);
	
	const [numDupes, setNumDupes] = useState<number>(1);
	const [contentWidth, setContentWidth] = useState<number>(2);
	const [animationControls, setAnimationControls] = useState<AnimationPlaybackControls | undefined>(undefined);
	
	const [scope, animate] = useAnimate();
	const isInView = useInView(tickerRef);


	useEffect(() => {
		if (tickerRef.current && numDupes) {
			setContentWidth(tickerRef.current.scrollWidth / numDupes + gutter);
		}
	}, [gutter, numDupes]);

	useEffect(() => {
		if (tickerRef.current && contentWidth) {
			setNumDupes(Math.max(Math.ceil((2 * tickerRef.current.clientWidth) / contentWidth), 1));
		}
	}, [contentWidth]);

	useEffect(() => {
		if (isInView && !animationControls) {
			const controls = animate(
				scope.current,
				{ x: contentWidth * direction },
				{ ease: 'linear', duration, repeat: Infinity }
			);
			controls.play();
			setAnimationControls(controls);
		}
	}, [animate, animationControls, contentWidth, direction, duration, isInView, numDupes, scope]);

	useEffect(() => {
		if (animationControls) {
			if (!isInView || !isPlaying) {
				animationControls.pause();
			} else {
				animationControls.play();
			}
		}
	}, [animationControls, isInView, isPlaying]);

	const renderChildren = useCallback(() => Children.map(children, (child, index) => (
		<Item key={index}>
			{child}
		</Item>
	)), [children]);

	return (
		<Root
			ref={tickerRef}
		>
			<Track gutter={gutter} ref={scope}>
				{renderChildren()}
				{[...Array(numDupes)].map(() => renderChildren())}
			</Track>
		</Root>
	);
};