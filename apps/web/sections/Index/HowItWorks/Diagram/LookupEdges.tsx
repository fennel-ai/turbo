import { useTheme } from "@emotion/react";
import { motion } from 'framer-motion';

const VARIANTS = {
	"0": {
		scaleX: 0,
	},
	"1": {
		scaleX: 0,
	},
	"2": {
		scaleX: 0,
	},
	"3": {
		scaleX: 1,
		transition: {
			delay: 0.5
		}
	}
};

const styles = {
	transformOrigin: 'center right'
}

const LookupEdges = () => {
	const theme = useTheme();
	return (
		<g>
			<motion.path style={styles} variants={VARIANTS} d="M400.646 129.646C400.451 129.842 400.451 130.158 400.646 130.354L403.828 133.536C404.024 133.731 404.34 133.731 404.536 133.536C404.731 133.34 404.731 133.024 404.536 132.828L401.707 130L404.536 127.172C404.731 126.976 404.731 126.66 404.536 126.464C404.34 126.269 404.024 126.269 403.828 126.464L400.646 129.646ZM497 129.5H401V130.5H497V129.5Z" fill={theme.success.accent} />
			<motion.path style={styles} variants={VARIANTS} d="M399.646 322.646C399.451 322.842 399.451 323.158 399.646 323.354L402.828 326.536C403.024 326.731 403.34 326.731 403.536 326.536C403.731 326.34 403.731 326.024 403.536 325.828L400.707 323L403.536 320.172C403.731 319.976 403.731 319.66 403.536 319.464C403.34 319.269 403.024 319.269 402.828 319.464L399.646 322.646ZM495 322.5L449.886 322.5L449.886 323.5L495 323.5L495 322.5ZM449.886 322.5L400 322.5L400 323.5L449.886 323.5L449.886 322.5Z" fill={theme.success.accent} />
		</g>
	);
}

export default LookupEdges;