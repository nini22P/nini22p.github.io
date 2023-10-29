import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'
import utilStyles from './utils.module.css'
import siteConfig from '../site.config'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <h1 className={utilStyles.headingMd}>{siteConfig.siteTitle}</h1>
      <Link href={'/'}>HOME</Link>
    </nav>
  )
}

export default NavBar