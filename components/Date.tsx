import React from 'react'
import { parseISO, format } from 'date-fns'
import zhCN from 'date-fns/locale/zh-CN'

const Date = ({ dateString }: { dateString: string }) => {
  const date = parseISO(dateString)
  return <time dateTime={dateString}>{format(date, 'yyyy-MM-dd', { locale: zhCN })}</time>
}

export default Date