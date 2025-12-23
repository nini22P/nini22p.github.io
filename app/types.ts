export type SiteConfig = {
  siteTitle: string,
  description: string,
  url: string,
}

export type PostData = {
  title: string,
  date: string,
  tags: string[],
  draft: boolean,
}

export type Post = {
  slug: string,
  data: PostData,
  contentHtml: string,
}