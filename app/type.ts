type SiteConfig = {
  siteTitle: string
  description: string
}

type AllPostsData = {
  date: string
  title: string
  id: string
}[]

export type { SiteConfig, AllPostsData }