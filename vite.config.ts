import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'

console.log(__dirname)

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve('src/index.ts'),
      name: 'VueMynauiIcons',
      // fileName: (format) => `index.${format}.js`
      fileName: 'vue-mynaui-icons'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  // resolve: {
  //   alias: {
  //     '@mynaui/icons': require.resolve('@mynaui/icons')
  //   }
  // },
  // css: {
  //   preprocessorOptions: {
  //     scss: {
  //       additionalData: `@use "@mynaui/icons/mynaui";`
  //     }
  //   }
  // },
})