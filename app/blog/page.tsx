import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Date from '../../components/Date'
import { getPosts } from './posts'
import Card from '../../components/Card/Card'
import siteConfig from '../../site.config'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `博客 | ${siteConfig.siteTitle}`,
}

const Posts = async () => {
  const posts = await getPosts()

  return (
    <Card className='max-w-4xl m-auto p-2 rounded-lg'>
      <h1 className="text-2xl font-bold ml-2 mt-2 mb-4 text-gray-800">所有文章</h1>
      <ul className='divide-y divide-gray-200'>
        {posts.map(({ slug, data }) => (
          <li key={slug} className='group' title={data.title}>
            <Link
              href={`/blog/${slug}`}
              className='flex flex-col md:flex-row gap-4 py-4 group-hover:bg-[#f7f7f7aa] transition-colors duration-200 rounded-lg px-2 no-underline'
            >
              <div className="flex flex-col justify-between">
                <div>
                  <h2 className='text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors'>
                    {data.title}
                  </h2>
                </div>
                <div className="mt-4 flex items-center gap-3 text-gray-400 text-xs">
                  <Date dateString={data.date} />
                  {data.tags && (
                    <div className="flex gap-2">
                      {data.tags.map(tag => (
                        <span key={tag} className="bg-gray-100 px-2 py-0.5 rounded">#{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default Posts