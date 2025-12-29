---
title: '《可塑性记忆》解包和封包教程'
date: '2025-12-29'
tags: [PSV]
draft: false
---

我也不清楚为什么要写这个，或许未来用得到吧。

我首先在网络上查询到了 woqux02 的 [这篇文章](https://www.cnblogs.com/woqux02/p/13615513.html)。得知使用 [FreeMote](https://github.com/UlyssesWu/FreeMote) 即可解包和封包。

## 解包

于是我下载了 [FreeMote](https://github.com/UlyssesWu/FreeMote) 的[最新版本](https://github.com/UlyssesWu/FreeMote/releases)，解压后，放到某个文件夹然后添加到系统环境变量中。

然后在已解密的游戏文件夹下打开 Shell，运行

``` bash
psbdecompile info-psb -k 2shj693vwue5t -l 131 -a scenario_info.psb.m
```

然后文件夹下会生成一个 `scenario` 文件夹，里面就是解包出来的脚本文件，还有 `scenario_info.psb.m.json` 和 `scenario_info.psb.m.resx.json` 两个文件。其他的文件同理。

## 封包

封包的话，我建议把之前解包出来的 `scenario` 文件夹和 `scenario_info.psb.m.json` 和 `scenario_info.psb.m.resx.json` 两个文件复制到一个新的文件夹中，防止覆盖原文件。然后运行

```bash
psbuild info-psb scenario_info.psb.m.json 
```

对脚本进行封包。文件夹下会生成 `scenario_body.bin` 和 `scenario_info.psb.m` 两个文件。其他文件同理。

## 制作小体积的补丁包

一般来说到这里就结束了，但是我看到英化组的补丁很小，只打包了必要的文件进去。于是我解包研究了一下实现了同样的效果。

首先解包 `config_info.psb.m`。

```bash
psbdecompile info-psb -k 2shj693vwue5t -l 131 -a config_info.psb.m
```

把解包得到的 `config` 文件夹和 `config_info.psb.m.json` 和 `config_info.psb.m.resx.json` 两个文件移动到一个新的文件夹中。

打开 `config/init.psb.m.json`，找到 `archives` 这个节点，这里可以看到要加载的资源。然后我们添加上我们自己的补丁包名称。

``` json
{
  "archives": {
    "patch": "", // 添加我们的补丁包名称
    "font": "font",
    "image": "image",
    "motion": "motion",
    "scenario": "scenario",
    "sound": "sound",
    "voice": "voice"
  },
}
```

然后运行

``` bash
psbuild info-psb config_info.psb.m.json 
```

即可对配置文件进行封包。然后文件夹下会生成 `config_body.bin` 和 `config_info.psb.m` 两个文件。

接下来就是制作补丁包了，只是文件结构稍有不同。我们在 `config_info.psb.m.json` 同级目录新建一个 `patch` 文件夹，然后把解包的 `scenario` 文件夹复制到 `patch` 文件夹中。

现在文件夹结构

``` bash
├── config
├── patch
│   └── scenario
├── config_body.bin
├── config_info.psb.m
├── config_info.psb.m.json
└── config_info.psb.m.resx.json
```

新建一个 `patch_info.psb.m.json` 文件

``` json
{
  "expire_suffix_list": [
    ".psb.m"
  ],
  "file_info": {},
  "id": "archive",
  "version": 1.0
}
```

再新建一个 `patch_info.psb.m.resx.json` 文件

``` json
{
  "PsbVersion": 2,
  "PsbType": "ArchiveInfo",
  "Platform": "none",
  "CryptKey": null,
  "ExternalTextures": false,
  "Context": {
    "MdfKeyLength": 131,
    "FileName": "patch_info.psb.m",
    "MdfKey": "2shj693vwue5tpatch_info.psb.m",
    "PsbZlibFastCompress": false,
    "PsbShellType": "MDF",
    "ArchiveSource": [
      "patch"
    ],
    "MdfMtKey": "2shj693vwue5t",
    "ArchiveItemFileNames": [],
    "BodyBinName": "patch_body.bin"
  },
  "Resources": null
}
```

现在的文件夹结构

``` bash
├── config
├── patch
│   └── scenario
├── config_body.bin
├── config_info.psb.m
├── config_info.psb.m.json
├── config_info.psb.m.resx.json
├── patch_info.psb.m.json
└── patch_info.psb.m.resx.json
```

然后运行

```bash
psbuild info-psb patch_info.psb.m.json 
```

即可对补丁包进行封包。然后文件夹下会生成 `patch_body.bin` 和 `patch_info.psb.m` 两个文件。

接下来往 `patch` 里放置 `font`、`image` 和 `motion` 这几个解包出来的文件夹。

现在的文件夹结构

``` bash
├── config
├── patch
│   ├── font
│   ├── image
│   ├── motion
│   └── scenario
├── config_body.bin
├── config_info.psb.m
├── config_info.psb.m.json
├── config_info.psb.m.resx.json
├── patch_body.bin
├── patch_info.psb.m
├── patch_info.psb.m.json
└── patch_info.psb.m.resx.json
```

然后运行

``` bash
psbuild info-psb patch_info.psb.m.json 
```

重新对补丁包进行封包。

将 `config_body.bin`、`config_info.psb.m`、`patch_body.bin` 和 `patch_info.psb.m` 这几个文件复制到模拟器游戏文件夹中运行，可以在控制台看到大部分资源都是从补丁包中加载的。

当然现在的补丁包还是太大了，如果是无需修改的文件，进入子文件夹把它的文件夹和对应的 json 文件删除。补丁包里没有的文件会从原来的包中加载。这样就实现小体积的补丁包了。
