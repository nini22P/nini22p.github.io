import React from 'react'
import { parseISO, format } from 'date-fns'

const Date = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString)
  return <time className='text-gray-500' dateTime={dateString}>{format(date, 'yyyy-MM-dd')}</time>
}

export default Date