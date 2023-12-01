'use client'

import React from 'react'
import styles from './Navigation.module.css'
import { usePathname, useRouter } from 'next/navigation'
import { MdApps, MdHome, MdArrowBackIosNew } from 'react-icons/md'
import Button from '../../ui/Button/Button'
import Card from '../../ui/Card/Card'


const Navigation = () => {
  const router = useRouter()
  const pathname = usePathname()

  const isHome = pathname === '/'
  const isApps = pathname === '/apps/'
  const isApp = pathname.split('/').filter(path => path !== '').length === 1
  const getBackPath = (pathname: string) => `/${pathname.split('/').filter(path => path !== '').slice(0, -1).join('/')}`

  return (
    <Card className={styles.navigation}>
      {
        !isHome && !isApps && !isApp &&
        <Button title='返回' onClick={() => router.push(getBackPath(pathname))}>
          <MdArrowBackIosNew />
        </Button>
      }
      {
        !isHome &&
        <Button title='主页' onClick={() => router.push('/')}>
          <MdHome />
        </Button>
      }
      {
        !isApps &&
        <Button title='应用' onClick={() => router.push('/apps')}>
          <MdApps />
        </Button>
      }
    </Card>
  )
}

export default Navigation