---
title: 'Clash Verge Rev 全局扩展脚本'
date: '2024-10-13'
tags: ['Clash Verge Rev']
published: true
---

**更新：推荐使用 [Clash Composer](https://clash-composer.pages.dev/)，可以填写表单生成订阅链接和脚本**

将全局扩展脚本并替换为如下脚本，然后根据实际情况添加域名或 IP 规则即可。

``` javascript
// 代理域名
const proxyDomains = []

// 代理GEOSITE
const proxyGeoSites = [
  'github',
]

// 直连域名关键词
const directDomainKeywords = []

// 直连域名
const directDomains = []

// 直连IP
const directIPs = []

// 直连GEOSITE
const directGeoSites = []

// 直连GEOIP
const directGeoIPs = []

/**
 * @typedef {Object} ProxyGroup
 * @property {string} name
 * @property {boolean} [directFirst]
 * @property {string[]} [filters]
 * @property {string[]} [domains]
 * @property {string[]} [domainKeywords]
 * @property {string[]} [geoSites]
 * @property {string[]} [geoIPs]
 */

/** 代理组
 *  @type {ProxyGroup[]}
 */
const proxyGroups = [
  {
    name: 'Google',
    geoSites: ['google'],
  },
  {
    name: 'Microsoft',
    directFirst: true,
    geoSites: ['microsoft'],
  },
  {
    name: 'Apple',
    directFirst: true,
    geoSites: ['apple'],
  },
  {
    name: 'E-Hentai',
    filters: ['US', 'UnitedStates', '美国'],
    domains: ['e-hentai.org', 'exhentai.org'],
  },
]

// 生成规则
const newRules = (config) => {
  const defaultProxy = config['proxy-groups'][0].name
  const generateRule = (type, items, proxy) => items.map(item => `${type},${item},${proxy}`)

  return [
    ...generateRule('DOMAIN-SUFFIX', proxyDomains, defaultProxy),
    ...generateRule('GEOSITE', proxyGeoSites, defaultProxy),
    ...generateRule('DOMAIN-KEYWORD', directDomainKeywords, 'DIRECT'),
    ...generateRule('DOMAIN-SUFFIX', directDomains, 'DIRECT'),
    ...generateRule('IP-CIDR', directIPs, 'DIRECT,no-resolve'),
    ...generateRule('GEOSITE', directGeoSites, 'DIRECT'),
    ...generateRule('GEOIP', directGeoIPs, 'DIRECT'),
  ]
}

// 生成代理组规则
const newProxyGroupsRules = proxyGroups.flatMap(group => {
  const rules = []

  if (group.domainKeywords) {
    rules.push(...group.domainKeywords.map(keyword => `DOMAIN-KEYWORD,${keyword},${group.name}`))
  }
  if (group.domains) {
    rules.push(...group.domains.map(domain => `DOMAIN-SUFFIX,${domain},${group.name}`))
  }
  if (group.geoSites) {
    rules.push(...group.geoSites.map(site => `GEOSITE,${site},${group.name}`))
  }
  if (group.geoIPs) {
    rules.push(...group.geoIPs.map(ip => `GEOIP,${ip},${group.name}`))
  }

  return rules
})

// 生成代理组
const newProxyGroups = (config) => {
  const defaultProxy = config['proxy-groups'][0].name;
  const proxies = config.proxies.map(proxy => proxy.name);

  return proxyGroups.map(group => {
    const filteredProxies = group.filters
      ? proxies.filter(proxy => group.filters.some(filter => proxy.toLowerCase().includes(filter.toLowerCase())))
      : proxies;
    return {
      name: group.name,
      type: 'select',
      proxies: group.directFirst
        ? ['DIRECT', defaultProxy, ...filteredProxies]
        : [defaultProxy, 'DIRECT', ...filteredProxies],
    };
  });
}


const main = (config) => {
  config.rules = [
    ...newRules(config),
    ...newProxyGroupsRules,
    ...config.rules,
  ]
  config['proxy-groups'].splice(1, 0, ...newProxyGroups(config))
  return config
}
```