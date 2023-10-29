import React from 'react'
import Link from 'next/link'
import Date from '../components/Date'
import utilStyles from './utils.module.css'
import { getAllPostsData } from './posts/posts'
import { Metadata } from 'next'
import siteConfig from '../site.config'

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
}

const Home = async () => {
  const allPostsData = await getAllPostsData()

  return (
    <section>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ slug, date, title }) => (
          <li className={utilStyles.listItem} key={slug}>
            <Link href={`/posts/${slug}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  )
}
export default Home