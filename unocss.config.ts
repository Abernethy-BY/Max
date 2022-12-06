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
    ['-I', { '': '!important' }],
    [/^z-(\d+)$/, ([, d]) => ({ 'z-index': `${d}` })],
    [/^wPE-(\d+)$/, ([, d]) => ({ width: `${d}%` })],
    [/^hPE-(\d+)$/, ([, d]) => ({ height: `${d}%` })],
    [/^h-calc-(\w+)-(\w+)$/, ([, a, b]) => {
      const numReg = /^((?![A-Za-z]).)*$/
      const heightArr = [a, b].map(e => numReg.test(e) ? `${e}%` : e)
      return { height: `calc(${heightArr[0]} - ${heightArr[1]})` }
    }],
    [/^h-(.+)$/, ([, a]) => {
      const numReg = /^((?![A-Za-z]).)*$/
      const h = numReg.test(a) ? `${a}%` : a
      return { height: h }
    }],
    [/^w-(.+)$/, ([, a]) => {
      const numReg = /^((?![A-Za-z]).)*$/
      const w = numReg.test(a) ? `${a}%` : a
      return { width: w }
    }],

    ['layouts', { width: '100vw', height: '100vh' }],
    ['box-until', { width: '100%', height: '100%' }],
    ['box-center', { 'display': 'flex', 'flex-direction': 'column', 'flex': '1', 'position': 'relative' }],

    ['flex', { display: 'flex' }],
    ['flex-row-between', { 'display': 'flex', 'justify-content': 'space-between' }],
    ['flex-row-center', { 'display': 'flex', 'justify-content': 'center' }],
    ['flex-row-end', { 'display': 'flex', 'justify-content': 'flex-end' }],
    ['flex-column-start', { 'display': 'flex', 'flex-direction': 'column' }],
    ['flex-column-between', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'space-between' }],
    ['flex-column-around', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'space-around' }],
    ['flex-column-center', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'center' }],
    ['flex-column-end', { 'display': 'flex', 'flex-direction': 'column', 'justify-content': 'flex-end' }],
    ['cross-axis-stretch', { 'align-items': 'stretch' }],
    ['cross-axis-center', { 'align-items': 'center' }],
    ['cross-axis-end', { 'align-items': 'flex-end' }],
    ['elastic-longitudinal-axis-start', { 'align-content': 'flex-start' }],
    ['elastic-longitudinal-axis-end', { 'align-content': 'flex-end' }],
    ['elastic-longitudinal-axis-center', { 'align-content': 'center' }],
    ['elastic-longitudinal-axis-between', { 'align-content': 'space-between;' }],
    ['elastic-longitudinal-axis-around', { 'align-content': 'space-around;' }],
    [/^fx-(\d+)$/, ([, d]) => ({ 'flex-shrink': `${d}` })],
    ['fw', { 'flex-wrap': 'wrap' }],
    [/^flex-(\d+)$/, ([, d]) => ({ flex: `${d}` })],
    [/^flex-grow-(\d+)$/, ([, d]) => ({ 'flex-grow': `${d}` })],
    [/^flex-shrink-(\d+)$/, ([, d]) => ({ 'flex-shrink': `${d}` })],
    [/^flex-basis-(\d+)$/, ([, d]) => ({ 'flex-basis': `${d}px` })],
    [/^flex-basis-PE-(\d+)$/, ([, d]) => ({ 'flex-basis': `${d}%` })],

    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}px` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}px` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}px` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}px` })],
    [/^plPE-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}%` })],
    [/^prPE-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}%` })],
    [/^ptPE-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}%` })],
    [/^pbPE-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}%` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}px` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}px` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}px` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}px` })],
    [/^mlPE-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}%` })],
    [/^mrPE-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}%` })],
    [/^mtPE-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}%` })],
    [/^mbPE-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}%` })],

    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
    [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}px` })],
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': `${d}` })],
    [/^fw-(\d+)$/, ([, d]) => ({ 'font-weight': `${d}` })],

    [/^position-(\w+)$/, ([, w]) => ({ position: `${w}` })],
    ['po-r', { position: 'relative' }],
    ['po-a', { position: 'absolute' }],
    ['po-f', { position: 'fixed' }],
    [/^pot-(\d+)$/, ([, d]) => ({ top: `${d}px` })],
    [/^pob-(\d+)$/, ([, d]) => ({ bottom: `${d}px` })],
    [/^pol-(\d+)$/, ([, d]) => ({ left: `${d}px` })],
    [/^por-(\d+)$/, ([, d]) => ({ right: `${d}px` })],
    [/^potPE-(\d+)$/, ([, d]) => ({ top: `${d}%` })],
    [/^pobPE-(\d+)$/, ([, d]) => ({ bottom: `${d}%` })],
    [/^polPE-(\d+)$/, ([, d]) => ({ left: `${d}%` })],
    [/^porPE-(\d+)$/, ([, d]) => ({ right: `${d}%` })],

    [/^po-(t|l|b|r+)-(\w+)$/, ([, a, b]) => {
      const numReg = /^((?![A-Za-z]).)*$/
      const directionMap = new Map().set('t', 'top').set('b', 'bottom').set('r', 'right').set('l', 'left')
      return numReg.test(b) ? { [directionMap.get(a)]: `${b}%` } : { [directionMap.get(a)]: b }
    }],
    [/^bw-(\d+)$/, ([, d]) => ({ 'border-width': `${d}px` })],
    [/^bs-(\w+)$/, ([, w]) => ({ 'border-style': `${w}` })],
    [/^br-(\d+)$/, ([, d]) => ({ ' border-radius': `${d}px` })],

    ['cursor-p', { cursor: 'pointer' }],

    [/^padding-(\w+)-(\w+)?-?(\w+)?-?(\w+)?$/, ([, t, r, b, l]) => {
      const effectiveArr = [t, r, b, l].filter(e => e)
      const numReg = /^((?![A-Za-z]).)*$/
      const paddingList = effectiveArr.map(e => numReg.test(e) ? `${e}%` : e)

      return effectiveArr.length === 0 ? { padding: '0px' } : { padding: paddingList.join(' ') }
    }],

  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose prose-sm m-auto text-left'.split(' '),
})

