import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/**/*-test.js'],
        coverage: {
            include: ['src/**/*.js'],
            exclude: ['node_modules', 'test', 'test-data'],
            reporter: ['lcov', 'text-summary']
        }
    }
});