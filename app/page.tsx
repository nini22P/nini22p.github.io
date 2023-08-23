import React from 'react'
import Link from 'next/link'
import Date from './components/Date'
import utilStyles from './utils.module.css'
import { getAllPostsData } from './posts/posts'
import { Metadata } from 'next'
import siteConfig from '../site.config'
import { AllPostsData } from './type'

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
};

const Home = async () => {
  const allPostsData: AllPostsData = await getAllPostsData()

  return (
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`} >
      <h1 className={utilStyles.headingLg}>{siteConfig.siteTitle}</h1>
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