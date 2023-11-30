---
title: 'Win32 app isolation 使用体验'
date: '2023-05-26'
tags: [Windows]
published: true
---
最近微软公布了 Win32 app isolation，据称可以隔离应用程序，保护用户隐私。

## 下载

首先我们到 [GitHub](https://github.com/microsoft/win32-app-isolation/releases) 下载最新的版本，解压后安装。

## 创建证书

创建证书需要使用 Visual Studio 或者 Visual Studio 生成工具下载 Windows SDK，[下载地址](https://visualstudio.microsoft.com/zh-hans/downloads/)。安装完毕后打开终端。

验证命令

``` shell
Get-Command -Module PKI
```

如果成功会显示如下命令列表，部分条目省略。

``` shell
CommandType     Name                                               Version    Source
-----------     ----                                               -------    ------
...
Cmdlet          Export-Certificate                                 1.0.0.0    PKI
...
Cmdlet          New-SelfSignedCertificate                          1.0.0.0    PKI
...
```

创建证书，修改`<>`内的内容。

``` shell
New-SelfSignedCertificate -Type Custom -Subject "CN=<名字>, C=<国家>" -KeyUsage DigitalSignature -FriendlyName "<名字>" -CertStoreLocation "Cert:\CurrentUser\My" -TextExtension @("2.5.29.37={text}1.3.6.1.5.5.7.3.3", "2.5.29.19={text}") -NotAfter (Get-Date).AddYears(10)
```

设置当前目录为 `Cert:\CurrentUser\My`。

``` shell
Set-Location Cert:\CurrentUser\My
```

查询当前目录下的证书。

``` shell
Get-ChildItem | Format-Table Subject, FriendlyName, Thumbprint
```

设置密码，修改`<Your Password>`。

``` shell
$password = ConvertTo-SecureString -String <Your Password> -Force -AsPlainText 
```

导出 pfx 证书到 `<FilePath>` ，`<Thumbprint>` 替换为之前查询到的 `Thumbprint`，用于给应用签名。

``` shell
Export-PfxCertificate -cert "Cert:\CurrentUser\My\<Certificate Thumbprint>" -FilePath <FilePath>.pfx -Password $password
```

导出 cer 证书 `<FilePath>`，用于分发应用。

``` shell
 Export-Certificate -cert "Cert:\CurrentUser\My\<Thumbprint>" -FilePath <FilePath>.cer
```

## 创建应用

这里我拿某云盘来示例，打开之前安装好的 MSIX Packaging Tool。选择 `应用程序包` 来创建应用包。

选择打包方法，不想污染本机环境可以选`在远程计算机上创建程序包`或者`在本地虚拟机上创建程序包`。

选择安装程序，下面选使用 pfx 证书签名。

![](/images/posts/1685092852834.png)

修改程序包信息。安装应用，安装完毕后点`下一个`。

修改首次启动任务，多余的快捷方式可以删掉，目前务必把回收站里的也删掉，不然安装后还是会出现在应用列表。

![](/images/posts/1685092869471.png)

最后跟随引导就完成了应用包的创建。

## 应用安装

找到之前导出的 cer 证书，点击安装，存储位置选择 `当前计算机`，然后选择安装到 `受信任的根证书颁发机构`。最后到桌面找到 MSIX 应用包即可安装。

## 应用体验

应用打包后不会在 AppData 下拉屎，但是其它文件夹依旧能被访问，还是需要更精细的权限控制，下面是尝试的几个应用：

* FireFox：能正常从 Microsoft Edge 浏览器导入书签等资料，通过 `file:///C:/` 能访问 C 盘。
* Gridea：能在文档目录创建资料，预览时会在用户目录创建输出目录。
* QQ：能在文档目录创建资料。
* 115：能在下载文件夹创建下载目录。
