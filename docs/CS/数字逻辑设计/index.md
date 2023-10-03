# 数字逻辑设计

## 课程简介与延伸

数字逻辑课程关于计算机组成相关部件的设计，是一门**基础课程**，包括：

- 组合电路设计、时序电路设计

其之后的*计算机组成*是基于这门课上的**核心**课程，关于设计简单RISC-CPU核

- ALU部件
- 单周期实现、多周期实现简单的32位-CPU
    - RISC-V指令集
    - 写入FPGA（Field Programmable Gate Array - 现场可编程逻辑门阵列）,用实验板卡做测试验证

- 简易计算机系统（微控制系统）

再到之后的*计算机系统结构*，是这门课的**提高**课程，关于设计流水线RISC-CPU核心

> 目前计算机CPU性能的提高，基本是基于制造工艺的优化（3nm/7nm）

## 课程目的

- Introduce basic theory and design methods for digital logic.
- Give students basic skills to analysis and design electronic digital computer logic circuit.
- Prepare for the further studies on hardware related courses,such as
    - Computer Organization(计算机组成原理)
    - Computer Architecture(计算机体系结构)
    - Embedded Systems(嵌入式系统)
    - Communication(通信原理)
    - ...

## 课程内容

- Number representation, digital codes(0,1).
- Boolean algebra and logic minimization techniques(布尔代数与逻辑化简).
- Combinational circuits design and analysis(组合逻辑电路设计与分析).
    - Sources of delay(延迟源) in cominational circuits and effect on circuit performance.
    - survey of common combinational circuits.
- Sequential circuit design and analysis(时序逻辑电路设计与分析).
    - timing analysis of sequential circuits.(时序电路的时序分析)
    - Register & Register Transfers Control(寄存器与寄存器传输控制).
- Concept of programmable logic devices and memories(可编程逻辑器件与存储器).

## 实验要求

- Verilog: HDL(Hardware Description Language)硬件描述语言

    - Verilog数字系统设计教程(夏宇闻)

- 编译工具：Xilinx ISE IDE 14.7

## 笔记参考

- [Isshiki修's 笔记](https://note.isshikih.top/cour_note/D2QD_DigitalDesign/)