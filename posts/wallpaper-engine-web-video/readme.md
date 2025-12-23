---
title: '在壁纸引擎中创建网页视频壁纸'
date: '2023-12-07'
tags: [壁纸引擎,Wallpaper Engine]
draft: false
---
这个标题看着就很怪，为什么要用网页创建视频壁纸呢？

因为壁纸引擎的视频壁纸除了播放和暂停，只能一直无限循环，没有办法做到从其他应用切换到桌面就重新播放一次的功能，这个时候只能用网页壁纸来做。

## 功能实现

首先创建一个 `index.html` 文件。  
目前壁纸引擎中只能播放 webm 封装的视频，建议压制 VP9 编码，在大部分设备上兼容性较好。  
设置 `playsinline` 关闭控制按钮，设置 `autoplay` 自动播放，必须设置 `muted` 静音，否则无法自动播放。

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Wallpaper Engine Web Video Template</title>
  <link rel="stylesheet" href="styles.css" />
  <script src="script.js" defer></script>
</head>

<body>
  <video src="video.webm" id="video" playsinline="playsinline" autoplay="autoplay" muted="muted">
</body>

</html>
```

新建 `styles.css` 文件，将视频画面铺满全屏。

```css
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

新建 `script.js` 文件，通过 id 获取到 `video` 元素。

```javascript
const video = document.getElementById('video');
```

如何查询目前是否切换到其他应用呢？通过浏览壁纸引擎的文档，壁纸引擎提供了 `window.wallpaperPropertyListener` 监听器。通过调用其中的 `setPaused` 方法来获取是否暂停。

下面的代码会在壁纸引擎暂停或者播放时调用 `setPaused` 方法。  
如果是暂停状态则会暂停播放，若视频播放完毕则会设置进度到开头。  
如果是播放状态则会开始播放，如果在暂停时播放进度被重置就实现了重复播放。

```javascript
window.wallpaperPropertyListener = {
  setPaused: (isPaused) => {
    if (isPaused) {
      if (video.ended) {
        video.currentTime = 0
      }
      video.pause()
    } else {
      video.play()
    }
  },
}
```

## 完整代码

[GitHub - nini22P / wallpaper-engine-web-video-template](https://github.com/nini22P/wallpaper-engine-web-video-template)
