import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostData } from '../types'

const postsDirectory = path.join(process.cwd(), '/posts')

export const getPosts = async (): Promise<Post[]> => {
  const fileNames = fs.readdirSync(postsDirectory, { withFileTypes: true })

  const posts: Post[] = await Promise.all(
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
          content: matterResult.content,
        }
      })
  )

  return posts.filter((post) => post.data.draft !== true)
    .sort((a, b) => (a.data.date < b.data.date) ? 1 : -1)
}

export const getPost = async (slug: string): Promise<Post> => {
  const fullPath = path.join(postsDirectory, `${slug}/readme.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  return {
    slug,
    data: matterResult.data as PostData,
    content: matterResult.content,
  }
}
