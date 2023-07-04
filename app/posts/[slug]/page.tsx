import React from 'react'
import Date from '../../component/Date'
import utilStyles from '../../utils.module.css'
import { getAllPostsData, getPostData } from '../posts'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'title',
}

export async function generateStaticParams() {
  const allPostData = await getAllPostsData()
  return allPostData.map(item => { return { slug: item.id } })
}

const Post = async ({ params }: { params: { slug: string } }) => {
  type PostData = {
    title: string,
    date: string,
    contentHtml: string
  }

  const postData: PostData = await getPostData(params.slug)

  return (
    <>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
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