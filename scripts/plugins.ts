import { type BunPlugin } from 'bun';

export const litPostCSS: BunPlugin = {
  name: 'litPostCSS',
  setup(build) {
    console.log('The build config source map', build.config.sourcemap);
    build.onLoad({ filter: /\.(ts|tsx)$/ }, (args) => {
      console.log('The args in the build', args);

      return {
        contents: 'Some new contents!',
        loader: 'ts',
      };
    });
  },
};
