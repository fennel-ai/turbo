import { useEffect } from "react";

export const useKeyPress = (cb: (e: KeyboardEvent) => void) => {
	useEffect(() => {
		window.addEventListener('keyup', cb);
		return () => window.removeEventListener('keyup', cb);
	}, [cb]);
}