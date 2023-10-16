
# 算法分析 | Algorithm Analysis

一个**算法(algorithm)** 是为了实现特定任务的一个有限条指令的集合

算法满足这些性质：

* Input
* Output
* Definiteness
* Finiteness
* Effectiveness

!!! note ""
    程序是可以不 finite 的(***e.g.*** 操作系统)

## 分析内容

* 运行时间：与机器、编译器有关
* 时间 & 空间复杂度：与机器、编译器无关

假设：

* 指令按顺序执行
* 每条指令是简单的，只需要一个时间单位执行
* 数据规模是给定的，而空间是无限的

通常我们需要分析 $T_{avg}(N) \& T_{worst}(N)$, $N$ 是输入规模（可以有多个输入）

## 渐进符号 | Asymptotic Notation

!!! note "定义"

    大 $O$ 表示法 $T(N) = O(f(N))$，如果存在常数 $c$ 和 $n_0$​使得当 $N\geq n_0$ 时 $T(N)\leq c\cdot f(N)$ 。
    
    > 表示渐进上界，即 $T(N)$ 的阶不会高于 $f(N)$（增长比 $f(N)$ 慢或相同，$\leq$）

    大 $\Omega$ 表示法 $T(N) = \Omega(g(N))$，如果存在常数 $c$ 和 $n_0$​使得当 $N\geq n_0$ 时 $T(N)\geq c\cdot f(N)$ 。
    
    > 表示渐进下界，即 $T(N)$ 的阶不会低于 $f(N)$（增长比 $f(N)$ 快或相同，$\geq$）

    大 $\Theta$ 表示法 $T(N) = \Theta(h(N))$，当且仅当 $T(N) = O(h(N))$ 且 $T(N) = \Omega(h(N))$。
    
    > 表示渐进紧确界，即 $T(N)$ 与 $h(N)$ 同阶（增长速度相同，$=$）

    小 $o$ 表示法 $T(N) = o(p(N))$，当 $T(N)=O(p(N))$ 且 $T(N)\neq \Theta(p(N))$ 时成立。
    
    > 表示非渐进紧确上界，（即 $T(N)$ 增长比 $p(N)$慢，$<$）

$2N + 3 = O( N ) = O( N^{k\geq1} ) = O( 2^N ) = \cdots$ We shall always take the smallest f (N).

### 运算规则

* 若 $T_1(N)=O(f(N)), T_2(N)=O(g(N))$  
    * $T_1(N)+T_2(N)=\max(O(f(N)), O(g(N))$
    * $T_1(N)\cdot T_2(N)=O(f(N)\cdot g(N))$
* 若 $T(N)$ 是最高次数为 k 次的多项式，那么 $T(N)=\Theta (N^k)$  
* 对于任意常数 $k$, 都有 $\log^kN=O(N)$，这说明对数增长非常缓慢。

|Time| Name | 1 | 2 | 4 | 8 | 16 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
|1|Constant|1|1|1|1|1|
|$\log n$|Logarithmic|0|1|2|3|4|
|$n$|Linear|1|2|4|8|16|
|$n\log n$|Log Linear|0|2|8|24|64|
|$n^2$|Quadratic|1|4|16|64|256|
|$n^3$|Cubic|1|8|64|512|4096|
|$2^n$|Exponential|2|4|16|256|65536|
|$n!$|Factorial|1|2|24|40326|20922789880000|

* 比较时的规则
    * $N$足够大

* 分析时的规则

    * for loop  
    运行时间是循环内部语句的最长时间（包括 for 边界判断）乘循环的次数
    * 嵌套 for loop  
    运行时间是各个 for loop 的运行时间逐次相乘
    * 连续执行的语句  
    相加
    * if else  
    运行时间 $\leq$ 判断时间 $ + $ 用时最多的语句块的时间
