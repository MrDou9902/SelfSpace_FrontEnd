import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const root = process.cwd()
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.less',
      '.css',
    ],
    alias: [
      {
        find: /\@\//,
        replacement: `${pathResolve('src')}/`,
      },
    ],
  },
})
