import { ForwardedRef, useRef } from 'react';

interface SharableRef<T> extends Function {
	(ref: T): void;
	current?: T
}

type RefsToShare<T> = (ForwardedRef<T> | undefined)[];

export const useSharedRef = <T>(initialValue?: T | null, refsToShare: RefsToShare<T> = []): SharableRef<T>  => {
	const innerRef = useRef<T | null>(initialValue || null);

	const sharingRef = (value: T) => {
		innerRef.current = value;

		refsToShare.forEach((resolvableRef) => {
			// react supports various types of refs
			if (typeof resolvableRef === 'function') {
				// if it's functional ref - call it with new value
				resolvableRef(value);
			} else if (resolvableRef) {
				/*
				 * it should be ref with .current prop
				 * make sure it exists - if so - assign new value
				 */
				// eslint-disable-next-line no-param-reassign
				resolvableRef.current = value;
			}
		});
	};

	Object.defineProperty(sharingRef, 'current', {
		get() {
			return innerRef.current;
		},
	});

	return sharingRef;
};