---
title: 'PWA 动态主题颜色'
date: '2024-02-19'
tags: ['PWA']
published: true
---

通常 PWA 的主题颜色是写在 `manifest.json` 中，无法动态改变。
如果有动态更改的需求我们可以直接把主题颜色写在 `index.html` 里的 `head` 标签里。

```html
<meta id="themeColor" name="theme-color" content="#f7f7f7" />
```

然后在需要更改主题颜色时使用 JavaScript 通过 id 更改 `content`。

```JavaScript
document.getElementById('themeColor').content = '#3b3b3b'
```

如果需要在不同颜色模式使用不同的主题颜色，可以加入媒体查询。

```html
<meta id="themeColorLight" name="theme-color" media="(prefers-color-scheme: light)" content="#f7f7f7" />
<meta id="themeColorDark" name="theme-color" media="(prefers-color-scheme: dark)" content="#3b3b3b" />
```
