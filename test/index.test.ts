import { Dummy } from '../src/Dummy';

describe('sum module', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(Dummy.sum(1, 2)).toBe(3);
  });
});