import * as lightning from 'lightningcss'
import path from 'node:path'
import fs from 'node:fs'
import css from 'css'
import drnm from 'drnm'

const __dirname = drnm(import.meta.url)

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

  return Array.from(selectors)
}
