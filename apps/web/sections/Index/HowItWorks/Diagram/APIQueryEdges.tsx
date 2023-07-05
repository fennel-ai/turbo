import { useTheme } from "@emotion/react";
import { motion } from 'framer-motion';

const VARIANTS = {
	"0": {
		opacity: 0,
	},
	"1": {
		opacity: 0,
	},
	"2": {
		opacity: 0,
	},
	"3": {
		opacity: 1,
	}
};

const APIQueryEdges = () => {
	const theme = useTheme();
	return (
		<motion.g variants={VARIANTS}>
			<path d="M594.146 322.647C593.951 322.842 593.951 323.159 594.146 323.354L597.328 326.536C597.524 326.731 597.84 326.731 598.035 326.536C598.231 326.34 598.231 326.024 598.035 325.829L595.207 323L598.035 320.172C598.231 319.976 598.231 319.66 598.035 319.465C597.84 319.269 597.524 319.269 597.328 319.465L594.146 322.647ZM603.001 323L603.001 322.5L603.001 323ZM607.001 319L607.501 319L607.001 319ZM603.001 322.5L594.5 322.5L594.5 323.5L603.001 323.5L603.001 322.5ZM606.5 237.499L606.501 319L607.501 319L607.5 237.499L606.5 237.499ZM611.5 232.5C608.739 232.5 606.5 234.738 606.5 237.499L607.5 237.499C607.5 235.29 609.291 233.5 611.5 233.5L611.5 232.5ZM603.001 323.5C605.486 323.5 607.501 321.485 607.501 319L606.501 319C606.501 320.933 604.934 322.5 603.001 322.5L603.001 323.5Z" fill={theme.success.accent} />
			<path d="M594.147 130.154C593.951 129.958 593.951 129.642 594.147 129.446L597.329 126.264C597.524 126.069 597.84 126.069 598.036 126.264C598.231 126.46 598.231 126.776 598.036 126.972L595.207 129.8L598.036 132.628C598.231 132.824 598.231 133.14 598.036 133.335C597.84 133.531 597.524 133.531 597.329 133.335L594.147 130.154ZM607.001 228.473L607.501 228.473L607.001 228.473ZM603.001 129.8L603.001 130.3L603.001 129.8ZM607.001 133.8L607.501 133.8L607.001 133.8ZM603.001 130.3L594.5 130.3L594.5 129.3L603.001 129.3L603.001 130.3ZM606.501 228.473L606.501 133.8L607.501 133.8L607.501 228.473L606.501 228.473ZM611.501 233.472C608.74 233.472 606.501 231.234 606.501 228.473L607.501 228.473C607.501 230.681 609.292 232.472 611.5 232.472L611.501 233.472ZM603.001 129.3C605.487 129.3 607.501 131.315 607.501 133.8L606.501 133.8C606.501 131.867 604.934 130.3 603.001 130.3L603.001 129.3Z" fill={theme.success.accent} />
		</motion.g>
	);
}

export default APIQueryEdges;