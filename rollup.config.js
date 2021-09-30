import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import cssnano from 'cssnano'
import external from 'rollup-plugin-peer-deps-external'
import { terser } from 'rollup-plugin-terser'



import pkg from './package.json'

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs'
    },
    {
      name: 'ReactMEditor',
      file: pkg.unpkg,
      format: 'umd',
      globals: {
        'react': 'React',
        'prop-types': 'PropTypes'
      },
      plugins: [
        terser()
      ]
    },
    {
      file: pkg.module,
      format: 'es'
    }
  ],
  plugins: [
    external(),
    postcss({
      extract: true,
      plugins: [cssnano()]
    }),
    resolve(),
    typescript({
      rollupCommonJSResolveHack: true,
      clean: true
    }),
    commonjs()
  ]
}
