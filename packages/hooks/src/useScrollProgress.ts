import { useScroll, useTransform } from 'framer-motion';
import useMeasure from 'react-use-measure';

export const useScrollProgress = () => {
	const [ref, bounds] = useMeasure()
	const { scrollY } = useScroll();
	const value = useTransform(scrollY, [bounds.top - bounds.height, bounds.bottom], [0, 1]);

	return [ref, value]
}