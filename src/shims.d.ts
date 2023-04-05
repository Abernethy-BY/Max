declare interface Window {
  // extend the window
}

// with vite-plugin-vue-markdown, markdown files can be treated as Vue components
declare module '*.md' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.vue' {
  import { type DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@intlify/unplugin-vue-i18n/vite' {
  const content: any
  export default content
}

declare module 'unplugin-vue-macros/vite' {
  const content: any
  export default content
}

declare module 'unplugin-vue-macros/macros-global' {
  const content: any
  export default content
}
