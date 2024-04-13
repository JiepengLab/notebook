# Computer Organization & Design | 计算机组成

!!! note ""

    - 授课：林芃
    - 学在浙大：[上课课件](https://courses.zju.edu.cn/course/68311/courseware#/)
    - 学在浙大：[实验课件](https://courses.zju.edu.cn/course/68313/courseware#/)

    ![alt text](images/image.png)
    课程评分方法：

    - 平时占 20%：作业、课堂、阅读
    - 期中闭卷(英文)考试(统一时间段)，10%
    - 期末闭卷(英文)考试 40%
    - 实验占 30%
        - Lab00~03: 基本实验 30%
        - Lab04 :单周期CPU 30%
        - Lab05 : 流水线CPU 40%
        - 附加分奖励：优秀作品 (附加后不超过100分)

    注：卷面成绩不到45分(满分100分)者，总评不及格。

!!! danger ""

    本文来自 [咸鱼暄的代码空间](https://xuan-insr.github.io/computer_organization/)

这是计算机组成课程的学习记录。

使用的课本是 _Computer Organization and Design - The Hardware / Software Interface (RISC-V Edition)_：

!!! warning "说明"
    我自认为在 **3 Arithmetic**, **4 Processor**, **5 Cache** 三章中的整理和讲解是非常详细的，如果这些部分存在看不懂的地方，请务必联系我。

    但是，计组课程本身在 **2 Instructions** 的部分讲解了很多关于汇编程序的知识；但是我之前在汇编语言和计算机系统概论等课程中已经学习过了这些知识，因此在本章中只整理了 RISC-V 的指令集和一些约定，省略了关于函数调用、递归的一些内容。

    同时，由于时间原因，**1 Overview** 和 **6 I/O** 两章的内容不完整。暂时没有补全计划。

!!! summary "课程速览"
    - Chapter1: Computer Abstraction and Technology
    - **Chapter 2: Instructions: Language of  the Computer**
    - **Chapter 3: Arithmetic for Computers**
    - **Chapter 4:The Processor：Datapath and Control**
    - **Chapter 5:Large and Fast:  Exploiting Memory Hierarchy**
    - Chapter 6: Parallel processor from client to Cloud (选讲，非考试内容)
    - Appendix: Storage, Networks, and Other Peripherals (Ch8 of Version 3,了解概念)

    > 加粗为核心内容。
