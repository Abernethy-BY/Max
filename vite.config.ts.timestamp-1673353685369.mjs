// vite.config.ts
import path from "path";
import Vue from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+@vitejs+plugin-vue@4.0.0_vite@4.0.0+vue@3.2.45/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { defineConfig } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite@4.0.0_q6swpjbreachjowkqq6ci4femq/node_modules/vite/dist/node/index.js";
import Pages from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pages@0.27.1_vite@4.0.0/node_modules/vite-plugin-pages/dist/index.mjs";
import generateSitemap from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite-ssg-sitemap@0.4.3/node_modules/vite-ssg-sitemap/dist/index.js";
import VueI18n from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+@intlify+vite-plugin-vue-i18n@7.0.0_vite@4.0.0+vue-i18n@9.2.2/node_modules/@intlify/vite-plugin-vue-i18n/lib/index.mjs";
import AutoImport from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+unplugin-auto-import@0.12.1_rollup@3.7.3/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.22.12_rollup@3.7.3+vue@3.2.45/node_modules/unplugin-vue-components/dist/vite.mjs";
import Inspect from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-inspect@0.7.10_rollup@3.7.3+vite@4.0.0/node_modules/vite-plugin-inspect/dist/index.mjs";
import { VitePWA } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-pwa@0.14.0_vite@4.0.0/node_modules/vite-plugin-pwa/dist/index.mjs";
import Layouts from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-vue-layouts@0.7.0_h746x2iafd67rpfmrsda4xydfq/node_modules/vite-plugin-vue-layouts/dist/index.mjs";
import UnoCss from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+unocss@0.47.6_rollup@3.7.3+vite@4.0.0/node_modules/unocss/dist/vite.mjs";
import IconsResolver from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.14.15/node_modules/unplugin-icons/dist/resolver.mjs";
import Icons from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+unplugin-icons@0.14.15/node_modules/unplugin-icons/dist/vite.mjs";
import { ElementPlusResolver } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+unplugin-vue-components@0.22.12_rollup@3.7.3+vue@3.2.45/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import pxToRem from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+postcss-pxtorem@6.0.0_postcss@8.4.20/node_modules/postcss-pxtorem/index.js";
import autoPreFixer from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+autoprefixer@10.4.13_postcss@8.4.20/node_modules/autoprefixer/lib/autoprefixer.js";
import { Plugin as importToCDN } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-cdn-import@0.3.5_rollup@3.7.3/node_modules/vite-plugin-cdn-import/dist/index.js";
import { ElementPlusResolve, createStyleImportPlugin } from "file:///D:/WorkSpace/Private-Abernethy/big-screen/node_modules/.pnpm/registry.npmmirror.com+vite-plugin-style-import@2.0.0_vite@4.0.0/node_modules/vite-plugin-style-import/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\WorkSpace\\Private-Abernethy\\big-screen";
var loader_pxToRem = pxToRem({ rootValue: 37.5, unitPrecision: 2, propList: ["*"], exclude: /(node_module)/, selectorBlackList: [], mediaQuery: true, minPixelValue: 1 });
var loader_autoPreFixer = autoPreFixer({ overrideBrowserslist: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 8", "last 10 versions"], grid: true });
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__vite_injected_original_dirname, "src")}/`
    }
  },
  server: {
    host: "localhost",
    cors: true,
    open: true,
    hmr: true
  },
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    Pages({ extensions: ["vue"], exclude: ["**/components/*.vue"] }),
    Layouts({
      layoutsDirs: "src/layouts",
      defaultLayout: "screen"
    }),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "vue-i18n",
        "vue/macros",
        "@vueuse/head",
        "@vueuse/core",
        { axios: [["default", "axios"]] },
        { consola: [["default", "consola"]] },
        { "axios-mapper": [["default", "HttpClient"]] },
        { pinia: [["default", "pinia"]] },
        { nprogress: [["default", "nprogress"]] },
        { "big.js": [["default", "Big"]] },
        { echarts: [["*", "eCharts"]] },
        { "d3-geo": [["*", "d3"]] },
        { "@amap/amap-jsapi-loader": [["default", "AMapLoader"]] },
        { "js-md5": [["default", "md5"]] },
        { animejs: [["default", "anime"]] }
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/store", "src/utils", "src/api", "src/model", "src/router", "src/components"],
      vueTemplate: true,
      resolvers: [IconsResolver({ prefix: "Icon" }), ElementPlusResolver()]
    }),
    createStyleImportPlugin({
      resolves: [ElementPlusResolve()],
      libs: [{
        libraryName: "element-plus",
        esModule: true,
        resolveStyle: (name) => {
          return `element-plus/theme-chalk/${name}.css`;
        }
      }]
    }),
    Components({
      extensions: ["vue", "md"],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: "src/components.d.ts",
      resolvers: [IconsResolver({}), ElementPlusResolver()]
    }),
    UnoCss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "safari-pinned-tab.svg"],
      manifest: {
        name: "Vitesse",
        short_name: "Vitesse",
        theme_color: "#ffffff",
        icons: [
          { src: "/pwa-192x192.png", dark: "192x192", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
          { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      }
    }),
    VueI18n({
      runtimeOnly: true,
      compositionOnly: true,
      include: [path.resolve(__vite_injected_original_dirname, "locales/**")]
    }),
    Icons({
      compiler: "vue3",
      autoInstall: true
    }),
    Inspect(),
    importToCDN({
      modules: [{
        name: "WxLogin",
        var: "WxLogin",
        path: "http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
      }]
    })
  ],
  ssgOptions: {
    script: "async",
    formatting: "minify",
    onFinished() {
      generateSitemap();
    }
  },
  test: {
    include: ["test/**/*.test.ts"],
    environment: "jsdom",
    deps: { inline: ["@vue", "@vueuse", "vue-demi"] }
  },
  css: {
    preprocessorOptions: {
      scss: { additionalData: "@import '~/assets/scss/mixin.scss';" }
    },
    postcss: {
      plugins: [loader_pxToRem, loader_autoPreFixer]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXb3JrU3BhY2VcXFxcUHJpdmF0ZS1BYmVybmV0aHlcXFxcYmlnLXNjcmVlblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV29ya1NwYWNlXFxcXFByaXZhdGUtQWJlcm5ldGh5XFxcXGJpZy1zY3JlZW5cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dvcmtTcGFjZS9Qcml2YXRlLUFiZXJuZXRoeS9iaWctc2NyZWVuL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcclxuaW1wb3J0IFZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCBQYWdlcyBmcm9tICd2aXRlLXBsdWdpbi1wYWdlcydcclxuaW1wb3J0IGdlbmVyYXRlU2l0ZW1hcCBmcm9tICd2aXRlLXNzZy1zaXRlbWFwJ1xyXG5pbXBvcnQgVnVlSTE4biBmcm9tICdAaW50bGlmeS92aXRlLXBsdWdpbi12dWUtaTE4bidcclxuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IEluc3BlY3QgZnJvbSAndml0ZS1wbHVnaW4taW5zcGVjdCdcclxuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcclxuaW1wb3J0IExheW91dHMgZnJvbSAndml0ZS1wbHVnaW4tdnVlLWxheW91dHMnXHJcbmltcG9ydCBVbm9Dc3MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCBJY29uc1Jlc29sdmVyIGZyb20gJ3VucGx1Z2luLWljb25zL3Jlc29sdmVyJ1xyXG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSdcclxuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcclxuaW1wb3J0IHB4VG9SZW0gZnJvbSAncG9zdGNzcy1weHRvcmVtJ1xyXG5pbXBvcnQgYXV0b1ByZUZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuaW1wb3J0IHsgUGx1Z2luIGFzIGltcG9ydFRvQ0ROIH0gZnJvbSAndml0ZS1wbHVnaW4tY2RuLWltcG9ydCdcclxuLy8gaW1wb3J0IGV4dGVybmFsR2xvYmFscyBmcm9tICdyb2xsdXAtcGx1Z2luLWV4dGVybmFsLWdsb2JhbHMnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZSwgY3JlYXRlU3R5bGVJbXBvcnRQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdHlsZS1pbXBvcnQnXHJcblxyXG5jb25zdCBsb2FkZXJfcHhUb1JlbSA9IHB4VG9SZW0oeyByb290VmFsdWU6IDM3LjUsIHVuaXRQcmVjaXNpb246IDIsIHByb3BMaXN0OiBbJyonXSwgZXhjbHVkZTogLyhub2RlX21vZHVsZSkvLCBzZWxlY3RvckJsYWNrTGlzdDogW10sIG1lZGlhUXVlcnk6IHRydWUsIG1pblBpeGVsVmFsdWU6IDEgfSlcclxuY29uc3QgbG9hZGVyX2F1dG9QcmVGaXhlciA9IGF1dG9QcmVGaXhlcih7IG92ZXJyaWRlQnJvd3NlcnNsaXN0OiBbJ0FuZHJvaWQgNC4xJywgJ2lPUyA3LjEnLCAnQ2hyb21lID4gMzEnLCAnZmYgPiAzMScsICdpZSA+PSA4JywgJ2xhc3QgMTAgdmVyc2lvbnMnXSwgZ3JpZDogdHJ1ZSB9KVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuICByZXNvbHZlOiB7XHJcbiAgICBhbGlhczoge1xyXG4gICAgICAnfi8nOiBgJHtwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyl9L2AsXHJcbiAgICB9LFxyXG4gIH0sXHJcblxyXG4gIHNlcnZlcjoge1xyXG4gICAgaG9zdDogJ2xvY2FsaG9zdCcsXHJcbiAgICBjb3JzOiB0cnVlLFxyXG4gICAgb3BlbjogdHJ1ZSxcclxuICAgIGhtcjogdHJ1ZSxcclxuICB9LFxyXG5cclxuICBwbHVnaW5zOiBbXHJcbiAgICBWdWUoe1xyXG4gICAgICBpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXHJcbiAgICAgIHJlYWN0aXZpdHlUcmFuc2Zvcm06IHRydWUsXHJcbiAgICB9KSxcclxuICAgIC8vIGV4dGVybmFsR2xvYmFscyh7IHd4TG9naW46ICd3eExvZ2luJyB9KSxcclxuICAgIFBhZ2VzKHsgZXh0ZW5zaW9uczogWyd2dWUnXSwgZXhjbHVkZTogWycqKi9jb21wb25lbnRzLyoudnVlJ10gfSksXHJcbiAgICBMYXlvdXRzKHtcclxuICAgICAgbGF5b3V0c0RpcnM6ICdzcmMvbGF5b3V0cycsXHJcbiAgICAgIGRlZmF1bHRMYXlvdXQ6ICdzY3JlZW4nLFxyXG4gICAgfSksXHJcblxyXG4gICAgQXV0b0ltcG9ydCh7XHJcbiAgICAgIGltcG9ydHM6IFsndnVlJywgJ3Z1ZS1yb3V0ZXInLCAndnVlLWkxOG4nLCAndnVlL21hY3JvcycsICdAdnVldXNlL2hlYWQnLCAnQHZ1ZXVzZS9jb3JlJyxcclxuICAgICAgICB7IGF4aW9zOiBbWydkZWZhdWx0JywgJ2F4aW9zJ11dIH0sXHJcbiAgICAgICAgeyBjb25zb2xhOiBbWydkZWZhdWx0JywgJ2NvbnNvbGEnXV0gfSxcclxuICAgICAgICB7ICdheGlvcy1tYXBwZXInOiBbWydkZWZhdWx0JywgJ0h0dHBDbGllbnQnXV0gfSxcclxuICAgICAgICB7IHBpbmlhOiBbWydkZWZhdWx0JywgJ3BpbmlhJ11dIH0sXHJcbiAgICAgICAgeyBucHJvZ3Jlc3M6IFtbJ2RlZmF1bHQnLCAnbnByb2dyZXNzJ11dIH0sXHJcbiAgICAgICAgeyAnYmlnLmpzJzogW1snZGVmYXVsdCcsICdCaWcnXV0gfSxcclxuICAgICAgICB7IGVjaGFydHM6IFtbJyonLCAnZUNoYXJ0cyddXSB9LFxyXG4gICAgICAgIHsgJ2QzLWdlbyc6IFtbJyonLCAnZDMnXV0gfSxcclxuICAgICAgICB7ICdAYW1hcC9hbWFwLWpzYXBpLWxvYWRlcic6IFtbJ2RlZmF1bHQnLCAnQU1hcExvYWRlciddXSB9LFxyXG4gICAgICAgIHsgJ2pzLW1kNSc6IFtbJ2RlZmF1bHQnLCAnbWQ1J11dIH0sXHJcbiAgICAgICAgeyBhbmltZWpzOiBbWydkZWZhdWx0JywgJ2FuaW1lJ11dIH0sXHJcbiAgICAgIF0sXHJcbiAgICAgIGR0czogJ3NyYy9hdXRvLWltcG9ydHMuZC50cycsXHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvc2FibGVzJywgJ3NyYy9zdG9yZScsICdzcmMvdXRpbHMnLCAnc3JjL2FwaScsICdzcmMvbW9kZWwnLCAnc3JjL3JvdXRlcicsICdzcmMvY29tcG9uZW50cyddLFxyXG4gICAgICB2dWVUZW1wbGF0ZTogdHJ1ZSxcclxuICAgICAgcmVzb2x2ZXJzOiBbSWNvbnNSZXNvbHZlcih7IHByZWZpeDogJ0ljb24nIH0pLCBFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgfSksXHJcbiAgICBjcmVhdGVTdHlsZUltcG9ydFBsdWdpbih7XHJcbiAgICAgIHJlc29sdmVzOiBbRWxlbWVudFBsdXNSZXNvbHZlKCldLFxyXG4gICAgICBsaWJzOiBbe1xyXG4gICAgICAgIGxpYnJhcnlOYW1lOiAnZWxlbWVudC1wbHVzJyxcclxuICAgICAgICBlc01vZHVsZTogdHJ1ZSxcclxuICAgICAgICByZXNvbHZlU3R5bGU6IChuYW1lOiBzdHJpbmcpID0+IHsgcmV0dXJuIGBlbGVtZW50LXBsdXMvdGhlbWUtY2hhbGsvJHtuYW1lfS5jc3NgIH0sXHJcbiAgICAgIH1dLFxyXG4gICAgfSksXHJcbiAgICBDb21wb25lbnRzKHtcclxuICAgICAgZXh0ZW5zaW9uczogWyd2dWUnLCAnbWQnXSxcclxuICAgICAgaW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSxcclxuICAgICAgZHRzOiAnc3JjL2NvbXBvbmVudHMuZC50cycsXHJcbiAgICAgIHJlc29sdmVyczogW0ljb25zUmVzb2x2ZXIoeyB9KSwgRWxlbWVudFBsdXNSZXNvbHZlcigpXSxcclxuICAgIH0pLFxyXG5cclxuICAgIFVub0NzcygpLFxyXG4gICAgVml0ZVBXQSh7XHJcbiAgICAgIHJlZ2lzdGVyVHlwZTogJ2F1dG9VcGRhdGUnLFxyXG4gICAgICBpbmNsdWRlQXNzZXRzOiBbJ2Zhdmljb24uc3ZnJywgJ3NhZmFyaS1waW5uZWQtdGFiLnN2ZyddLFxyXG4gICAgICBtYW5pZmVzdDoge1xyXG4gICAgICAgIG5hbWU6ICdWaXRlc3NlJyxcclxuICAgICAgICBzaG9ydF9uYW1lOiAnVml0ZXNzZScsXHJcbiAgICAgICAgdGhlbWVfY29sb3I6ICcjZmZmZmZmJyxcclxuICAgICAgICBpY29uczogW1xyXG4gICAgICAgICAgeyBzcmM6ICcvcHdhLTE5MngxOTIucG5nJywgZGFyazogJzE5MngxOTInLCB0eXBlOiAnaW1hZ2UvcG5nJyB9LFxyXG4gICAgICAgICAgeyBzcmM6ICcvcHdhLTUxMng1MTIucG5nJywgc2l6ZXM6ICc1MTJ4NTEyJywgdHlwZTogJ2ltYWdlL3BuZycgfSxcclxuICAgICAgICAgIHsgc3JjOiAnL3B3YS01MTJ4NTEyLnBuZycsIHNpemVzOiAnNTEyeDUxMicsIHR5cGU6ICdpbWFnZS9wbmcnLCBwdXJwb3NlOiAnYW55IG1hc2thYmxlJyB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuXHJcbiAgICBWdWVJMThuKHtcclxuICAgICAgcnVudGltZU9ubHk6IHRydWUsXHJcbiAgICAgIGNvbXBvc2l0aW9uT25seTogdHJ1ZSxcclxuICAgICAgaW5jbHVkZTogW3BhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdsb2NhbGVzLyoqJyldLFxyXG4gICAgfSksXHJcblxyXG4gICAgSWNvbnMoe1xyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgICBhdXRvSW5zdGFsbDogdHJ1ZSxcclxuICAgIH0pLFxyXG5cclxuICAgIEluc3BlY3QoKSxcclxuICAgIC8vIFd4TG9naW5cclxuICAgIGltcG9ydFRvQ0ROKHtcclxuICAgICAgbW9kdWxlczogW3tcclxuICAgICAgICBuYW1lOiAnV3hMb2dpbicsXHJcbiAgICAgICAgdmFyOiAnV3hMb2dpbicsXHJcbiAgICAgICAgcGF0aDogJ2h0dHA6Ly9yZXMud3gucXEuY29tL2Nvbm5lY3QvemhfQ04vaHRtbGVkaXRpb24vanMvd3hMb2dpbi5qcycsXHJcbiAgICAgIH1dLFxyXG4gICAgfSksXHJcbiAgXSxcclxuXHJcbiAgc3NnT3B0aW9uczoge1xyXG4gICAgc2NyaXB0OiAnYXN5bmMnLFxyXG4gICAgZm9ybWF0dGluZzogJ21pbmlmeScsXHJcbiAgICBvbkZpbmlzaGVkKCkgeyBnZW5lcmF0ZVNpdGVtYXAoKSB9LFxyXG4gIH0sXHJcblxyXG4gIHRlc3Q6IHtcclxuICAgIGluY2x1ZGU6IFsndGVzdC8qKi8qLnRlc3QudHMnXSxcclxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxyXG4gICAgZGVwczogeyBpbmxpbmU6IFsnQHZ1ZScsICdAdnVldXNlJywgJ3Z1ZS1kZW1pJ10gfSxcclxuICB9LFxyXG5cclxuICBjc3M6IHtcclxuICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgc2NzczogeyBhZGRpdGlvbmFsRGF0YTogJ0BpbXBvcnQgXFwnfi9hc3NldHMvc2Nzcy9taXhpbi5zY3NzXFwnOycgfSxcclxuICAgIH0sXHJcbiAgICBwb3N0Y3NzOiB7XHJcbiAgICAgIHBsdWdpbnM6IFtsb2FkZXJfcHhUb1JlbSwgbG9hZGVyX2F1dG9QcmVGaXhlcl0sXHJcbiAgICB9LFxyXG4gIH0sXHJcbn0pXHJc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
