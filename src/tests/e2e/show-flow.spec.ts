import { test, expect } from '@playwright/test';

test('공연 상세 → 좌석 미리보기 → 할인 프리뷰', async ({ page }) => {
  await page.goto('/');
  await page.locator('a.card').first().click();
  await expect(page.getByText('좌석 미리보기')).toBeVisible();
  await expect(page.getByText(/잔여/)).toBeVisible();
});
