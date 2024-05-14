'use client'

import React, { useEffect, useState } from 'react'
import Button from '../Button/Button'

type Time = {year: string, month: string, day: string, hours: string, mintes: string, seconds: string }

const Clock = () => {

  const getTime = (): Time => {
    const now = new Date()
    const year = now.getFullYear().toString().padStart(4, '0')
    const month = now.getMonth().toString().padStart(2, '0')
    const day = now.getDay().toString().padStart(2, '0')
    const hours = now.getHours().toString().padStart(2, '0')
    const mintes = now.getMinutes().toString().padStart(2, '0')
    const seconds = now.getSeconds().toString().padStart(2, '0')
    return {year, month, day, hours, mintes, seconds }
  }

  const [time, setTime] = useState<Time>(getTime())

  useEffect(
    () => {
      const interval = setInterval(() => {
        setTime(getTime())
      }, 1000)
      return () => clearInterval(interval)
    },
    []
  )

  return (
    <Button
      className='font-light h-6'
      title={time.year + '年' + time.month + '月' + time.day + '日 ' + time.hours + ':' + time.mintes}
      onClick={() => void 0}>
      {time.hours}:{time.mintes}
    </Button>
  )
}

export default Clock