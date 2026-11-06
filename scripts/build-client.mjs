import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const parts = [
  'src/client-head.js',
  'src/client-utils.js',
  'src/client-components-a.js',
  'src/client-components-b.js',
  'src/client-tail.js',
]

let output = ''
for (const part of parts) {
  output += await readFile(join(root, part), 'utf8')
  output += '\n'
}

await writeFile(join(root, 'client.js'), output, 'utf8')
console.log(`client.js written (${output.length} chars)`)
