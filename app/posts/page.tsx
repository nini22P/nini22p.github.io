import React from 'react'
import Link from 'next/link'
import Date from '../../components/Date'
import { getPostList } from './posts'
import Card from '../../ui/Card/Card'
import siteConfig from '../../site.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `博客 | ${siteConfig.siteTitle}`,
}

const Posts = async () => {

  const postList = await getPostList()

  return (
    <Card className='max-w-4xl m-auto p-4 rounded-lg'>
      <ul className='divide-y'>
        {postList.map(({ slug, data }) => (
          <li key={slug} className='py-4'>
            <Link href={`/posts/${slug}`}>{data.title}</Link>
            <br />
            <small>
              <Date dateString={data.date} />
            </small>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default Posts