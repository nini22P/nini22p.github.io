'use client'

import React from 'react'
import Card from '../../ui/Card/Card'
import apps from '../../data/apps'
import useOpen from '../../hooks/useOpen'

const AppsGrid = () => {

  const { open } = useOpen()

  return (
    <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 auto-rows-fr gap-4'>
      {
        apps.map(app =>
          <Card
            className='aspect-square rounded-lg p-8'
            title={app.title}
            key={app.title}
            onClick={() => open({ path: app.path, url: app.url })}>
            {app.title}
          </Card>
        )
      }
    </div>
  )
}

export default AppsGrid