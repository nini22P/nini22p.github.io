import React from 'react'
import Date from '../../../components/Date'
import utilStyles from '../../utils.module.css'
import { getAllPostsData, getPostData } from '../posts'
import Link from 'next/link'

export const generateMetadata = async ({ params: { slug } }: { params: { slug: string } }) => {
  const postData = await getPostData(slug)
  return {
    title: postData.title,
  }
}

export const generateStaticParams = async () => {
  const allPostData = await getAllPostsData()
  return allPostData.map(item => { return { slug: item.slug } })
}

const Post = async ({ params: { slug } }: { params: { slug: string } }) => {

  const postData = await getPostData(slug)

  return (
    <>
      <article>
        <h1>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <div className={utilStyles.backToHome}>
        <Link href="/">← Back to home</Link>
      </div>
    </>
  )
}

export default Post