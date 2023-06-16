import { usePresence } from "framer-motion";
import { useEffect } from "react";

export const useModalPresence = () => {
	const [isPresent, safeToRemove] = usePresence();

	useEffect(() => {
		if (isPresent) {
			document.body.style.overflow = 'hidden';
		}

		if (safeToRemove) {
			safeToRemove();
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isPresent, safeToRemove]);

	return isPresent;
}