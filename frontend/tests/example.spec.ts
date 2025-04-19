import { test, expect } from '@playwright/test';

// Example UI test for the Next.js homepage

test('homepage loads and displays welcome text', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  // Adjust the selector/text below to match your actual homepage content
  await expect(page.getByRole('heading', { name: /welcome/i })).toBeVisible();
});
