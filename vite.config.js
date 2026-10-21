import { defineConfig } from 'vite';
export default defineConfig({test:{environment:'./tests/environment.js',include:['tests/**/*.test.jsx'],setupFiles:['./tests/setup.js']}});
