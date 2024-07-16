declare module '*.scss' {
	const styles: Array<CSStyleSheet> | CSStyleSheet;
	export default styles;
}

interface BasePageProps {
	theme: 'dark' | 'light';
    footer?: 'slim' | 'default';
}