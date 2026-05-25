/**
 * Quick smoke check — run while dev server is up: node scripts/smoke-check.mjs
 */
const BASE = process.env.BASE_URL || 'http://localhost:5173'

const res = await fetch(BASE)
if (!res.ok) throw new Error(`HTTP ${res.status} from ${BASE}`)

const html = await res.text()
const checks = [
  ['HTML loads', html.includes('id="root"')],
  ['Title', html.includes('Verdan')],
  ['Vite client', html.includes('/src/main.jsx') || html.includes('/assets/')],
]

let failed = 0
for (const [name, ok] of checks) {
  console.log(ok ? `✓ ${name}` : `✗ ${name}`)
  if (!ok) failed++
}

if (failed) process.exit(1)
console.log(`\nSmoke check passed — open ${BASE} in your browser`)
