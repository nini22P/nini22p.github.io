import React from 'react'
import Link from 'next/link'
import styles from './NavBar.module.css'
import siteConfig from '../site.config'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link href={'/'}>{siteConfig.siteTitle}</Link>
    </nav>
  )
}

export default NavBar