import { defineConfig, type ConfigEnv } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }: ConfigEnv) => ({
    plugins: command === 'serve'
        ? [tsconfigPaths(), react()]
        : [tsconfigPaths()],

    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: ['./vitest.setup.ts'],
        coverage: {
            provider: 'v8' as const,
            reporter: ['text', 'json', 'html', 'lcov'],
            include: ['app/**/*.{ts,tsx}'],
            exclude: [
                'node_modules/',
                '.next/',
                'out/',
                '**/*.d.ts',
                '**/*.spec.ts',
                '**/*.spec.tsx',
                '**/*.layout.tsx',
                '**/*.types.ts',
                '**/index.ts',
                '**/app/**/layout.tsx',
                '**/app/**/page.tsx',
                '**/app/**/loading.tsx',
                '**/app/**/error.tsx',
                'app/(admin)/admin/(AdminPanel)/_features/users/types/**',
                'app/_types/**',
                'app/_shared/api-client.ts',
                'app/_shared/contexts/**',
                'app/_components/core/**'
            ],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 70,
                statements: 80
            }
        },
        pool: 'threads',
        css: false
    }
}))