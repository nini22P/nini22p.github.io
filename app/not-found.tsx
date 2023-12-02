import React from 'react'
import Card from '../components/Card/Card'

export default function NotFound() {
  return (
    <Card className='p-4 rounded-md align-middle'>
      <h2 className='text-2xl font-medium'>这里什么都没有</h2>
      <p className='text-gray-500'>或许你可以点下面主页按钮回到主界面</p>
    </Card>
  )
}
