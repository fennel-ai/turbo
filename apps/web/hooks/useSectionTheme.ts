import { useCallback, useEffect, useRef } from 'react';

export const useSectionTheme = () => {
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
			const theme = target.dataset.theme;

			if (theme) {
				document.body?.setAttribute('data-section-theme', theme);
			} else {
				document.body?.removeAttribute('data-section-theme');
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
	}, [onIntersect]);
};