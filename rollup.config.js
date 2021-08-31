import typescript from 'rollup-plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import resolve from '@rollup/plugin-node-resolve'
import url from '@rollup/plugin-url'
import svgr from '@svgr/rollup'
// import alias from '@rollup/plugin-alias'
import dts from 'rollup-plugin-dts'



import pkg from './package.json'

export default [
  {
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      postcss(),
      url(),
      svgr(),
      resolve(),
      // alias({
      //   entries: [
      //     {
      //       find: 'react',
      //       replacement: 'node_modules/react'
      //     }
      //   ]
      // }),
      typescript(),
      commonjs()
    ],
    external: ['react', 'react-dom']
  },
  {
    input: "src/index.d.ts",
    output: [
      { file: pkg.types, format: "es" }
    ],
    plugins: [dts()],
  }
]
