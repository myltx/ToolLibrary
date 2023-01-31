import { test, expect } from 'vitest';
import { func } from '../dist/index.esm.js';
test('A number should be returned', () => {
  expect(func(1, 2)).toBe(3);
});
