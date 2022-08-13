/*
 * @Author: By
 * @Date: 2022-08-13 10:45:51
 * @LastEditTime: 2022-08-13 17:15:37
 * @LastEditors: By
 * @Description: ,
 * @FilePath: \big-screen-vue3\unocss.config.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  rules: [
    [/^z-(\d+)$/, ([, d]) => ({ 'z-index': d })],
    ['layouts', { width: '100vw', height: '100vh' }],
    ['box-until', { width: '100%', height: '100%' }],
    ['box-center', { 'display': 'flex', 'justify-content': 'center', 'align-items': 'center', 'position': 'relative' }],
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})

