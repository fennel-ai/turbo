import { useCallback, useEffect, useRef, useState } from 'react';

type ControlledValueOpts<T> = {
	controlled?: T;
	default?: T;
	name: string;
	state?: 'value' | 'checked';
}

export const useControlledValue = <T = string>({ controlled, default: defaultProp, name, state = 'value' }: ControlledValueOpts<T>): [T | undefined, (value: T) => void] => {
	const { current: isControlled } = useRef(controlled !== undefined);
	const [valueState, setValue] = useState(defaultProp);
	const value = isControlled ? controlled : valueState;

	const defaultValue = useRef(defaultProp);

	useEffect(() => {
		if (JSON.stringify(defaultValue.current) !== JSON.stringify(defaultProp)) {
			console.error(
				[
					`useControlledValue: a component is changing the default ${state} state of an uncontrolled ${name} after being initialized. `
				].join('\n'),
			);
		}
	}, [defaultProp]); // eslint-disable-line react-hooks/exhaustive-deps

	const setUncontrolledValue = useCallback((newValue: T) => {
		if (!isControlled) {
			setValue(newValue);
		}
	}, [isControlled]);

	return [value, setUncontrolledValue]
}