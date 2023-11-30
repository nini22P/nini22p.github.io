---
title: 'ZTE F460 使用 Telnet'
date: '2023-09-07'
tags: []
published: true
---

## Telnet 连接

首先打开 Windows 终端，运行：

``` shell
ping 192.168.1.1 -l 128 -t
```

然后再打开 CMD 控制台（这里用 Windows 终端 telnet 连接无法滚动显示），运行：

``` shell
telnet 192.168.1.1 10128
```

用户名输入 `root` ，密码输入 `Zte521` 。如果是四川地区密码用 `Zte521@SC` 。

## 常用命令

### 获取光猫账号密码

``` shell
sendcmd 1 DB p DevAuthInfo
```

`telecomadmin` 即为超级管理员账号，`useradmin` 为普通账号。

### 获取宽带账号密码

``` shell
sendcmd 1 DB p WANCPPP
```

得到 `UserName` 和 `Password` 就是拨号账户和密码。

## 参考

* [获取电信光猫超级密码支持中兴F412/F460/F612/F660](https://www.52pojie.cn/thread-1203775-1-1.html)

* [如何获取光猫中的宽带账号和密码](https://www.right.com.cn/FORUM/forum.php?mod=redirect&goto=findpost&ptid=4074609&pid=10841862)
