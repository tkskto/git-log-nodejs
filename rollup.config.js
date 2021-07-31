import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import pkg from './package.json';

let dependencies = '';

for (const name in pkg.dependencies) {
  if (Object.prototype.hasOwnProperty.call(pkg.dependencies, name)) {
    dependencies += `    ${name} -- ${pkg.dependencies[name]}\n`;
  }
}

const banner = `/*!
  ${pkg.name} v${pkg.version}
  ${pkg.author.url}
  Released under the ${pkg.license} License.
  See LICENSE for full license.
  dependencies: 
    ${dependencies.trim()}
*/`;

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      banner,
    },
    external: [
      'fs',
      'path',
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
