import React from 'react'
import Link from 'next/link'
import Date from '../components/Date'
import utilStyles from './utils.module.css'
import { getPostList } from './posts/posts'
import { Metadata } from 'next'
import siteConfig from '../site.config'

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
}

const Home = async () => {
  const postList = await getPostList()

  return (
    <>
      <ul className={utilStyles.list}>
        {postList.map(({ slug, data }) => (
          <li className={utilStyles.listItem} key={slug}>
            <Link href={`/posts/${slug}`}>{data.title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={data.date} />
            </small>
          </li>
        ))}
      </ul>
    </>
  )
}
export default Home