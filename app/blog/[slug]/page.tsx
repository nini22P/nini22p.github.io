import React from 'react'
import Date from '../../../components/Date'
import { getPosts, getPost } from '../posts'
import Card from '../../../components/Card/Card'
import siteConfig from '../../../site.config'
import Disqus from './Disqus'

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
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
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