import React from 'react'
import siteConfig from '../../site.config'
import { Metadata } from 'next'
import AppsGrid from './AppsGrid'

export const metadata: Metadata = {
  title: `应用 | ${siteConfig.siteTitle}`,
}

const Apps = () => {

  return (
    <>
      <AppsGrid />
    </>
  )
}

export default Apps