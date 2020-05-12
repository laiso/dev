import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import * as fns from 'date-fns'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory).sort((a, b) => {
    const statA = fs.statSync(join(process.cwd(), '_posts', a))
    const statB = fs.statSync(join(process.cwd(), '_posts', b))
    return statB.mtime - statA.mtime
  } )
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach(field => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (field === 'date') {
      const stat = fs.statSync(fullPath)
      items[field] = fns.formatISO(stat.mtime)
    }

    if (data[field]) {
      items[field] = data[field]
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  return slugs.map(slug => getPostBySlug(slug, fields))
}
