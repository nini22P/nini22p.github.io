---
title: '樱花萌放 switch 版本汉化逆向'
date: '2025-06-09'
tags: ['switch', '汉化', '逆向']
published: true
---

之前通关了樱花萌放实在是意犹未尽，看到有 switch 版本，分辨率也比 PC 版本高，想看看能不能移植汉化。

使用模拟器提取 RomFS 后发现脚本文件可以直接查看，但是使用的 Shift-JIS 编码，大部分汉字在保存后会变成乱码，手动改为 UTF-8 后点击新游戏会黑屏，说明需要改程序禁用掉 Shift-JIS 编码转换为 UTF-8 的函数，直接读取 UTF-8 编码的脚本。

接下来就需要对程序进行逆向，先使用模拟器提取出 ExeFS，得到 `main` 文件。
接着使用 nx2elf2nso 中的 `decompress.cmd` 将 `main` 文件转换为 `main.elf` 文件。
再使用 Il2CppDumper 提取出 il2cpp 文件：

``` shell
./Il2CppDumper "main" "global-metadata.dat" output
```

使用 IDA PRO 打开 `main.elf` 文件，先让程序分析一会。

接下来要找到 Shift-JIS 编码转换为 UTF-8 的地方，打开 Il2CppDumper 生成的 `dump.cs` 文件，搜索 `jis`, 果不其然，找到了一个 `ToUnicode` 函数，是传入 Shift-JIS 字节数组，返回 UTF-8 编码文本的函数。可以看到位置是在 `0x1AB1B50`。

```cs
// Namespace: USEncoder
public class ToEncoding // TypeDefIndex: 1608
{
	// Methods

	// RVA: 0x1AB1790 Offset: 0x1AB1891 VA: 0x1AB1790
	public static byte[] ToSJIS(string unicode_str) { }

	// RVA: 0x1AB1B50 Offset: 0x1AB1C51 VA: 0x1AB1B50
	public static string ToUnicode(byte[] sjis_bytes) { }

	// RVA: 0x1AB1F20 Offset: 0x1AB2021 VA: 0x1AB1F20
	public void .ctor() { }
}
```

返回 IDA PRO，点击左上角 `File` -> `Script file`，选择 Il2CppDumper 同目录下的 `ida_py3.py` 文件，接着会弹窗让你选择一个 json 文件，这里选择 Il2CppDumper 生成的 `script.json` 文件。IDA PRO 会自动加载 Il2CppDumper 生成的符号表，方便我们定位函数。

按 G 键打开跳转菜单，填入上面得到的 `0x1AB1B50` 后确定，我们就来到了 `ToUnicode` 函数的位置。

![ToUnicode 函数](/images/posts/141434.png)

我一开始尝试通过直接修改这个函数，但是修改后会导致无法进入游戏。

后面等到 IDA PRO 分析完毕后，将鼠标聚焦到 `ToUnicode` 函数名称上，按 X 键会弹出调用这个函数的地方，发现有个读取 ks 脚本的函数调用了 `ToUnicode` 函数，这样的话我们可以通过修改调用 `ToUnicode` 这个位置来截胡，直接读取 UTF-8 编码的文本。

![调用 `ToUnicode` 的函数](/images/posts/144446.png)

点击确认后打开调用 `ToUnicode` 函数的位置 `0x244A5C4`。

![调用 `ToUnicode` 的位置](/images/posts/144747.png)

之前提到 `ToUnicode` 函数输入一个 Shift-JIS 字节数组，返回 UTF -8 编码文本，如果要改为读取 UTF-8 编码的脚本，那就是要写一段函数，输入一个 UTF-8 字节数组，返回 UTF-8 编码文本。幸运的是 unity 提供了我们需要的函数。打开之前的 `dump.cs` 文件搜索 `utf8`，最终我们能找到一个 `get_UTF8NoBOM` 函数，来获取 UTF-8 编码器对象。

``` cs
	// RVA: 0x20BAD60 Offset: 0x20BAE61 VA: 0x20BAD60
	private static Encoding get_UTF8NoBOM() { }
``` 

搜索 `getstring`，有一个 `GetString` 函数，可以调用上面编码器对象的 `GetString` 方法，把字节数组转换为 UTF-8 编码的文本。

``` cs
	// RVA: 0x2538EA0 Offset: 0x2538FA1 VA: 0x2538EA0 Slot: 34
	public virtual string GetString(byte[] bytes) { }
```

等等，这里只能改一行，该怎么写下多行呢，翻遍也没找到空白区域给我们用。那就只能找一下没用的函数，借点空间用。

由于 switch 和 PS4 版本用的同一套程序，所以可以思考 switch 版本缺失的功能，短暂的思考后想到了 switch 是没有成就系统的，所以可以从这方面着手。在 `dump.cs` 中搜索 `achievement`, 能找到相关代码，可以尝试。最终我选择了这个 `UnlockReadKs` 函数：

``` cs
	// RVA: 0x271B170 Offset: 0x271B271 VA: 0x271B170
	private bool UnlockReadKs(int type, AchievementReadCondition args) { }
```

来到 `0x271B170` 处，可以看到空间很够，最后的语句是 `RET` 返回。

![`UnlockReadKs` 函数](/images/posts/150839.png)

想要借用空间，可以直接在一开始就通过 `右键` -> `Assemble`, 将这行修改为 `RET`, 为了防止意外，可以把函数剩下的改为 `NOP`。

![修改后的 `UnlockReadKs` 函数](/images/posts/151231.png)

先记下要跳到的位置 `0x271B174`, 然后来到调用 `ToUnicode` 函数的位置 `0x244A5C4`。

将 `0x244A5C4` 这行修改为 `B 0x271B174`，这将会作为跳板跳转到 `0x271B174`。

![修改调用 `ToUnicode` 的位置](/images/posts/151807.png)

接着我们来到 `0x271B174`，开始编写汇编代码。

``` asm
MOV     X21, X0
BL      0x20BAD60
MOV     X1, X21
BL      0x2538EA0
MOV     X2, X0
B       0x244A5C8
```

最后这行是跳回调用 `ToUnicode` 函数的位置的下一行，也就是我们之前跳板跳转的位置的下一行。

![修改后的 `UnlockReadKs` 函数](/images/posts/152755.png)

通过左上角的 `Edit` -> `Path program` -> `Apply Pathes to...` 将补丁应用到 `main.elf` 文件。

用 nx2elf2nso 中的 `compress.cmd` 将 `main.elf` 转换为 `main.nso`。在模拟器中打开 mod 目录，保存到 `<mod名>/exefs/main`。

最后将提取的 `romfs/Data/StreamingAssets/ks` 下的文件复制到 `<mod名>/romfs/Data/StreamingAssets/ks`，可以只复制 ks 文件，然后把文本编码改为 UTF-8，改一点文本，打开游戏测试成功显示。

![](/images/posts/031354.webp)

至于字体的修改就不在本期内容里了（逃）。