export type SiteConfig = {
  siteTitle: string,
  description: string,
  url: string,
}

export type PostData = {
  title: string,
  date: string,
  tags: string[],
}

export type Post = {
  slug: string,
  data: PostData,
  contentHtml: string,
}

export type PostListItem = {
  slug: string,
  data: PostData,
}