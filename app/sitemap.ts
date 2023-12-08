import { MetadataRoute } from 'next'
import { getPostList } from './posts/posts'
import siteConfig from '../site.config'

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const postList = await getPostList()

  const posts: MetadataRoute.Sitemap = postList.map(
    post => (
      {
        url: `${siteConfig.url}/posts/${post.slug}`,
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
      url: `${siteConfig.url}/apps`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/posts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...posts,
  ]
}

export default sitemap