import { useEffect } from 'react';
import styles from './Calendly.module.scss';

const Calendly = () => {
	useEffect(() => {
		const el = document.createElement('script');
		el.async = true;
		el.src = "https://assets.calendly.com/assets/external/widget.js";
		document.body.appendChild(el);
	}, []);
	return (
		<div className={styles.root}>
		<div className="calendly-inline-widget" data-url="https://calendly.com/nikhilgarg/45mins-with-fennel?hide_event_type_details=1&primary_color=9d62fa" style={{minWidth: 320, height: 720}} />
		</div>
	);
}

export default Calendly;