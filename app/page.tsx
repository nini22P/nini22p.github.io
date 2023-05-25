import React from 'react'
import Link from 'next/link'
import Date from './date/page'
import utilStyles from './utils.module.css'
import { getAllPostsData } from './posts/posts'
import { Metadata } from 'next'

const siteTitle = 'Blog'

export const metadata: Metadata = {
  title: siteTitle,
};

const Home = async () => {
  type AllPostsData = {
    date: string
    title: string
    id: string
  }[]

  const allPostsData: AllPostsData = await getAllPostsData()

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} >
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPostsData.map(({ id, date, title }) => (
          <li className={utilStyles.listItem} key={id}>
            <Link href={`/posts/${id}`}>{title}</Link>
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