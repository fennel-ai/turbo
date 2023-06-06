import { Children, PropsWithChildren, WheelEventHandler, useCallback, useEffect, useRef } from "react";
import styled from '@emotion/styled';
import { motion, useSpring, useAnimationFrame, useTransform, PanInfo, MotionValue } from "framer-motion";
import { useWindowSize } from "@react-hook/window-size";

const opts = {
	speed: 1.5,
	threshold: 0.014,
	wheelFactor: 1.8,
	dragFactor: 1.2
};

const Root = styled(motion.div)`
	display: flex;
	align-items: center;
	cursor: -webkit-grab;
	overflow: hidden;
	width: 100%;
`;

const Page = styled(motion.div)`
	display: flex;
	gap: 4rem;
	font-size: 10vw;
	white-space: nowrap;
	-webkit-user-select: none;
	user-select: none;
	padding-right: 4rem;
`;


const MarqueePage = ({ children, speed }: PropsWithChildren<{speed: MotionValue<any> }>) => {
	const page = useRef<HTMLDivElement>(null);
	const rect = useRef<DOMRect>();
	const x = useRef(0);

	const [width, height] = useWindowSize();

	const setX = () => {
		if (!page.current || !rect.current) return;
		const w = rect.current.width;
		const xPercentage = (x.current / w) * 100;

		if (xPercentage < -100) x.current = 0;
		if (xPercentage > 0) x.current = -w;

		page.current.style.transform = `translate3d(${xPercentage}%, 0, 0)`;
	};

	useEffect(() => {
		if (!page.current) return;
		rect.current = page.current.getBoundingClientRect();
	}, [width, height]);

	const loop = useCallback(() => {
		x.current -= speed.get();
		setX();
	}, [speed]);

	useAnimationFrame(loop);

	return (
		<Page ref={page}>
			{children}
		</Page>
	);
};

export const Marquee = (props: PropsWithChildren) => {
	const marquee = useRef<HTMLDivElement>(null);
	const slowDown = useRef(false);

	const x = useRef(0);
	const [w] = useWindowSize();

	const speed = useSpring(opts.speed, {
		damping: 40,
		stiffness: 90,
		mass: 5
	});

	const skewX = useTransform(speed, [-w * 0.25, 0, w * 0.25], [-25, 0, 25]);

	const onDragStart = () => {
		if (!marquee.current) return;

		slowDown.current = true;
		marquee.current.classList.add("drag");
		speed.set(0);
	};

	const onDrag = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
		speed.set(opts.dragFactor * -info.delta.x);
	};

	const onDragEnd = (e: MouseEvent | TouchEvent | PointerEvent) => {
		if (!marquee.current) return;
		slowDown.current = false;
		marquee.current.classList.remove("drag");
		x.current = opts.speed;
	};

	const onMouseOver = () => {
		speed.set(opts.speed * 0.2);
	}
	
	const onMouseLeave = () => {
		speed.set(opts.speed);
	}

	const loop = useCallback(() => {
		if (slowDown.current || Math.abs(x.current) < opts.threshold) return;

		x.current *= 0.66;
		if (x.current < 0) {
			x.current = Math.min(x.current, 0);
		} else {
			x.current = Math.max(x.current, 0);
		}

		speed.set(opts.speed + x.current);
	}, [speed]);

	useAnimationFrame(loop);

	return (
		<Root
			ref={marquee}
			style={{ skewX }}
			drag="x"
			dragConstraints={{ left: 0, right: 0 }}
			onDragStart={onDragStart}
			onDrag={onDrag}
			onDragEnd={onDragEnd}
			onMouseOver={onMouseOver}
			onMouseLeave={onMouseLeave}
			dragElastic={0.000001}
		>
			<MarqueePage speed={speed}>
				{props.children}
			</MarqueePage>
			<MarqueePage speed={speed}>
				{props.children}
			</MarqueePage>
			<MarqueePage speed={speed}>
				{props.children}
			</MarqueePage>
		</Root>
	);;
};
