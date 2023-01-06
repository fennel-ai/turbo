import * as React from 'react';

interface Props {
	primary?: boolean;
	label?: string;
}

const baseStyles = {
	border: 0,
	margin: 0,
	padding: '0 0.75rem',
	height: '2.5rem',
	borderRadius: '0.5rem',
	cursor: 'pointer',
	fontSize: '0.875rem',
	lineHeight: '1rem',
	fontFamily: 'Satoshi Variable',
	fontVariationSettings: "'wght' 600",
};

const styles = {
	primary: {
		...baseStyles,
		backgroundColor: '#5D4CBE',
		color: '#FFFFFF',
		boxShadow: '0px 1px 2px rgba(72, 69, 81, 0.4), 0px 0px 0px 1px #5D4CBE, 0px 4px 6px rgba(72, 69, 81, 0.08)',
	},
	secondary: {
		...baseStyles,
		backgroundColor: '#E5DEFF',
		color: '#190064',
		boxShadow: '0px 1px 2px rgba(72, 69, 81, 0.12), 0px 0px 0px 1px #E5DEFF, 0px 4px 6px rgba(72, 69, 81, 0.04)'
	}
}

export const Button = ({
	primary = false,
	label = "Label",
}: Props) => {
	return (
		<button style={primary ? styles.primary : styles.secondary}>
			{label}
		</button>
	);
};