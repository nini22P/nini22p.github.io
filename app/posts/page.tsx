import React from 'react'
import Link from 'next/link'
import Date from '../../components/Date'
import { getPostList } from './posts'
import Card from '../../ui/Card/Card'

const Posts = async () => {

  const postList = await getPostList()

  return (
    <Card className='max-w-2xl m-auto p-4 rounded-lg'>
      <ul>
        {postList.map(({ slug, data }) => (
          <li key={slug}>
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