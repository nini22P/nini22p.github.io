import React from 'react'
import styles from './Status.module.css'
import Card from '../../ui/Card/Card'

const StatusBar = () => {
  return (
    <Card className={styles.statusBar}>
      状态栏
    </Card>
  )
}

export default StatusBar