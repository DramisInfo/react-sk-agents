import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json'],
      reportsDirectory: './test-coverage',
      cleanOnRerun: true,
    },
  },
});
