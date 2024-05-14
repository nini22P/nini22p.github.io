import React from 'react'
import styles from './Status.module.css'
import Card from '../Card/Card'
import Clock from './Clock'
// import Button from '../Button/Button'
// import { MdSettings } from 'react-icons/md'

const StatusBar = () => {
  return (
    <Card className={styles.statusBar}>
      {/* <Button title='设置'><MdSettings /></Button> */}
      <Clock />
    </Card>
  )
}

export default StatusBar