import remark from 'remark'
import html from 'remark-html'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkMdx from 'remark-mdx'

export default async function markdownToHtml(markdown) {
  let result
  await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw) // *Parse* the raw HTML strings embedded in the tree
    .use(rehypeStringify)
    .process(markdown)
    .then((file) => {
      result = file
    })
    .catch((error) => {
      throw error
    })
  return String(result)
}
