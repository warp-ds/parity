import * as lightning from 'lightningcss'
import fs from 'node:fs'
import css from 'css'

const fabric = fs.readFileSync('./fabric.css', 'utf-8')

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
    if (s.includes('blue')) return
    if (s.includes('aqua')) return
    if (s.includes('green')) return
    if (s.includes('yellow')) return
    if (s.includes('red')) return
    if (s.includes('bluegray')) return
    if (s.includes('gray')) return
    selectors.add(s)
  })
})

fs.writeFileSync('./selectors.js', Array.from(selectors).join('\n'))
