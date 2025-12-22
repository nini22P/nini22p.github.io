import React from 'react'
import Card from '../../components/Card/Card'
import Image from 'next/image'
import Link from 'next/link'
import { RiGithubLine } from 'react-icons/ri'
import { Metadata } from 'next'
import siteConfig from '../../site.config'

export const metadata: Metadata = {
  title: `赞助 | ${siteConfig.siteTitle}`,
}

const Sponsor = () => {
  return (
    <Card className='max-w-4xl m-auto p-4 rounded-lg'>
      <Link href='https://github.com/nini22P' target='_blank' className='absolute right-4 top-4'>
        <RiGithubLine className='w-6 h-6' />
      </Link>
      <h1 className='text-2xl p-1 text-center font-bold'>赞助</h1>
      <p className='text-sm font-light text-gray-500 text-center'>支持我的开源项目</p>
      <div className='w-[400px] m-auto text-center grid grid-cols-2 p-4 gap-4 items-center max-md:w-full'>
        <Link href='https://afdian.net/a/nini22P' target='_blank' className='aspect-square rounded-lg p-4 hover:bg-gray-200'>
          <Image src="/images/afdian-logo.png" alt="afdian" width={400} height={400} />
          <span>爱发电</span>
        </Link>
      </div>
    </Card>
  )
}

export default Sponsor