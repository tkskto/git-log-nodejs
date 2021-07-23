import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
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
  dependencies: 
    ${dependencies.trim()}
*/`;

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'es',
      banner,
    },
    external: [
      'fs',
      'path',
      'child_process',
    ],
    plugins: [
      json(),
      commonjs(),
      nodeResolve(),
      typescript({
        tsconfig: 'tsconfig.json',
      }),
    ],
  },
];
