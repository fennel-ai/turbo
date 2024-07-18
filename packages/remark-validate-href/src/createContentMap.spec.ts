import { expect, describe, it } from 'vitest';
import { createContentMap } from './createContentMap';

describe('createContentMap', () => {
	it('should return an object', () => {
		const res = createContentMap([]);

		expect(typeof res, 'object');
	});
})