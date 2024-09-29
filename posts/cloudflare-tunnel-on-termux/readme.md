---
title: '在 Termux 上使用 Cloudflare Tunnel 搭建网站'
date: '2023-04-02'
tags: [Termux,Cloudflare Tunnel]
published: true
---
利用 Cloudflare Tunnel 可以在没有公网的情况下实现内网穿透，本文借助 Termux 在手机上运行。

## 前期准备

* 在 Cloudflare 上绑定域名并开通 Zero Trust 服务。
* 在设备上安装 [Termux](https://f-droid.org/packages/com.termux/)。

## 安装 Linux

安装 proot-distro。

``` shell
pkg install proot-distro
```

安装 Ubuntu，你可以根据习惯选择其他系统。

``` shell
proot-distro install ubuntu
```

登录 Ubuntu，默认 root 账户。

``` shell
proot-distro login ubuntu
```

更新软件包。

``` shell
apt update && apt upgrade -y
```

## 搭建项目

这里创建一个 Next.js 应用来演示。

安装 Node.js 。

``` shell
curl -fsSL https://deb.nodesource.com/setup_18.x | bash - &&\
apt-get install -y nodejs
```

使用模板创建应用。

``` shell
npx create-next-app@latest nextjs-blog --use-npm --example "https://github.com/vercel/next-learn/tree/master/basics/learn-starter"
```

打开文件夹并运行项目。

``` shell
cd nextjs-blog
npm start
```

此时我们可以通过 `本地ip:3000` 访问网站。

![](/images/posts/1680407837628.png)

## 配置 Cloudflare Tunnel

保持 Next.js 应用运行，手指放在屏幕左边，等待侧边栏出现后右滑，点击 `NEW SESSION` 打开新窗口。

登录 Ubuntu。

``` shell
proot-distro login ubuntu
```

前往 Zero Trust 控制台 [https://one.dash.cloudflare.com](https://one.dash.cloudflare.com) 。

进入 `Networks` / `Tunnels`，点击 `Create a tunnel` 按钮新建隧道。

保存隧道名字之后会让你选择平台和架构，依次选 Debian 和 arm64-bit，复制下方左边的命令，以下命令为示例，请复制你实际控制台页面上的命令并运行。

```
curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-arm64.deb && 

sudo dpkg -i cloudflared.deb && 

sudo cloudflared service install <token>
```

运行 Tunnel。

``` shell
service cloudflared start
```

如果成功页面下方会看到连接上的设备，保存后会让你添加一个页面。

`Subdomain` 输入 `nextjs-blog`, `Domain` 选择你的域名。`Type` 选择 `http`, `URL` 输入 `localhost:3000`，最后点击保存。

在浏览器地址栏输入 `nextjs-blog.example.com` 即可访问刚刚创建的 `nextjs-blog` 项目。

![](/images/posts/1680408310803.png)

## 相关链接

* [F-Droid / Termux](https://f-droid.org/packages/com.termux/)
* [cloudflare / cloudflared](https://github.com/cloudflare/cloudflared)
