'use client'

import React from 'react'
import Card from '../../ui/Card/Card'
import { useRouter } from 'next/navigation'

const Apps = () => {

  const router = useRouter()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 auto-rows-fr gap-4'>
      <Card className='aspect-square rounded-lg p-8' title='博客' onClick={() => router.push('/posts')}>
        博客
      </Card>
      <Card className='aspect-square rounded-lg p-8' title='OMP' onClick={() => window.open('https://nini22p.github.io/omp', '_blank')}>
        OMP
      </Card>
    </div>
  )
}

export default Apps