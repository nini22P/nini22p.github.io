import React from 'react'
import Date from '../../../components/Date'
import { getPosts, getPost } from '../posts'
import Card from '../../../components/Card/Card'
import siteConfig from '../../../site.config'
import Disqus from './Disqus'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import remarkGfm from 'remark-gfm'
import remarkEmoji from 'remark-emoji'
import remarkFlexibleContainers, { type FlexibleContainerOptions } from 'remark-flexible-containers'
import remarkFlexibleCodeTitles from 'remark-flexible-code-titles'
import rehypePrism from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeRaw from 'rehype-raw'
import 'prismjs/themes/prism-tomorrow.css'
import Pre from '../../../components/Mdx/Pre'

export const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const post = await getPost(slug)
  return {
    title: `${post.data.title} | 博客 | ${siteConfig.siteTitle}`,
  }
}

export const generateStaticParams = async () => {
  const posts = await getPosts()
  return posts.map(item => { return { slug: item.slug } })
}

const Post = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params
  const post = await getPost(slug)

  return (
    <Card className='max-w-4xl m-auto overflow-x-hidden p-4 pt-8 rounded-lg'>
      <article className='prose prose-slate max-w-4xl mb-8'>
        <h1>{post.data.title}</h1>
        <div>
          <Date dateString={post.data.date} />
          {post.data.tags && (
            <div className="flex gap-2">
              {post.data.tags.map(tag => (
                <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded text-sm mt-1">#{tag}</span>
              ))}
            </div>
          )}
        </div>
        <MDXRemote
          source={post.content}
          components={{
            pre: Pre as any
          }}
          options={{
            mdxOptions: {
              remarkPlugins: [
                remarkGfm,
                remarkEmoji,
                [
                  remarkFlexibleContainers,
                  {
                    containerTagName: 'div',
                    containerProperties: (type: string, title: any) => {
                      return {
                        className: `alert alert-${type?.toLowerCase()}`,
                        'data-title': title ?? type?.toUpperCase(),
                      }
                    },
                  } as unknown as FlexibleContainerOptions
                ],
                remarkFlexibleCodeTitles
              ],
              rehypePlugins: [
                rehypeRaw,
                [rehypePrism, { ignoreMissing: true, showLineNumbers: true }],
                rehypeSlug,
                rehypeAutolinkHeadings
              ]
            }
          }}
        />
      </article>
      <Disqus
        shortname='nini22p'
        url={`${siteConfig.url}/blog/${post.slug}`}
        identifier={post.slug}
        title={post.data.title}
      />
    </Card>
  )
}

export default Post