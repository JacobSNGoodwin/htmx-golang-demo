import { litPostCSS } from './bunPlugins';

await Bun.build({
  entrypoints: ['./scripts/index.ts'],
  outdir: './public/scripts',
  target: 'browser',
  sourcemap: 'external',
  minify: true,
  plugins: [litPostCSS],
});
