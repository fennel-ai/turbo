import { useCallback, useEffect, useState } from 'react';

export const useMatchMedia = (query: string) => {
	const [match, setMatch] = useState(false);

	const handleChange = useCallback(({ matches }: MediaQueryListEvent) => setMatch(matches), []);

	useEffect(() => {
		if (typeof window !== 'undefined' && 'matchMedia' in window) {
			if (query) {
				const media = window.matchMedia(query);

				setMatch(media.matches);

				media.addEventListener('change', handleChange);

				return () => media.removeEventListener('change', handleChange);
			}
		}

		return undefined;
	}, [handleChange, query]);

	return match;
};