// Bun currently doesn't support build watch of entrypoints from Bun.build
// See https://github.com/oven-sh/bun/issues/5866
// For pluggins, we require Bun.build

// await Bun.build({
//   entrypoints: ['./scripts/index.ts'],
//   outdir: './public/scripts',
//   target: 'browser',
//   sourcemap: 'external',
//   minify: true,
//   plugins: [],
// });
