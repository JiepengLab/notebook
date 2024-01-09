# Chapter 1 数学基础 | Mathematical Preliminaries

!!! note "本讲概述"
    本讲主要介绍数值计算中的误差类型和误差分析，以及IEEE 754浮点数表示。

## 1.2 舍入误差和计算机算术 | Roundoff Errors and Computer Arithmetic

### 1.2.1 截断误差和舍入误差 | Truncation Error and Roundoff Error

- **截断误差**: 使用截断的(或者说有限的)求和来近似无穷级数的和->产生的误差

    - 理论：$e=\sum\limits_{n=0}^{\infty} \frac{1}{n!} $

    - 计算机: $e=\sum\limits_{n=0}^{N} \frac{1}{n!} $
  
- **舍入误差**: 当计算机执行实数计算时产生的误差。这是因为计算机中的算术运算涉及到的数字只有有限位数。
    - 理论：$0.3333333\cdots$
    - 计算机: $0.333333$

### 1.2.2 截断法和舍入法 | Chopping and Rounding

使用舍入法或截断法产生的误差都叫做**舍入误差**。

- Chopping: 0.1119 -> 0.111，直接截断
- Rounding: 0.1119 -> 0.112，四舍五入

!!! note "函数表示"
    Given a real number $y = 0.d_1d_2d_3\ldots d_kd_{k+1}\ldots \times 10^n$(which is called **Normalized decimal floating-point form of a real number**)

    $$fl(y) = \begin{cases} 0.d_1d_2d_3\ldots d_k \times 10^n& \text{/* chopping */} \\ chop(y + 5 \times 10^{n-(k+1)}) & \text{/* rounding */} \end{cases}$$

### 1.2.3 绝对误差与相对误差 | Absolute error and relative error

Denote $p^*$ as the approximation of $p$.

- **Absolute error**: $|p^* - p|$
- **Relative error**: $\frac{|p^* - p|}{|p|}$

!!! note "近似产生的误差"

    **chopping**:  

    $$\frac{|y - fl(y)|}{|y|} = \frac{0.d_{k+1}d_{k+2}\ldots \times 10^{n-k}}{0.d_1d_2d_3\ldots d_k \times 10^n} = \frac{0.d_{k+1}d_{k+2}\ldots}{0.d_1d_2d_3\ldots d_k} \times 10^{-k} < \frac{1}{0.1} \times 10^{-k} = 10^{-k+1}$$

    **Rounding**:

    $$\frac{|y - fl(y)|}{|y|} \leq \frac{0.5 \times 10^{n-k}}{0.d_1d_2d_3\ldots d_k \times 10^n} = \frac{0.5}{0.1} \times 10^{-k} = 0.5 \times 10^{-k+1}$$

!!! note "误差产生"

    - 两个近乎相等的数相减二导致有效数字的相消，例如：$a=0.123456789, b=0.123456788$，两者本来有9位有效数字，但是相减后只剩下1位有效数字。
    - 如果有限位的表示或计算产生了误差，则除以一个小数（或者乘以一个大数）会放大绝对误差。

误差计算举例：

Evaluate $f(x) = x^3 - 6.1x^2 + 3.2x + 1.5$ at $x = 4.71$ using 3-digit arithmetic(3位有效数字).

|          | $x$    | $x^2$     | $x^3$        | $6.1x^2$                     | $3.2x$   |
| -------- | ------ | --------- | ------------ | ---------------------------- | -------- |
| exact    | $4.71$ | $22.1841$ | $104.487111$ | $135.32301$                  | $15.072$ |
| Chopping | $4.71$ | $22.1$    | $104.$       | $6.1*22.1=134.81\approx134.$ | $15.0$   |
| Rounding | $4.71$ | $22.2$    | $105.$       | $6.1*22.2=135.42\approx135.$ | $15.1$   |

Exact value: $f(4.71) = 104.487111 - 135.32301 + 15.072 + 1.5 = -14.263899$

Chopping: $f(4.71) = 104 - 134 + 15.0 + 1.5 = -13.5$

