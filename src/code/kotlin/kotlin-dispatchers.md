---
title: Kotlin 协程之 Dispatchers
icon: shuffle
date: 2024-06-18 08:25:32
category:
  - kotlin
tag:
  - kotlin
---

CoroutineDispatcher 决定了协程运行的线程，不同的 Dispatcher 会将协程分派到不同的线程池中执行。

## Kotlin 预定义的 Dispatcher

* `.Main`：主线程 Dispatcher，用于更新 UI、处理用户交互等。

* `.IO`：用于磁盘或网络等 I/O 操作，如读写文件、网络请求。

* `.Default`：用于 CPU 密集型任务，如排序、复杂计算等。

* `.Unconfined`：协程将在调用它的线程中启动，但后续可能会在其他线程中恢复。相比其它 Dispatcher 不会线程切换。

如果不确定用哪个，用 `Dispatcher.Default`