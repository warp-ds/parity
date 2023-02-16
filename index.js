import * as lightning from 'lightningcss'
import path from 'node:path'
import fs from 'node:fs'
import css from 'css'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)
const filterIgnoreList = [ 
  'flex-shrink-0', 'flex-shrink', 'flex-grow-0', 'flex-grow', 'shadow-2', 'shadow-3', 'shadow-4', 'shadow', 'shadow-none', 'decoration-slice', 'decoration-none', 'ring', 'filter', 'filter-none', 'blur-sm', 'blur', 'blur-md', 'blur-lg', 'blur-xl', 'blur-2xl', 'blur-3xl', 'brightness-0', 'brightness-50', 'brightness-75', 'brightness-90', 'brightness-95', 'brightness-100', 'brightness-105', 'brightness-110', 'brightness-125', 'brightness-150', 'brightness-200', 'contrast-0', 'contrast-50', 'contrast-75', 'contrast-100', 'contrast-125', 'contrast-150', 'contrast-200', 'drop-shadow-10', 'drop-shadow-20', 'drop-shadow-30', 'drop-shadow-40', 'drop-shadow-none', 'hue-rotate-0', 'hue-rotate-15', 'hue-rotate-30', 'hue-rotate-60', 'hue-rotate-90', 'hue-rotate-180', '-hue-rotate-180', '-hue-rotate-90', '-hue-rotate-60', '-hue-rotate-30', '-hue-rotate-15', 'invert-0', 'invert', 'saturate-0', 'saturate-50', 'saturate-100', 'saturate-150', 'saturate-200', 'sepia-0', 'sepia', 'backdrop-filter', 'backdrop-filter-none', 'backdrop-blur-sm', 'backdrop-blur', 'backdrop-blur-md', 'backdrop-blur-lg', 'backdrop-blur-xl', 'backdrop-blur-2xl', 'backdrop-blur-3xl', 'backdrop-brightness-0', 'backdrop-brightness-50', 'backdrop-brightness-75', 'backdrop-brightness-90', 'backdrop-brightness-95', 'backdrop-brightness-100', 'backdrop-brightness-105', 'backdrop-brightness-110', 'backdrop-brightness-125', 'backdrop-brightness-150', 'backdrop-brightness-200', 'backdrop-contrast-0', 'backdrop-contrast-50', 'backdrop-contrast-75', 'backdrop-contrast-100', 'backdrop-contrast-125', 'backdrop-contrast-150', 'backdrop-contrast-200', 'backdrop-hue-rotate-0', 'backdrop-hue-rotate-15', 'backdrop-hue-rotate-30', 'backdrop-hue-rotate-60', 'backdrop-hue-rotate-90', 'backdrop-hue-rotate-180', '-backdrop-hue-rotate-180', '-backdrop-hue-rotate-90', '-backdrop-hue-rotate-60', '-backdrop-hue-rotate-30', '-backdrop-hue-rotate-15', 'backdrop-invert-0', 'backdrop-invert', 'backdrop-opacity-0', 'backdrop-opacity-5', 'backdrop-opacity-10', 'backdrop-opacity-20', 'backdrop-opacity-25', 'backdrop-opacity-30', 'backdrop-opacity-40', 'backdrop-opacity-50', 'backdrop-opacity-60', 'backdrop-opacity-70', 'backdrop-opacity-75', 'backdrop-opacity-80', 'backdrop-opacity-90', 'backdrop-opacity-95', 'backdrop-opacity-100', 'backdrop-saturate-0', 'backdrop-saturate-50', 'backdrop-saturate-100', 'backdrop-saturate-150', 'backdrop-saturate-200', 'backdrop-sepia-0', 'backdrop-sepia' ]

export const buildList = () => {
  const fabric = fs.readFileSync(path.join(__dirname, './fabric.css'), 'utf-8')

  const { code } = lightning.transform({ code: Buffer.from(fabric), })
  const processed = code.toString()

  const parsed = css.parse(processed)
  // console.log(parsed.stylesheet.rules[50])
  const selectors = new Set()
  parsed.stylesheet.rules?.forEach(rule => {
    if (rule.selectors?.length > 1) return
    rule.selectors?.forEach(s => {
      if (s.includes('.button')) return
      if (s.includes('.input')) return
      if (s.includes('.f-')) return
      if (s.includes('space-')) return
      if (s.includes('divide-')) return
      if (s.includes('text-')) return
      if (s.includes('ring-')) return
      if (s.includes('outline-')) return
      if (s.includes('blue')) return
      if (s.includes('aqua')) return
      if (s.includes('green')) return
      if (s.includes('yellow')) return
      if (s.includes('red')) return
      if (s.includes('bluegray')) return
      if (s.includes('gray')) return
      if (s.includes('focus-ring')) return
      if (s.includes('bg-current')) return
      if (s.includes('bg-white')) return
      if (s.includes('bg-transparent')) return
      if (filterIgnoreList.includes(s.replace('.', ''))) return
      selectors.add(s)
    })
  })

  return Array.from(selectors)
}
