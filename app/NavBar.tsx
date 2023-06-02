import React from "react"
import Link from 'next/link'
import styles from './NavBar.module.scss'

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <Link href={"/"}>HOME</Link>
    </nav>
  )
}

export default NavBar