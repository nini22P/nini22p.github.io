---
title: 'Surface Go 3 降级 Windows 10'
date: '2025-04-26'
tags: ['Microsoft', 'Surface', 'Windows']
draft: false
---

随着 Windows 11 更新，这颗奔腾处理器是越来越不够用了，每次打开都是 Windows Update 占满 CPU，硬控半小时。于是想办法降级到 Windows 10。

但是微软只对商用版本提供了 Windows 10 的恢复映像，那怎么办呢，我通过上网查找相关图片，通过拼接序列号的方式下载到了 Windows 10 的恢复映像。下面是尝试过的序列号。需要自己尝试的可以通过修改 `0B34BCB` 后面的四位数字。

* Surface Go 3 P/8/128

```
0B34BCB213333F BMR_16020
0B34BCB213733F BMR_176020
0B34BCB214633F BMR_186020
0B34BCB220433F BMR_86020
```

* Surface Go 3 P/4/64

```
0B34BCB214733F BMR_186220
0B34BCB215333F BMR_86220
0B34BCB220733F BMR_86220
0B34BCB220833F BMR_186220
```

* Surface Go 3 i3/8/128

```
0B34BCB214833F BMR_16020
0B34BCB215233F BMR_176020
0B34BCB221033F BMR_86020
```

* Surface Go 3 i3/4/64

```
0B34BCB220933F BMR_146220
```

可以看到恢复映像版本也有不同，经测试包含中文的版本是 `BMR_186220`。

拿到了序列号后就可以去微软网站下载恢复映像了。

[Surface 恢复映像下载](https://support.microsoft.com/zh-cn/surface-recovery-image)

最后根据官方的文档创建恢复驱动器并恢复即可。

[创建和使用 Surface 的 USB 恢复驱动器](https://support.microsoft.com/zh-cn/surface/%E5%88%9B%E5%BB%BA%E5%92%8C%E4%BD%BF%E7%94%A8-surface-%E7%9A%84-usb-%E6%81%A2%E5%A4%8D%E9%A9%B1%E5%8A%A8%E5%99%A8-677852e2-ed34-45cb-40ef-398fc7d62c07)
