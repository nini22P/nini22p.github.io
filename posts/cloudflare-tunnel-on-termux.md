---
title: '在 Termux 上使用 Cloudflare Tunnel 搭建网站'
date: '2023-04-02 09:07:21'
tags: [Termux,Cloudflare Tunnel]
published: true
hideInList: false
feature: 
isTop: false
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

下载 [cloudflared-linux-arm64.deb](https://github.com/cloudflare/cloudflared/releases) ，本文编写时使用的版本为 `2023.3.1`。

``` shell
apt install wget -y && wget https://github.com/cloudflare/cloudflared/releases/download/2023.3.1/cloudflared-linux-arm64.deb
```

安装 cloudflared-linux-arm64.deb。

``` shell
dpkg -i cloudflared-linux-arm64.deb
```

查看版本号。

``` shell
cloudflared -v
```

登录 Cloudflare 账户并授权，会自动打开浏览器进行授权。配置文件默认保存在 `/root/.cloudflared` 文件夹。

``` shell
cloudflared tunnel login
```

创建名为 `nextjs-blog` 的隧道。

``` shell
cloudflared tunnel create nextjs-blog
```

完毕后会在 `/root/.cloudflared/` 保存一个名为 "Tunnel ID" 的 json 文件。

打开 `.cloudflared` 文件夹编写配置文件。

``` shell
cd .cloudflared
apt install vim -y && vim config.yml
```

根据官方提供的配置模板来修改。

``` yaml
tunnel: 6ff42ae2-765d-4adf-8112-31c55c1551ef
credentials-file: /root/.cloudflared/6ff42ae2-765d-4adf-8112-31c55c1551ef.json

ingress:
  - hostname: nextjs-blog.example.com
    service: http://localhost:3000
  - service: http_status:404
```

点击 `ESC`，输入 `:wq` 保存并退出。
添加 DNS 记录，dns 后面依次为 Tunnel 名称和配置文件中的主机名。

``` shell
cloudflared tunnel route dns nextjs-blog nextjs-blog.example.com 
```

运行 Cloudflare Tunnel。

``` shell
cloudflared tunnel run
```

在浏览器地址栏输入 `nextjs-blog.example.com` 即可访问刚刚创建的 `nextjs-blog` 项目。

![](/images/posts/1680408310803.png)

## 相关链接

* [F-Droid / Termux](https://f-droid.org/packages/com.termux/)
* [cloudflare / cloudflared](https://github.com/cloudflare/cloudflared)
