import { useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import useMeasure from 'react-use-measure';

type Result = [(el: HTMLElement | SVGElement | null) => void, MotionValue<number>]

/**
*	Calculates the scroll progress of the ref element as a MotionValue between 0 & 1 (from the el entering the viewport until leaving the viewport.)
*/
export const useScrollProgress = (): Result => {
	const [ref, bounds] = useMeasure()
	const { scrollY } = useScroll();
	const value = useTransform(scrollY, [bounds.top - bounds.height, bounds.bottom], [0, 1]);

	return [ref, value]
}