- Relative error: $\frac{|-14.263899 + 13.5|}{|-14.263899|} \approx 5.35\%$

Rounding: $f(4.71) = 105 - 135 + 15.1 + 1.5 = -13.4$

- Relative error: $\frac{|-14.263899 + 13.4|}{|-14.263899|} \approx 6.06\%$

可见，有时候舍入误差比截断误差更大。

!!! note ""
    但现在的误差还是太大了！介绍——**秦九韶算法**！

乘法较多会导致式子的误差较大，此时可以使用秦九韶算法（其实就是不断提取$x$）来减少乘法的次数。

把一个多项式$f(x) = a_nx^n + a_{n-1}x^{n-1} + \ldots + a_1x + a_0$写成如下形式：

$$f(x) = ((\ldots(a_nx + a_{n-1})x + a_{n-2})x + \ldots)x + a_1)x + a_0$$

然后从最内层开始计算。

将上例改写成秦九韶算法：

$$f(x) = ((x-6.1)x + 3.2)x + 1.5$$

**Chopping**:

$$\begin{aligned}
&((4.71-6.1)4.71 + 3.2)4.71 + 1.5 \\
=& (-1.39*4.71 + 3.2)4.71 + 1.5 \\
=& (-6.54 + 3.2)4.71 + 1.5 \\
=& -3.34*4.71 + 1.5 \\
=& -15.7 + 1.5 \\
=& -14.2
\end{aligned}
$$

Relative error: $\frac{|-14.263899 + 14.2|}{|-14.263899|} \approx 0.44\%$

**Rounding**:

$$\begin{align*}
&((4.71-6.1)4.71 + 3.2)4.71 + 1.5 \\
=& (-1.39*4.71 + 3.2)4.71 + 1.5 \\
=& (-6.55 + 3.2)4.71 + 1.5 \\
=& -3.35*4.71 + 1.5 \\
=& -15.8 + 1.5 \\
=& -14.3
\end{align*}
$$

Relative error: $\frac{|-14.263899 + 14.3|}{|-14.263899|} \approx 0.25\%$

可见，此时误差明显减小了。

## 1.3 算法和收敛性 | Algorithms and Convergence

### 稳定性 | Stability

一个算法，如果初始数据的**小变化**会导致最终结果的**小变化**，则称为**稳定**(stable)；否则称为**不稳定**(unstable)。

一个算法，如果只有在某些初始数据的选择下才是稳定的，则称为**条件稳定**(conditionally stable)。

### 误差增长 | The growth of errors

假设$E_0 > 0$是初始误差(initial error)，$E_n$是第$n$步的误差。

- 如果$E_n \approx CnE_0$，则称为**线性增长**(linear growth)。

线性增长的误差通常是无法避免的，当$C$和$E_0$都很小的时候，结果通常是可以接受的。

- 如果$E_n \approx C^nE_0$，则称为**指数增长**(exponential growth)。

指数增长的误差应该避免，因为即使$E_0$很小，$C^n$也会变得很大。这会导致不可接受的不准确性。

### 收敛速度 | Convergence rate

使用$O$符号来表示收敛速度。

假设$\lim_{h\to 0} F(h) = L$，$\lim_{h\to 0} G(h) = 0$。如果存在正常数$K$使得

$$|F(h)-L| \leq K|G(h)|$$

对于足够小的$h$成立，则记为$F(h)=L+O(G(h))$

我们通常取$G(h)=h^p,(p>0)$，并对最大的$p$值感兴趣。

!!! example "求当$h\to 0$时下列函数的收敛速度"

    $F(h) = \frac{\sin h}{h}$, $\lim_{h\to 0}\frac{\sin h}{h} = 1$

    解: $F(h)-L=\frac{\sin h}{h}-1 = \frac{\sin h-h}{h} \sim \frac{h-\frac{h^3}{6}+o(h^3)-h}{h} \sim-\frac{h^2}{6}\leq K|h^2|$

    所以收敛速度为$O(h^2)$。

## 1.4 IEEE 754 FLOATING POINT REPRESENTATION

