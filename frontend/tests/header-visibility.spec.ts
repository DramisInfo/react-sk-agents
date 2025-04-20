import { test, expect } from '@playwright/test';

test.describe('Header Visibility Tests', () => {
  test('header should be visible on the homepage', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Wait for any potential animations or loading to complete
    await page.waitForLoadState('networkidle');
    
    // Find the header element
    const header = await page.locator('header');
    
    // Check if the header exists
    await expect(header, 'Header element should exist on the page').toHaveCount(1);
    
    // Check if the header is visible in the viewport
    await expect(header, 'Header should be visible').toBeVisible();
    
    // Check if the header contains the app logo text
    await expect(header.locator('text=SK Agents')).toBeVisible();
    
    // Get bounding box to verify position
    const boundingBox = await header.boundingBox();
    console.log('Header position:', boundingBox);
    
    // Header should be at or near the top of the page (allowing for minimal margins)
    expect(boundingBox?.y, 'Header should be at the top of the page').toBeLessThanOrEqual(10);
    
    // Capture screenshot for visual verification
    await page.screenshot({ path: './test-results/header-visibility.png' });
    
    // Check computed styles that might affect visibility
    const isVisible = await header.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return {
        display: styles.display,
        visibility: styles.visibility,
        opacity: styles.opacity,
        position: styles.position,
        zIndex: styles.zIndex,
        transform: styles.transform,
        height: styles.height,
        width: styles.width
      };
    });
    
    console.log('Header computed styles:', isVisible);
    
    // Header should have appropriate display and visibility styles
    expect(isVisible.display).not.toBe('none');
    expect(isVisible.visibility).not.toBe('hidden');
    expect(Number(isVisible.opacity)).toBeGreaterThan(0);
  });
});
