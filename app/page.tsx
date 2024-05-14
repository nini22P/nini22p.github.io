'use client'

import React from 'react'
// import styles from './Home.module.css'
import Card from '../components/Card/Card'
import home from '../data/home'
import useOpen from '../hooks/useOpen'

const Home = () => {

  const { open } = useOpen()
  const isSquare = (col: number, row: number) => (col / row) === 1

  const COL_SPANS = (col: number) => `col-span-${col}`
  const ROW_SPANS = (row: number) => `row-span-${row}`

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 auto-rows-fr grid-flow-dense gap-4'>
      {
        home.map(item =>
          <Card
            className={`${COL_SPANS(item.size.col)} ${ROW_SPANS(item.size.row)} ${isSquare(item.size.col, item.size.row) ? 'aspect-square' : ''} rounded-lg p-4`}
            title={item.title}
            key={item.title}
            onClick={() => open({ path: item.path, url: item.url })}>
            {item.title}
          </Card>
        )
      }
    </div>
  )
}
export default Home