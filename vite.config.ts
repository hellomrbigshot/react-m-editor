import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import typescript from '@rollup/plugin-typescript'

const globals = {
  'react': 'React',
  'highlight.js': 'hljs',
  'marked': 'marked'
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config = {
    plugins: [react()],
  }
  if (mode === 'gh-pages') {
    return config
  } else {
    return {
      ...config,
      build: {
        lib: {
          // Could also be a dictionary or array of multiple entry points
          entry: resolve(__dirname, 'src/index.ts'),
          name: 'ReactMEditor',
          // the proper extensions will be added
          fileName: (format) => {
            return `react-m-editor.${format === 'es' ? 'mjs' : `${format}.js` }`
          }
        },
        rollupOptions: {
          // 确保外部化处理那些你不想打包进库的依赖
          external: ['react', 'marked', 'highlight.js'],
          plugins: [
            typescript({ declarationDir: './dist/typings' })
          ],
          output: {
            // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
            globals
          },
        },
      }
    }
  }
})
