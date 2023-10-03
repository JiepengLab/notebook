# Chapter 1 Mathematical Preliminaries

## 1.2 Roundoff Errors and Computer Arithmetic

Truncation Error(截断误差) and Roundoff Error(舍入误差):

- **Truncation Error**: the error involved in using a truncated, or finite, summation to approximate the sum of an infinite series.
    - 截断: 0.1119 -> 0.111
    - 近似无穷级数的有限求和：估计$\int_0^1 e^{-x^2}dx$，需要泰勒展开，但是无法计算无穷项，只能计算有限项，这样就会产生截断误差。
- **Roundoff Error**: the error produced when performing real number calculations. It occurs because the arithmetic performed in a machine involves numbers with only a finite number of digits.
    - 舍入: 0.1119 -> 0.112
    - 由于计算机只能表示有限位数的小数，所以会产生舍入误差。

> Given a real number $y = 0.d_1d_2d_3\ldots d_kd_{k+1}\ldots \times 10^n$(which is called **Normalized decimal floating-point form of a real number**)
>
> $$fl(y) = \begin{cases} 0.d_1d_2d_3\ldots d_k \times 10^n& \text{/* chopping */} \\ chop(y + 5 \times 10^{n-(k+1)}) & \text{/* rounding */} \end{cases}$$

absolute error(绝对误差) and relative error(相对误差):

denote $p^*$ as the approximation of $p$.

- **absolute error**: $|p^* - p|$
- **relative error**: $\frac{|p^* - p|}{|p|}$

relative error for the two methods of rounding:

> **chopping**:  
>
> $\frac{|y - fl(y)|}{|y|} = \frac{0.d_{k+1}d_{k+2}\ldots \times 10^{n-k}}{0.d_1d_2d_3\ldots d_k \times 10^n} = \frac{0.d_{k+1}d_{k+2}\ldots}{0.d_1d_2d_3\ldots d_k} \times 10^{-k} < \frac{1}{0.1} \times 10^{-k} = 10^{-k+1}$
>
> **Rounding**:
>
> $\frac{|y - fl(y)|}{|y|} \leq \frac{0.5 \times 10^{n-k}}{0.d_1d_2d_3\ldots d_k \times 10^n} = \frac{0.5}{0.1} \times 10^{-k} = 0.5 \times 10^{-k+1}$

- *Subtraction* of nearly equal numbers will cause **a cancellation of significant digits**.

> $a=0.123456789, b=0.123456788$，两者本来有9位有效数字，但是相减后只剩下1位有效数字。

- *Dividing* by a number with *small* magnitude (or, equivalently, *multiplying* by a number with *large* magnitude) will cause an enlargement of the error.

> 误差举例：
>
> Evaluate $f(x) = x^3 - 6.1x^2 + 3.2x + 1.5$ at $x = 4.71$ using 3-digit arithmetic(3位有效数字).
>
> |          | $x$    | $x^2$     | $x^3$        | $6.1x^2$                     | $3.2x$   |
> | -------- | ------ | --------- | ------------ | ---------------------------- | -------- |
> | exact    | $4.71$ | $22.1841$ | $104.487111$ | $135.32301$                  | $15.072$ |
> | Chopping | $4.71$ | $22.1$    | $104.$       | $6.1*22.1=134.81\approx134.$ | $15.0$   |
> | Rounding | $4.71$ | $22.2$    | $105.$       | $6.1*22.2=135.42\approx135.$ | $15.1$   |
>
> Exact value: $f(4.71) = 104.487111 - 135.32301 + 15.072 + 1.5 = -14.263899$
>
> Chopping: $f(4.71) = 104 - 134 + 15.0 + 1.5 = -13.5$
>
> - Relative error: $\frac{|-14.263899 + 13.5|}{|-14.263899|} \approx 5.35\%$
>
> Rounding: $f(4.71) = 105 - 135 + 15.1 + 1.5 = -13.4$
>
> - Relative error: $\frac{|-14.263899 + 13.4|}{|-14.263899|} \approx 6.06\%$
>
> 可见，有时候舍入误差比截断误差更大。

误差太大了！介绍——**秦九韶算法**！

> 因为乘法导致的误差太大，所以可以使用秦九韶算法，减少乘法的次数。

把一个多项式$f(x) = a_nx^n + a_{n-1}x^{n-1} + \ldots + a_1x + a_0$写成如下形式：

$$f(x) = ((\ldots(a_nx + a_{n-1})x + a_{n-2})x + \ldots)x + a_1)x + a_0$$

然后从最内层开始计算。

> 将上例改写成秦九韶算法：
>
> $$f(x) = ((x-6.1)x + 3.2)x + 1.5$$
>
> **Chopping**: 
>
> $$\begin{align*}
> &((4.71-6.1)4.71 + 3.2)4.71 + 1.5 \\
> =& (-1.39*4.71 + 3.2)4.71 + 1.5 \\
> =& (-6.54 + 3.2)4.71 + 1.5 \\
> =& -3.34*4.71 + 1.5 \\
> =& -15.7 + 1.5 \\
> =& -14.2
> \end{align*}
> $$
> Relative error: $\frac{|-14.263899 + 14.2|}{|-14.263899|} \approx 0.44\%$
> 
> **Rounding**:
> 
> $$\begin{align*}
> &((4.71-6.1)4.71 + 3.2)4.71 + 1.5 \\
> =& (-1.39*4.71 + 3.2)4.71 + 1.5 \\
> =& (-6.55 + 3.2)4.71 + 1.5 \\
> =& -3.35*4.71 + 1.5 \\
> =& -15.8 + 1.5 \\
> =& -14.3
> \end{align*}
> $$
>
> Relative error: $\frac{|-14.263899 + 14.3|}{|-14.263899|} \approx 0.25\%$

## 1.3 Algorithms and Convergence

算法的**stable**和**unstable**：

An algorithm that satisfies that **small changes** in the initial data **produce** correspondingly **small changes** in the final results is called **stable**; otherwise it is unstable.

> An algorithm is called **conditionally stable** if it is stable only for certain choices of initial data.

误差的种类：

Suppose that $E_0 > 0$ is the initial error and $E_n$ is the error after $n$ steps.

- If $E_n \approx CnE_0$ for some constant $C$, then the growth of error is said to be **linear**.

> Linear growth of error is usually unavoidable, and when $C$ and $E_0$ are small the results are generally acceptable.

- If $E_n \approx C^nE_0$ for some constant $C>1$, then the growth of error is said to be **exponential**(指数级).

> Exponential growth of error should be avoided since the term $C^n$ becomes large for even relatively small values of $n$. This leads to unacceptable inaccuracies, regardless of the size of $E_0$.

## 1.4 IEEE 754 FLOATING POINT REPRESENTATION

### 二进制的科学计数法

> 二进制的科学计数法：$x = \pm 1.d_1d_2d_3\ldots d_k \times 2^n$