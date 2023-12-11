import { MetadataRoute } from 'next'
import siteConfig from '../site.config'
import { getPostList } from './blog/posts'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const postList = await getPostList()

  const posts: MetadataRoute.Sitemap = postList.map(
    post => (
      {
        url: `${siteConfig.url}/blog/${post.slug}/`,
        lastModified: new Date(post.data.date),
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    ))

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/apps/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/blog/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts,
  ]
}

export default sitemap