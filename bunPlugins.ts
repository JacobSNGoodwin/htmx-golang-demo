import { type BunPlugin } from 'bun';

export const litPostCSS: BunPlugin = {
  name: 'litPostCSS',
  async setup(build) {
    console.log('The build config', build.config);
    build.onLoad({ filter: /\.(ts|tsx)$/ }, (args) => {
      console.log('The args in the build', args);

      return {
        contents: 'console.log("Hey baybay")',
        loader: 'ts',
      };
    });
  },
};
