#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const contentDir = path.resolve(__dirname, '../public/content')
const indexPath = path.join(contentDir, 'index.json')

function parseFrontMatterJSON(text) {
  // Matches ---\n{...}\n--- at the beginning
  const m = text.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return null
  try {
    const data = JSON.parse(m[1])
    const body = text.slice(m[0].length)
    return { data, body }
  } catch {
    return { data: null, body: text }
  }
}

function deriveTitleFromBody(body, fallback) {
  // Use first Markdown heading as title
  const lines = body.split(/\r?\n/)
  for (const line of lines) {
    const m = line.match(/^\s*#\s+(.+)/)
    if (m) return m[1].trim()
  }
  return fallback
}

function deriveSummaryFromBody(body) {
  const lines = body.split(/\r?\n/)
  for (const line of lines) {
    const t = line.trim()
    if (!t) continue
    if (t.startsWith('#')) continue
    // Trim code fences as summary isn't helpful
    if (t.startsWith('```')) continue
    return t.length > 140 ? t.slice(0, 137) + '...' : t
  }
  return ''
}

function toISODate(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

async function main() {
  const entries = await fs.readdir(contentDir, { withFileTypes: true })
  const posts = []

  for (const ent of entries) {
    if (!ent.isFile()) continue
    if (!ent.name.endsWith('.md')) continue
    if (ent.name === 'index.md') continue
    const full = path.join(contentDir, ent.name)
    const slug = ent.name.replace(/\.md$/, '')

    const text = await fs.readFile(full, 'utf8')

    const fm = parseFrontMatterJSON(text)
    const data = fm?.data || {}
    const body = fm?.body || text

    const title = typeof data.title === 'string' && data.title.trim()
      ? data.title.trim()
      : deriveTitleFromBody(body, slug)

    const summary = typeof data.summary === 'string' && data.summary.trim()
      ? data.summary.trim()
      : deriveSummaryFromBody(body)

    const date = typeof data.date === 'string' && data.date.trim()
      ? data.date.trim()
      : toISODate()

    const tags = Array.isArray(data.tags) ? data.tags.map(String) : []

    posts.push({ slug, title, summary, date, tags })
  }

  // Sort by date desc
  posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  const json = JSON.stringify(posts, null, 2)
  await fs.writeFile(indexPath, json + '\n', 'utf8')
  console.log(`Wrote ${posts.length} posts to ${path.relative(process.cwd(), indexPath)}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
