import React from 'react'
import { Metadata } from 'next'
import './globals.css'
import styles from './layout.module.css'
import 'material-icons/iconfont/material-icons.css'
import siteConfig from '../site.config'
import Navigation from '../components/Navigation/Navigation'
// import Status from '../components/Status/Status'
// import Dock from '../components/Dock/Dock'

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.description,
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <html>
      <body>
        <div className='w-full min-h-screen pb-20 px-4 pt-4 xl:pt-8'>
          <div className='max-w-7xl m-auto'>
            {children}
          </div>
        </div>
        <div className={styles.background}></div>
        <div className='fixed bottom-0 inset-x-0 max-w-7xl mx-auto'>
          <Navigation />
          {/* <Dock /> */}
          {/* <Status /> */}
        </div>

      </body>
    </html>
  )
}

export default RootLayout