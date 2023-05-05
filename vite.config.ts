import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

const root = process.cwd()
function pathResolve(dir: string) {
  return resolve(root, '.', dir)
}

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    extensions: [
      '.mjs',
      '.js',
      '.ts',
      '.jsx',
      '.tsx',
      '.json',
      '.less',
      '.css'
    ],
    alias: [
      {
        find: /@\//,
        replacement: `${pathResolve('src')}/`
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js'
      }
    ]
  },
  build: {
    //浏览器兼容性  "esnext"|"modules"
    target: 'modules',
    //指定输出路径
    outDir: 'dist',
    //生成静态资源的存放路径
    assetsDir: 'assets',
    //小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
    assetsInlineLimit: 4096,
    //启用/禁用 CSS 代码拆分
    cssCodeSplit: true,
    //构建后是否生成 source map 文件
    sourcemap: false,
    //自定义底层的 Rollup 打包配置
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html')
      },
      output: {
        compact: true,
        entryFileNames: 'static/js/[name]-[hash].js',
        chunkFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name].[ext]'
      }
    },
    //@rollup/plugin-commonjs 插件的选项
    commonjsOptions: {},
    //当设置为 true，构建后将会生成 manifest.json 文件
    manifest: false,
    // 设置为 false 可以禁用最小化混淆，
    // 或是用来指定使用哪种混淆器
    // boolean | 'terser' | 'esbuild'
    minify: 'terser', //terser 构建后文件体积更小
    //传递给 Terser 的更多 minify 选项。
    terserOptions: {},
    //设置为 false 来禁用将构建后的文件写入磁盘
    write: true,
    //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
    emptyOutDir: true,
    //chunk 大小警告的限制
    chunkSizeWarningLimit: 500
  }
})
