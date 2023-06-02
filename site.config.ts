import { SiteConfig } from "./app/type"

const siteConfig: SiteConfig = {
  siteTitle: process.env.NEXT_PUBLIC_SITE_TITLE || 'Blog',
  description: process.env.NEXT_PUBLIC_DESCRIPTION || 'Blog'
}

export default siteConfig