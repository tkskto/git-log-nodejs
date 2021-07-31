import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.author.url}
  Released under the ${pkg.license} License.
  See LICENSE for full license.
*/`;

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      banner,
    },
    external: [
      'child_process',
    ],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
    ],
  },
];
