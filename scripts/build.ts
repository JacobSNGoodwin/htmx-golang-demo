import { litPostCSS } from './plugins';

await Bun.build({
  entrypoints: ['./scripts/src/index.ts'],
  outdir: './public/scripts',
  target: 'browser',
  sourcemap: 'external',
  minify: true,
  plugins: [litPostCSS],
});
