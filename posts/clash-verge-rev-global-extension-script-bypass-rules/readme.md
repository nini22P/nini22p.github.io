---
title: 'Clash Verge Rev 中使用全局扩展脚本添加绕过规则'
date: '2024-10-13'
tags: ['Clash Verge Rev']
published: true
---

将全局扩展脚本并替换为如下脚本，然后添加域名或 IP 规则即可。

``` javascript
// 直连域名
const directDomain = [
  "bing.com",
  "microsoft.com",
]

// 直连 IP
const directIP = [
  "10.0.0.0/10",
]

const newRules = [
  ...directDomain.map(domain => `DOMAIN-SUFFIX,${domain},DIRECT`),
  ...directIP.map(ip => `IP-CIDR,${ip},DIRECT,no-resolve`),
]

const main = (config) => {
  config.rules = [...newRules, ...config.rules]
  return config
}
```