import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './vitest.setup.ts',
    include: ['src/**/*.test.tsx'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './test-coverage',
      cleanOnRerun: true,
      include: ['src/**'],
      exclude: [
        '**/*.config.ts',
        '**/*.config.js',
        '**/*.d.ts',
        'vitest.setup.ts',
        'node_modules/**',
        'coverage/**',
        'test-coverage/**',
        '.next/**',
      ],
      all: true,
      skipFull: false,
    },
  },
});
