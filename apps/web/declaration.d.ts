declare module '*.scss' {
	const styles: Array<CSStyleSheet> | CSStyleSheet;
	export default styles;
}

interface BasePageProps {
	dark_mode: boolean;
}