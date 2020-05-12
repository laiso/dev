import remark from 'remark'
import html from 'remark-html'
const highlight = require('remark-highlight.js')

export default async function markdownToHtml(markdown) {
  const result = await remark()
    .use(html)
    .use(highlight)
    .process(markdown)
  return result.toString()
}
