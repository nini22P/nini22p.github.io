import React from 'react'
import { Metadata } from 'next'
import './globals.css'
import styles from './layout.module.css'
import NavBar from './NavBar'
import siteConfig from '../site.config'

export const metadata: Metadata = {
  title: siteConfig.siteTitle,
  description: siteConfig.description,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html>
      <body>
        <NavBar />
        <div className={styles.container}>
          {children}
        </div>
      </body>
    </html>
  );
}

export default RootLayout