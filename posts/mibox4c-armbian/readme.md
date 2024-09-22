---
title: '小米盒子4C 安装 Armbian'
date: '2024-09-22'
tags: [Armbian,小米盒子,小米]
published: true
---

## 刷入 Root 固件

网上教程很多了，我这里只提供刷机相关软件下载地址。

* [Mi BOX 4 YQZM 2 Root Aml Upgrade Package 20200808 / Internet Archive](https://archive.org/details/mi-box-4-yqzm-2-root-aml-upgrade-package-20200808)
* [Amlogic_USB_Burning_Tool_v2.1.9.zip / Android Data Host](https://androiddatahost.com/svf58)
* [Amlogic_Driver.zip / Android Data Host](https://androiddatahost.com/5quvy)

## U盘启动 Armbian

首先下载最新的 [amlogic-s9xxx-armbian 固件 / GitHub](https://github.com/ophub/amlogic-s9xxx-armbian/releases)，固件太多怎么选？我这里推荐选择`Armbian_xx.xx.xx_amlogic_s905l_xxx_xx.xx.xx_server_xxxx.xx.xx.img`，编写这篇博文时我选择的是 [Armbian_24.11.0_amlogic_s905l_noble_6.6.50_server_2024.09.10.img](https://github.com/ophub/amlogic-s9xxx-armbian/releases/download/Armbian_noble_save_2024.09/Armbian_24.11.0_amlogic_s905l_noble_6.6.50_server_2024.09.10.img.gz)。

使用 rufus 将镜像写入 U盘，给盒子插入扩展坞，插入 U盘、有线网卡（手机 USB 网络共享也可，但是后续 SSH 操作必须使用手机）和键盘。

盒子刷入带 Root 固件后下载安装 [终端模拟器 / F-Droid](https://f-droid.org/zh_Hans/packages/com.termoneplus/)，进入软件后执行 `su` 授予 Root 权限，执行 `reboot update` 启动 U盘上的 Armbian 系统。

进入系统会提示创建 Root 密码，接下来会提示创建用户，没有特殊需求可以 `Ctrl + C` 跳过，引导完毕后会显示系统信息。

## 备份安卓系统

如果之前的有线网卡和 SSH 客户端在同一网段下，那么根据启动后显示的 ip 地址进行连接，用户名 `root`，密码为之前设置的。

执行 `sudo apt update` 更新源。

执行 `armbian-tf` 对 U盘扩容。

执行 `armbian-ddbr` 备份 EMMC ，备份文件位于 `/ddbr/BACKUP-arm-64-emmc.img.gz`。

``` shell
root@armbian:~# armbian-ddbr
[ STEPS ] Welcome to use the eMMC system backup/restore service.
[ INFO ] The device name: [ Amlogic Meson GXL (S905L3b) MBH-M302A Box ]
[ INFO ] The device eMMC name: [ /dev/mmcblk2 ]
[ INFO ] The device eMMC size: [ 7GB ]
[ INFO ] The ddbr file path: [ /ddbr/BACKUP-arm-64-emmc.img.gz ]

--------------------------------------------------
  Option  Function
--------------------------------------------------
    b     :Backup the system from eMMC to USB
    r     :Restore the system from USB to eMMC
--------------------------------------------------
[ OPTIONS ] Please select (b/r):
```
输入 b 进行备份，备份完毕后可以用 SSH 客户端上的 SFTP 工具将备份文件复制出来。

## 安装 WiFi 驱动

执行 `lsusb` 发现网卡型号是 `Realtek Semiconductor Corp. RTL8188FTV 802.11b/g/n 1T1R 2.4G WLAN Adapter`。

网络上搜索，找到有方法安装驱动 [Realtek RTL8188FTV WiFi Adapter on Linux / GitHub](https://github.com/1999AZZAR/use-RTL8188FTV-on-linux)

首先更新软件包并安装 net-tools。

``` shell
sudo apt update && sudo apt upgrade -y && sudo apt install net-tools
```

添加 kelebek333/kablosuz 源并更新。

``` shell
sudo add-apt-repository ppa:kelebek333/kablosuz && sudo apt update
```

安装驱动，这里编译时间较长，可以休息一下做些其他的。

``` shell
sudo apt install rtl8188fu-dkms
```

修改驱动配置。

``` shell
echo "options rtl8188fu rtw_ips_mode=0" | sudo tee /etc/modprobe.d/rtl8188fu.conf
```

``` shell
sudo modprobe -rv rtl8188fu && sudo modprobe -v rtl8188fu
```

（可选）固定 mac 地址，`xx:xx:xx:xx:xx:xx` 替换为你的 mac 地址，可以网络上随便生成一个。

``` shell
echo "options rtl8188fu rtw_ips_mode=0 rtw_initmac="xx:xx:xx:xx:xx:xx"" | sudo tee /etc/modprobe.d/rtl8188fu.conf
```

执行 `reboot` 重启，进入系统后执行 `nmtui`，选择 `Activate a connection` 并连接 WiFi。

``` shell
┌───────────────────────────────────────────────┐
│                                               │ 
│ ┌──────────────────────────────┐              │ 
│ │ Ethernet                   ↑ │ <Activate>   │ 
│ │   Wired connection 1       ▒ │              │ 
│ │                            ▒ │              │ 
│ │ USB Ethernet               ▒ │              │ 
│ │ * Wired connection 2       ▒ │              │ 
│ │                            ▒ │              │ 
│ │ Wi-Fi                      ▒ │              │ 
│ │   CMCC-9X5G         ▂▄▆_ ▒ │              │ 
│ │   ChinaNet-sode     ▂▄__  ▒ │              │ 
│ │   CMCC-7F0C         ▂___  ▒ │              │ 
│ │                            ▒ │              │ 
│ │                            ▒ │              │ 
│ │                            ▒ │              │ 
│ │                            ▒ │              │ 
│ │                            ↓ │ <Back>       │ 
│ └──────────────────────────────┘              │  
└───────────────────────────────────────────────┘                           
```


## 安装到 Armbian 到 EMMC

如果只想 U盘启动的话这部分可以跳过，只要开机时不拔掉 U盘，都是优先启动 U盘上的系统，不小心回到安卓系统就 `reboot update` U盘启动。

执行 `sudo armbian-install` 进入安装程序。

``` shell
[ STEPS ] Installing Armbian to internal eMMC...
[ STEPS ] Checking dependencies...
[ INFO ] Dependency check completed. Proceeding installation...
[ STEPS ] Initializing the environment...
[ INFO ] Use mainline u-boot: [ no ]
[ INFO ] Use ampart tool: [ yes ]
[ INFO ] Show all devices: [ no ]
[ INFO ] Internal eMMC : [ /dev/mmcblk2 ]
[ STEPS ] Start selecting device...
-----------------------------------------------------------------------------------------------------
ID    SOC        MODEL                                         DTB                                               
-----------------------------------------------------------------------------------------------------
...
114   s905w      X96W,FunTV,MXQ-Pro-4K                         meson-gxl-s905w-x96w.dtb                          
115   s905l      UNT402A,M201-S,MiBox-4C,IP108H,B860AV2.1      meson-gxl-s905l3b-m302a.dtb                       
116   s905l      MG101,Mibox-4,E900V21C                        meson-gxl-s905l-venz-v10.dtb                      
...
-----------------------------------------------------------------------------------------------------
[ OPTIONS ] Please Input ID: 115
```
输入这里面找到型号 `MiBox-4C`，输入 `115` 并回车。

文件类型选 `ext4`。

``` shell
[ STEPS ] Which type of filesystem do you want for your root? 
-----------------------------------------------
  ID   TYPE
-----------------------------------------------
  1    ext4
  2    btrfs
-----------------------------------------------
[ OPTIONS ] Please Input ID (1/2): 1
```
最后等待安装完毕，输入 `poweroff` 关闭系统，拔掉 U盘，重新插入电源即可启动安装到 EMMC 上的 Armbian。

如果后面想快速完全重新安装可以在安装完毕重启前使用 `armbian-ddbr` 进行备份。

## 刷回安卓系统

如果实在玩腻了想刷回安卓系统，可以考虑以下两种方法，如果都不行只有 [小米盒子4c 救砖刷机触点 / 百度贴吧](https://tieba.baidu.com/p/7301504012)。

### 方法1. 恢复备份

如果在之前备份了安卓系统，可以插入电源前插入 U盘启动 U盘上的 Armbian，使用 SFTP 直接复制到 `/ddbr` 后使用 `armbian-ddbr` 进行恢复。

### 方法2. 清除 /boot 分区后线刷

如果你忘了备份，能进 EMMC 上的 Armbian，可以清除掉 /boot 分区后线刷。

先执行 df 查看 /boot 分区

``` shell
root@armbian:~# df
Filesystem     1K-blocks    Used Available Use% Mounted on
tmpfs              80548    3488     77060   5% /run
/dev/mmcblk2p2   6064416 2233496   3814536  37% /
tmpfs             402736       0    402736   0% /dev/shm
tmpfs               5120       8      5112   1% /run/lock
tmpfs             402736       4    402732   1% /tmp
/dev/mmcblk2p1    522224  165552    356672  32% /boot
/dev/zram1         47960    7804     36572  18% /var/log
tmpfs              80544       4     80540   1% /run/user/0
```

这里 /boot 分区是 `/dev/mmcblk2p1`。

执行 `umount /dev/mmcblk2p1` 取消挂载 /boot 分区。

执行 `mkfs.ext4 /dev/mmcblk2p1` 格式化 /boot 分区。

执行 `poweroff` 关闭电源。

拔掉电源后直接连接电脑即可线刷。

## 相关链接

* [Mi BOX 4 YQZM 2 Root Aml Upgrade Package 20200808 / Internet Archive](https://archive.org/details/mi-box-4-yqzm-2-root-aml-upgrade-package-20200808)
* [Amlogic_USB_Burning_Tool_v2.1.9.zip / Android Data Host](https://androiddatahost.com/svf58)
* [Amlogic_Driver.zip / Android Data Host](https://androiddatahost.com/5quvy)
* [amlogic-s9xxx-armbian 固件 / GitHub](https://github.com/ophub/amlogic-s9xxx-armbian/releases)
* [Armbian_24.11.0_amlogic_s905l_noble_6.6.50_server_2024.09.10.img / GitHub](https://github.com/ophub/amlogic-s9xxx-armbian/releases/download/Armbian_noble_save_2024.09/Armbian_24.11.0_amlogic_s905l_noble_6.6.50_server_2024.09.10.img.gz)
* [终端模拟器 / F-Droid](https://f-droid.org/zh_Hans/packages/com.termoneplus/)
* [Realtek RTL8188FTV WiFi Adapter on Linux / GitHub](https://github.com/1999AZZAR/use-RTL8188FTV-on-linux)
* [小米盒子4c 救砖刷机触点 / 百度贴吧](https://tieba.baidu.com/p/7301504012)