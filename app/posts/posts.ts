import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import remarkGfm from 'remark-gfm'
import { PostData } from '../types'

const postsDirectory = path.join(process.cwd(), 'posts')

export const getAllPostsData = async () => {

  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {

    const slug = fileName.replace(/\.md$/, '')

    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    return {
      slug,
      ...(matterResult.data as PostData)
    }
  })

  return allPostsData
    .filter(post => post.published)
    .sort((a, b) => (a.date < b.date) ? 1 : -1)
}

export const getPostData = async (slug: string) => {

  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  const matterResult = matter(fileContents)

  const processedContent = await remark()
    .use(remarkHtml)
    .use(remarkGfm)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { date: string; title: string })
  }
}