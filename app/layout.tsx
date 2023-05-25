import React from 'react'
import { Metadata } from 'next'
import './globals.css'
import styles from './layout.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <div className={styles.container}>
          {children}
        </div>
      </body>
    </html>
  );
}

export default RootLayout