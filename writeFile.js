import { buildList } from './index.js'
import fs from 'node:fs'

const list = buildList()
fs.writeFileSync('./selectors.js', list.join('\n'))
