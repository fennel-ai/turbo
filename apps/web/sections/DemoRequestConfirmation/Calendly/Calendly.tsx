import { useEffect } from 'react';
import styled from '@emotion/styled';

const Root = styled.div`
	position: relative;
	color: ${({ theme }) => theme.on};
	padding: 2rem 0 5rem 0;
	z-index: 0;
	overflow: hidden;
`;

const Calendly = () => {
	useEffect(() => {
		const el = document.createElement('script');
		el.async = true;
		el.src = "https://assets.calendly.com/assets/external/widget.js";
		document.body.appendChild(el);
	}, []);
	return (
		<Root>
			<div className="calendly-inline-widget" data-url="https://calendly.com/nikhilgarg/45mins-with-fennel?hide_event_type_details=1&primary_color=9d62fa" style={{minWidth: 320, height: 720}} />
		</Root>
	);
}

export default Calendly;