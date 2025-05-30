import React from 'react'
import Date from '../../../components/Date'
import { getPostList, getPost } from '../posts'
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
  const postList = await getPostList()
  return postList.map(item => { return { slug: item.slug } })
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