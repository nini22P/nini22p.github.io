---
title: 'Clash Verge Rev 中使用全局扩展脚本添加绕过规则'
date: '2024-10-13'
tags: ['Clash Verge Rev']
published: true
---

将全局扩展脚本并替换为如下脚本，然后根据实际情况添加域名或 IP 规则即可。

``` javascript
// 直连域名关键词
const directDomainKeyword = [
  'apple',
]

// 直连域名
const directDomain = [
  'apple.com',
]

// 直连 IP
const directIP = [
  '10.0.0.0/10',
]

// 代理 GEOSITE
const proxyGeoSite = [
  'github',
  'onedrive',
]

// 直连 GEOSITE
const directGeoSite = [
  'microsoft',
  'tailscale',
]

// 直连 GEOIP
const directGeoIP = [
  'tailscale',
]

const newRules = (config) => {
  // 默认代理
  const proxy = config['proxy-groups'][0].name

  // 新规则，根据实际使用情况调整顺序
  return [
    ...directDomainKeyword.map(domainKeyword => `DOMAIN-KEYWORD,${domainKeyword},DIRECT`),
    ...directDomain.map(domain => `DOMAIN-SUFFIX,${domain},DIRECT`),
    ...directIP.map(ip => `IP-CIDR,${ip},DIRECT,no-resolve`),
    ...proxyGeoSite.map(site => `GEOSITE,${site},${proxy}`),
    ...directGeoSite.map(site => `GEOSITE,${site},DIRECT`,),
    ...directGeoIP.map(ip => `GEOIP,${ip},DIRECT`),
  ]
}

const main = (config) => {
  config.rules = [...newRules(config), ...config.rules]
  return config
}
```