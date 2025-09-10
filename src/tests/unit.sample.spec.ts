import { describe, it, expect } from 'vitest';

function add(a: number, b: number) {
  return a + b;
}

describe('샘플 유닛', () => {
  it('덧셈', () => {
    expect(add(1, 2)).toBe(3);
  });
});
