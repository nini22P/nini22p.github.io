---
title: '提取某路人游戏的音频和CG'
date: '2022-09-27'
tags: [PSV,解包]
draft: false
---
将游戏解密，`PCSG00543\PSP2_GAME\USRDIR`下就有我们想要的文件。
根据文件名推断音频是`.awb`，CG在`resource.dat`。

## 提取音频

下载[VGMToolbox](https://sourceforge.net/projects/vgmtoolbox/)，打开后选择`VGMToolbox/Misc. Tools/Streams/CRI HCA Extractor`。

这里以`music.awb`为例，将文件拖入窗口，`hca`音频被提取到`music_HCAs`文件夹。

下载[DereTore Toolkit](https://github.com/OpenCGSS/DereTore/releases)，将以下文件解压到`music_HCAs`，

```
DereTore.Common.dll
DereTore.Common.StarlightStage.dll
DereTore.Exchange.Audio.HCA.dll
DereTore.Interop.OS.dll
hca2wav.exe
```

在`music_HCAs`下新建`hca2wav.bat`填入

``` shell
md converted
for %%i in (*.hca) do  (hca2wav.exe %%i -o converted\%%~ni.wav)
```

运行脚本，即可在`converted`文件夹中找到音频文件。

## 提取CG

下载 [QuickBMS](https://aluigi.altervista.org/papers/quickbms.zip) 并解压，再下载脚本 [saenai_heroine_no_sodatekata.bms](https://aluigi.altervista.org/bms/saenai_heroine_no_sodatekata.bms) 。
在`\USRDIR`文件夹下打开终端，输入`C:\...\quickbms.exe C:\...\saenai_heroine_no_sodatekata.bms resource.dat`（省略部分自行补全）并回车，文件会被提取到`resource`文件夹。

下载 [GXTConvert](https://github.com/xdanieldzd/GXTConvert/releases) 并解压，在`resource`文件夹下打开终端，输入`C:\...\GXTConvert.exe script_event`（省略部分自行补全）并回车，`gxt`格式的图片将会转换成`png`并保存到`script_event (converted)`文件夹下。
