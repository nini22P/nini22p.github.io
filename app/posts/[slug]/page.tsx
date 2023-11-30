import React from 'react'
import Date from '../../../components/Date'
import utilStyles from '../../utils.module.css'
import { getPostList, getPost } from '../posts'
import Link from 'next/link'

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }) => {
  const post = await getPost(slug)
  return {
    title: post.data.title,
  }
}

export const generateStaticParams = async () => {
  const postList = await getPostList()
  return postList.map(item => { return { slug: item.slug } })
}

const Post = async ({ params: { slug } }: { params: { slug: string } }) => {

  const post = await getPost(slug)

  return (
    <>
      <article className='prose prose-invert'>
        <h1>{post.data.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={post.data.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
      </article>
      <div className={utilStyles.backToHome}>
        <Link href="/">← Back to home</Link>
      </div>
    </>
  )
}

export default Post