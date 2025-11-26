import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    output: {
      mode: 'tags-split',
      target: 'src/api.ts',
      schemas: 'src/model',
      client: 'react-query',
      httpClient: 'fetch',
      mock: true,
      override: {
        mutator: {
          path: './src/lib/fetcher.ts',
          name: 'customFetch',
        },
        useDates: true,
      },
      tsconfig: './tsconfig.app.json',
      packageJson: './package.json',
    },
    input: {
      target: '../openapi/openapi.gen.yaml',
    },
  },
});
