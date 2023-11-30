import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypePrism from 'rehype-prism'
import rehypeStringify from 'rehype-stringify'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'
import 'prismjs/components/prism-kotlin'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-yaml'
import { PostData } from '../types'

const postsDirectory = path.join(process.cwd(), '/posts')

export const getPostList = async () => {
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true })

  const postList = await Promise.all(
    fileNames
      .filter((file) => file.isDirectory())
      .map(async (file) => {
        const slug = file.name

        const fullPath = path.join(postsDirectory, `${file.name}/readme.md`)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const matterResult = matter(fileContents)

        return {
          slug,
          data: matterResult.data as PostData,
        }
      })
  )

  return postList
    .sort((a, b) => (a.data.date < b.data.date) ? 1 : -1)
}

export const getPost = async (slug: string) => {
  const fullPath = path.join(postsDirectory, `${slug}/readme.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypePrism)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings)
    .use(rehypeStringify)
    .process(matterResult.content)

  const contentHtml = processedContent.toString()

  return {
    slug,
    data: matterResult.data as PostData,
    contentHtml,
  }
}