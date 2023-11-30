---
title: '使用 FFmpeg 将单张图片和单个音频生成视频'
date: '2022-11-13'
tags: []
published: true
---
一般用法

``` shell
$ ffmpeg \
-loop 1 -i "cover.jpg" -i "input.mp3" \
-c:v libx264 -tune stillimage -c:a aac -b:a 320k -shortest \
"output.mp4"
```
