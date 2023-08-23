---
title: '使用 FFmpeg 将单张图片和单个音频生成视频'
date: '2022-11-13 15:03:47'
tags: []
published: true
hideInList: false
feature: 
isTop: false
---
一般用法

```
$ ffmpeg \
-loop 1 -i "cover.jpg" -i "input.mp3" \
-c:v libx264 -tune stillimage -c:a aac -b:a 320k -shortest \
"output.mp4"
```
