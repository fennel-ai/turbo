import { PropsWithChildren, useEffect, useState, useRef, useCallback } from 'react';
import SectionThemeContext from './SectionThemeContext';
import { useRouter } from 'next/router';

const SectionThemeProvider = ({ children }: PropsWithChildren) => {
	const router = useRouter();

	const [current, setSectionTheme] = useState<'light' | 'dark' | false>(false);

	const prevY = useRef<number>(0);
	const direction = useRef<'up' | 'down'>('up');
	const header = useRef<Element | null>();

	const setScrollDirection = useCallback(() => {
		if (window.scrollY > prevY.current) {
			direction.current = 'down'
		} else {
			direction.current = 'up'
		}

		prevY.current = window.scrollY;
	}, []);

	const getTargetSection = (target: HTMLElement): HTMLElement => {
		if (direction.current === 'up') return target

		if (target.nextElementSibling) {
			return target.nextElementSibling as HTMLElement
		} else {
			return target
		}
	}

	const shouldUpdate = (entry: IntersectionObserverEntry) => {
		if (direction.current === 'down' && !entry.isIntersecting) {
			return true
		}

		if (direction.current === 'up' && entry.isIntersecting) {
			return true
		}

		return false
	}

	const onIntersect: IntersectionObserverCallback = useCallback((entries) => {
		entries.forEach((entry) => {
			setScrollDirection();

			if (!shouldUpdate(entry)) return;

			const target = getTargetSection(entry.target as HTMLElement);
			const theme = (target.dataset.theme as 'light' | 'dark');

			if (theme) {
				setSectionTheme(theme);
			} else {
				setSectionTheme(false)
			}
		})
	}, [setScrollDirection]);

	useEffect(() => {
		header.current = document.querySelector('[data-header]');
		const sections = document.querySelectorAll('[data-section]');
		const observer = new IntersectionObserver(onIntersect, {
			rootMargin: `${(header.current as HTMLElement)?.offsetHeight * -1}px`,
			threshold: 0,
		});

		sections.forEach(section => observer.observe(section));

		return () => observer.disconnect();
	}, [onIntersect, router.pathname]);

	return (
		<SectionThemeContext.Provider value={current}>
			{children}
		</SectionThemeContext.Provider>
	);
};

export default SectionThemeProvider;