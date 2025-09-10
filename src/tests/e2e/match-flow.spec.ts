import { test, expect } from '@playwright/test';

test('모집글 상세 → 지원 → 수락', async ({ request }) => {
  const res = await request.get('/api/bff/matches/p1');
  expect(res.ok()).toBeTruthy();
  const detail = await res.json();
  expect(detail.id).toBe('p1');

  const apply = await request.post('/api/bff/matches/p1/apply', {
    data: { role: '보컬' },
  });
  expect(apply.ok()).toBeTruthy();

  const accept = await request.post('/api/bff/matches/p1/accept');
  expect(accept.ok()).toBeTruthy();
});
