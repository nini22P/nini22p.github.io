'use client'

import React from 'react'
import { DiscussionEmbed } from 'disqus-react'

const Disqus = ({ shortname, url, identifier, title }: { shortname: string, url: string, identifier: string, title: string }) => {
  return (
    <DiscussionEmbed
      shortname={shortname}
      config={
        {
          url: url,
          identifier: identifier,
          title: title,
        }
      }
    />
  )
}

export default Disqus