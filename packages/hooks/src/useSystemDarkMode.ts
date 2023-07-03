import { useCallback, useEffect, useState } from 'react';

export const useSystemDarkMode = (stop = false, init = false): boolean => {
	const [darkMode, setDarkMode] = useState(init);

	const handleChange = useCallback(({ matches }: MediaQueryListEvent) => setDarkMode(matches), []);

	useEffect(() => {
		if (typeof window !== 'undefined' && 'matchMedia' in window) {
			if (!stop) {
				const media = window.matchMedia('(prefers-color-scheme: dark)');

				setDarkMode(media.matches);

				media.addEventListener('change', handleChange);

				return () => media.removeEventListener('change', handleChange);
			}
		}

		return undefined;
	}, [handleChange, stop]);

	return darkMode;
};