import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: 'jsdom',
        globals: true,
        // setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html', 'lcov'],
            include: ['app/**/*.{ts,tsx}'],
            exclude: [
                'node_modules/',
                '.next/',
                'out/',
                '**/*.d.ts',
                '**/*.spec.ts',
                '**/*.spec.tsx',
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 70,
                statements: 80
            }
        },
        pool: 'threads',
        css: false,
    },
})