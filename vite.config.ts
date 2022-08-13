import path from 'path'
import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'
import generateSitemap from 'vite-ssg-sitemap'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Inspect from 'vite-plugin-inspect'
import { VitePWA } from 'vite-plugin-pwa'
import Layouts from 'vite-plugin-vue-layouts'
import UnoCss from 'unocss/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import pxToRem from 'postcss-pxtorem'
import autoPreFixer from 'autoprefixer'

const loader_pxToRem = pxToRem({
  rootValue: 192,
  unitPrecision: 2,
  propList: ['*'],
  exclude: /(node_module)/,
  selectorBlackList: [],
  mediaQuery: false,
  minPixelValue: 1,
})
const loader_autoPreFixer = autoPreFixer({
  overrideBrowserslist: [
    'Android 4.1',
    'iOS 7.1',
    'Chrome > 31',
    'ff > 31',
    'ie >= 8',
    'last 10 versions',
  ],
  grid: true,
})

export default defineConfig({
  resolve: { alias: { '~/': `${path.resolve(__dirname, 'src')}/` } },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true,
    }),
    Pages({ extensions: ['vue', 'md'] }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'screen',
    }),

    AutoImport({
      imports: ['vue', 'vue-router', 'vue-i18n', 'vue/macros', '@vueuse/head', '@vueuse/core'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/store'],
      vueTemplate: true,
      resolvers: [IconsResolver({ prefix: 'Icon' }), ElementPlusResolver()],
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/components.d.ts',
      resolvers: [IconsResolver({ enabledCollections: ['ep'] }), ElementPlusResolver()],
    }),
    UnoCss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
      manifest: {
        name: 'Vitesse',
        short_name: 'Vitesse',
        theme_color: '#ffffff',
        icons: [
          { src: '/pwa-192x192.png', dark: '192x192', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),

    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__dirname, 'locales/**')],
    }),

    Icons({
      compiler: 'vue3',
      autoInstall: true,
    }),

    Inspect(),
  ],

  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    onFinished() { generateSitemap() },
  },

  test: {
    include: ['test/**/*.test.ts'],
    environment: 'jsdom',
    deps: { inline: ['@vue', '@vueuse', 'vue-demi'] },
  },

  css: {
    preprocessorOptions: {},
    postcss: {
      plugins: [loader_pxToRem, loader_autoPreFixer],
    },
  },
})