二进制的科学计数法：$x = \pm 1.d_1d_2d_3\ldots d_k \times 2^n$，这里的$d_i$是二进制的数字,$1.d_1d_2d_3\ldots d_k$为有效位数(Significand)。

在计算机里有两种表示方法，分别是Single(32位)和double(64位)。均为下图的形式。

!!! note ""

    ![二进制](images/image.png)

    $$x = (-1)^S \times (1+Fraction) \times 2^{Exponent-Bias}$$

    - $S$代表符号位(sign bit)。$S$为$0$表示非负数，$S$为$1$表示负数。
    - 有效位数($Significand = 1 + Fraction$) 中$1$是默认的，我们只存储小数点后面的位数(即Fraction)。
    - $Fraction$ 代表尾数部分(也称作**mantissa**)。
      - Single: $23$ $bits$
      - Double: $52$ $bits$
    - $Exponent$ 表示指数部分(也称作**characteristic**)。
        - Single: $8$ $bits$
        - Double: $11$ $bits$
        - excess representation(偏移表示法) $=$ actual exponent $-$ bias，其中：
            - Single: $bias = 127$ $bits$
            - Double: $bias = 1023$ $bits$
        - 指数为全 $0$ 和全 $1$ 时用作特殊值处理
    
    !!! tip "Single & Double的值域"

        !!! example "Single的值域"
            - 最小值：
            - Exponent = 00000001, Fraction = 000...000
            - $$x = \pm  (1+0.0) \times 2^{1-127} = \pm 1.0 \times 2^{-126} \approx \pm 1.2 \times 10^{-38}$$

            - 最大值：
            - Exponent = 11111110, Fraction = 111...111
            - $$x = \pm (1+0.111\ldots 111) \times 2^{254-127} \approx \pm 2.0 \times 2^{127} \approx \pm 3.4 \times 10^{38}$$

        !!! example "Double的值域"
            - 最小值：
            - Exponent = 00000000001, Fraction = 000...000
            - $$x = \pm (1+0.0) \times 2^{1-1023} = \pm 1.0 \times 2^{-1022} \approx \pm 2.2 \times 10^{-308}$$

            - 最大值：
            - Exponent = 11111111110, Fraction = 111...111
            - $$x = \pm (1+0.111\ldots 111) \times 2^{2046-1023} \approx \pm 2.0 \times 2^{1023} \approx \pm 1.8 \times 10^{308}$$

    !!! tip "Single & Double的十进制精度"
    
        !!! example "Single的十进制精度"
            - 最小分度: $2^{-23}$
            - $\log_{10}{2^{-23}}\approx -6.92$
            - 所以约为小数点后六位有效数字


        !!! example "Double的值域"
            - 最小分度: $2^{-52}$
            - $\log_{10}{2^{-52}}\approx -15.65$
            - 所以约为小数点后十六位有效数字

!!! note "十进制->IEEE754 浮点数"
    !!! question "Represent $–0.75$"
    1. Convert to binary: $0.75 = 0.11$
    2. Normalize: $0.11 = 1.1 × 2^{–1}$
    3. Sign bit: $S = 1$
    4. Exponent:
        - Single: $–1 + 127 = 126 = 01111110$
        - Double: $–1 + 1023 = 1022 = 01111111110$
    5. Fraction:
        - Single: $0.1 = 100\cdots 00$，共23位
        - Double: $0.1 = 100\cdots 00000$，共52位
    $\therefore$ IEEE 754 Representation:
        - Single: $1\ 01111110\ 100\cdots 00$
        - Double: $1\ 01111111110\ 100\cdots 00000$

!!! note "IEEE754 浮点数->十进制"
    !!! question "What number is represented by the single-precision float 11000000101000…00"
    1. Sign bit: $S = 1$
    2. Exponent: $E = 10000001 = 129$
    3. Actual exponent: $E - 127 = 2$
    4. Fraction: $01000\cdots 00$
    5. Significand: $1.01000\cdots 00 = 1.25$
    6. $\therefore$ Number: $–1.25 × 2^2 = –5.0$
