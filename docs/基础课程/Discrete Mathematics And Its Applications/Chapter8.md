# Chapter.8 - Advanced Counting Techniques

## Section 1 - Applications of Recurrence Relations

**Recurrence Relations** - A recurrence relation for the sequence $a_0, a_1, a_2, \dots$ is an equation that expresses $a_n$ in terms of one or more of the previous terms of the sequence, namely $a_0, a_1, \dots, a_{n-1}$, for all integers $n$ with $n \geq n_0$, where $n_0$ is a nonnegative integer.

**Degree**:
> $a_n=a_{n-1}+a_{n-8}$ is a recurrence relation of degree 8.
>
> 意味着我们需要知道前8个数才能计算后面的数

## Section 2 - Solving Linear Recurrence Relations

**Linear Homogeneous Recurrence Relations（线性齐次递归关系）**:

> (1) $a_n = (1.02)a_{n-1}$
>
> linear; constant coefficients; homogeneous;degree 1
>
> (2) $a_n = (1.02)a_{n-1} + 100$
>
> linear; constant coefficients; nonhomogeneous;degree 1
>
> (3) $a_n = (1.02)a_{n-1} + 100a_{n-2}$
>
> linear; constant coefficients; homogeneous;degree 2
>
> (4) $a_n = (1.02)a_{n-1} + 100a_{n-2} + 1000$
>
> linear; constant coefficients; nonhomogeneous;degree 2
>
> (5) $a_n = (1.02)a_{n-1}a_{n-2} + 1000a_{n-3}$
>
> nonlinear; constant coefficients; homogeneous;degree 3
>
> (6) $a_n = (1.02)a_{n-1}a_{n-2} + 1000na_{n-3}$
>
> nonlinear; coefficient is a function of $n$; homogeneous;degree 3

### Solving Linear Homogeneous Recurrence Relations with Constant Coefficients

**Characteristic Equation** - The characteristic equation of the recurrence relation $a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k}$ is $x^k = c_1x^{k-1} + c_2x^{k-2} + \dots + c_k$.

**Roots of a Characteristic Equation** - The roots of the characteristic equation of the recurrence relation $a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k}$ are called the characteristic roots of the recurrence relation.

**General Solution** - The general solution of the recurrence relation $a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k}$ is $a_n = \alpha_1r_1^n + \alpha_2r_2^n + \dots + \alpha_kr_k^n$, where $r_1, r_2, \dots, r_k$ are the distinct characteristic roots of the recurrence relation and $\alpha_1, \alpha_2, \dots, \alpha_k$ are constants that depend on the initial conditions.

**General Solution with Repeated Roots** - If the characteristic equation of the recurrence relation $a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k}$ has $t$ distinct roots $r_1, r_2, \dots, r_t$ and $r_i$ has multiplicity $m_i$, then the general solution of the recurrence relation is

$$
\begin{aligned}
a_n &= (\alpha_{1,0} + \alpha_{1,1}n + \alpha_{1,2}n^2 + \dots + \alpha_{1,m_1-1}n^{m_1-1})r_1^n \\
&+ (\alpha_{2,0} + \alpha_{2,1}n + \alpha_{2,2}n^2 + \dots + \alpha_{2,m_2-1}n^{m_2-1})r_2^n \\
&+ \dots \\
&+ (\alpha_{t,0} + \alpha_{t,1}n + \alpha_{t,2}n^2 + \dots + \alpha_{t,m_t-1}n^{m_t-1})r_t^n
\end{aligned}
$$

, where $\alpha_{i,j}$ are constants that depend on the initial conditions.

> [Example] Find an explicit formula for the Fibonacci numbers.
>
> Solution:
>
> 1. The Fibonacci numbers are defined by the recurrence relation $F_n = F_{n-1} + F_{n-2}$ for $n \geq 2$ with the initial conditions $F_0 = 0$ and $F_1 = 1$.
> 2. The characteristic equation of this recurrence relation is $x^2 = x + 1$.
> 3. The roots of this equation are $r_1 = \frac{1 + \sqrt{5}}{2}$ and $r_2 = \frac{1 - \sqrt{5}}{2}$.
> 4. Therefore, the general solution of the recurrence relation is $F_n = \alpha_1(\frac{1 + \sqrt{5}}{2})^n + \alpha_2(\frac{1 - \sqrt{5}}{2})^n$.
> 5. The initial conditions $F_0 = 0$ and $F_1 = 1$ give the equations $\alpha_1 + \alpha_2 = 0$ and $\alpha_1(\frac{1 + \sqrt{5}}{2}) + \alpha_2(\frac{1 - \sqrt{5}}{2}) = 1$.
> 6. Solving these equations gives $\alpha_1 = \frac{1}{\sqrt{5}}$ and $\alpha_2 = -\frac{1}{\sqrt{5}}$.
> 7. Therefore, the explicit formula for the Fibonacci numbers is $F_n = \frac{1}{\sqrt{5}}(\frac{1 + \sqrt{5}}{2})^n - \frac{1}{\sqrt{5}}(\frac{1 - \sqrt{5}}{2})^n$.
>
>---
>
> [Example] $a_n = 6a_{n-1}-9a_{n-2}$ for $n \geq 2$ with the initial conditions $a_0 = a_1 = 1$
>
> Solution:
>
> 1. The characteristic equation of this recurrence relation is $x^2 = 6x - 9$.
> 2. The roots of this equation are $r_1 = r_2 = 3$.
> 3. Therefore, the general solution of the recurrence relation is $a_n = (\alpha_{1,0} + \alpha_{1,1}n)3^n$
> 4. The initial conditions $a_0 = 1$ and $a_1 = 1$ give the equations $\alpha_{1,0} = 1$ and $3\times(\alpha_{1,0} +  \alpha_{1,1}) = 1$.
> 5. Solving these equations gives $\alpha_{1,0} = 1$ and $\alpha_{1,1} = -\frac{2}{3}$.
> 6. Therefore, the explicit formula for the sequence is $a_n = (1 - \frac{2}{3}n)3^n$.

### Solving Linear Nonhomogeneous Recurrence Relations with Constant Coefficients

**Particular Solution** - A particular solution of the recurrence relation $a_n = c_1a_{n-1} + c_2a_{n-2} + \dots + c_ka_{n-k} + f(n)$ is a solution of the recurrence relation that does not depend on the initial conditions.

[Theorem] 假设非齐次线性递归关系的非线性部分$F(n)$的形式为

$$F(n) = (b_tn^t + b_{t-1}n^{t-1} + \dots + b_1n + b_0)r^n$$

1. 如果$r$不是特征根，那么特解的形式是$(c_tn^t + c_{t-1}n^{t-1} + \dots + c_1n + c_0)r^n$
2. 如果$r$是$m$重特征根，那么特解的形式是$(c_tn^t + c_{t-1}n^{t-1} + \dots + c_1n + c_0)r^nn^m$

> [Example] $a_n = 6a_{n-1}-9a_{n-2} + F(n)$ where $F(n) = 3^n,n3^n,n^22^n,(n^2+1)3^n$.
>
> Solution:
>
> 1. 齐次部分的特征根为$r_1 = r_2 = 3$。
> 2. 对于$F(n) = 3^n$，其中$r=3$是二重特征根，所以特解的形式是$c_0n^23^n$。
> 3. 对于$F(n) = n3^n$，其中$r=3$是二重特征根，所以特解的形式是$(c_1n+c_0)n^23^n$。
> 4. 对于$F(n) = n^22^n$，其中$r=2$不是特征根，所以特解的形式是$(c_2n^2+c_1n+c_0)2^n$。
> 5. 对于$F(n) = (n^2+1)3^n$，其中$r=3$是二重特征根，所以特解的形式是$(c_3n^2+c_2n+c_1)n^23^n$。
>
> ---
> [Example] $a_n = a_{n-1}+n$ where $a_1 = 1$.
>
> Solution:
>
> 1. 齐次部分的特征根为一重根$r = 1$,通解形式为$a_n^H = C$
> 2. 对于$F(n) = n=n\times 1^n$，其中$r=1$是一重特征根，所以特解的形式是$(c_1n+c_0)*1*n=c_1n^2+c_0n$。
> 3. 将特解代入递归关系，得到$c_1n^2+c_0n = c_1(n-1)^2+c_0(n-1)+n$，所以$(2c_1-1)n=c_1-c_0$，所以$c_1 =c_0 = \frac{1}{2}$，故特解为$a_n^P=\frac{1}{2}n^2+\frac{1}{2}n$。
> 4. 故通解为$a_n = a_n^H + a_n^P = C + \frac{1}{2}n^2+\frac{1}{2}n$。将$a_1 = 1$代入，得到$C = 0$，故$a_n = \frac{1}{2}n^2+\frac{1}{2}n$。

## Section 3 - Generating Functions

### Generating Functions

**Generating Function** - The generating function of the sequence $a_0, a_1, a_2, \dots$ is the power series $a_0 + a_1x + a_2x^2 + \dots = \sum_{n=0}^{\infty}a_nx^n$.

> [Example] The generating function of the sequence $1, 1, 1, \dots$ is $1 + x + x^2 + \dots = \frac{1}{1-x}$.

[Theorem] 假设$f(x)=\sum_{n=0}^{\infty}a_nx^n$和$g(x)=\sum_{n=0}^{\infty}b_nx^n$是两个生成函数，那么

- $f(x)+g(x)=\sum_{n=0}^{\infty}(a_n+b_n)x^n$
- $cf(x)=\sum_{n=0}^{\infty}(ca_n)x^n$
- $f(x)g(x)=\sum_{n=0}^{\infty}(\sum_{k=0}^{n}a_kb_{n-k})x^n$
- $f(\alpha x)=\sum_{n=0}^{\infty}a_n(\alpha x)^n=\sum_{n=0}^{\infty}a_n\alpha^nx^n$
- $xf'(x)=\sum_{n=0}^{\infty}na_nx^{n}$

> [Example] Suppose that the generating function ofthe sequence: $a_0, a_1, a_2, \dots$ is $A(x)$. What is the generating function of the sequence $b_k = \sum_{i=0}^{k}a_i$ ?
>
> - Solution:
>
> 1. 记$c_k=1$,其生成函数为$C(x)=\sum_{k=0}^{\infty}c_kx^k=1+x+x^2+\dots=\frac{1}{1-x}$
> 2. We have $b_k = \sum_{i=0}^{k}a_i = \sum_{i=0}^{k}a_ic_{k-i}$.
> 3. The generating function of the sequence $b_k$ is $B(x) = \sum_{k=0}^{\infty}b_kx^k = \sum_{k=0}^{\infty}(\sum_{i=0}^{k}a_ic_{k-i})x^k = A(x)C(x) = \frac{A(x)}{1-x}$.
>
> ---
>
> [Example] What is the generating function for the sequence  $a_k = \sum_{i=1}^{k}i^2$ ?
>
> - Solution:
>
> 1. 对于$b_k = 1$,其生成函数为$B(x)=\sum_{k=0}^{\infty}b_kx^k=1+x+x^2+\dots=\frac{1}{1-x}$
> 2. 对于$c_k = k$,其生成函数为$C(x)=x*\sum_{k=0}^{\infty}kx^{k-1}=x*B'(x)=x*\frac{1}{(1-x)^2}=\frac{x}{(1-x)^2}$
> 3. 对于$d_k = k^2$,其生成函数为$D(x)=x*\sum_{k=0}^{\infty}k^2x^{k-1}=x*C'(x)=x*\frac{1+x}{(1-x)^3}=\frac{x+x^2}{(1-x)^3}$
> 4. 根据上一个例子，$a_k = \sum_{i=1}^{k}i^2 = \sum_{i=1}^{k}d_i = \sum_{i=1}^{k}d_ic_{k-i}$.
> 5. 所以$a_k$的生成函数为$A(x) = \sum_{k=0}^{\infty}a_kx^k = \sum_{k=0}^{\infty}(\sum_{i=1}^{k}d_ic_{k-i})x^k = D(x)C(x) = \frac{x+x^2}{(1-x)^4}$.
>
> ---
>
> [Example] Let $f(x)=\frac{1}{1-4x^2}$, find the cofficient $a_0,a_1,a_2,\dots$ of the power series expansion of $f(x)=\sum_{n=0}^{\infty}a_nx^n$.
>
> - Solution:
>
> 1. $f(x)=\frac{1}{1-4x^2}=\frac{1}{(1-2x)(1+2x)}=\frac{1}{2}(\frac{1}{1-2x}+\frac{1}{1+2x})$
> 2. $\frac{1}{1-2x}=\sum_{n=0}^{\infty}(2x)^n=1+2x+4x^2+\dots$对应的系数为$b_n=2^n$
> 3. $\frac{1}{1+2x}=\sum_{n=0}^{\infty}(-2x)^n=1-2x+4x^2-\dots$对应的系数为$c_n=(-2)^n$
> 4. 所以$f(x)=\frac{1}{2}(\frac{1}{1-2x}+\frac{1}{1+2x})=\frac{1}{2}(\sum_{n=0}^{\infty}2^nx^n+\sum_{n=0}^{\infty}(-2)^nx^n)=\sum_{n=0}^{\infty}a_nx^n$，其中$a_n=\frac{1}{2}(2^n+(-2)^n)$
>

### The extended Binomial coefficient

**Extended Binomial Coefficient** - Let $u$ be a real number and $k$ a nonnegative integer. The extended binomial coefficient $\binom{u}{k}$ is defined by

$$\binom{u}{k} = \begin{cases} \frac{u(u-1)\dots(u-k+1)}{k!} & \text{if } k > 0 \\ 1 & \text{if } k = 0 \end{cases}$$

> [Example]
>
> $$\binom{\frac{1}{2}}{3} = \frac{\frac{1}{2}(\frac{1}{2}-1)(\frac{1}{2}-2)}{3!} = \frac{1}{16}$$
>
> $\binom{-n}{k}=\frac{(-n)(-n-1)\dots(-n-k+1)}{k!}=\frac{(-1)^kn(n+1)\dots(n+k-1)}{k!}=(-1)^k\binom{n+k-1}{k}$

**The extended Binomial Theorem** - Let $u$ be a real number and $x$ a real number with $|x| < 1$. Then

$$(1+x)^u = \sum_{k=0}^{\infty}\binom{u}{k}x^k$$

> Find the generating functions for

$$(1+x)^{-n}~and~(1-x)^{-n}$$

, where $n$ is a positive integer.
>
> - Solution:
>
> 1. $(1+x)^{-n} = \sum_{k=0}^{\infty}\binom{-n}{k}x^k = \sum_{k=0}^{\infty}(-1)^k\binom{n+k-1}{k}x^k$
>
> 2. $(1-x)^{-n} = \sum_{k=0}^{\infty}\binom{-n}{k}(-x)^k = \sum_{k=0}^{\infty}(-1)^k\binom{n+k-1}{k}(-x)^k = \sum_{k=0}^{\infty}\binom{n+k-1}{k}x^k$

### Some Common Generating Functions

| Sequence | Generating Function |
| :---: | :---: |
| $C(n,k)$ | $\sum_{k=0}^{\infty}C(n,k)x^k = (1+x)^n$ |
| $C(n,k)a^k$ | $\sum_{k=0}^{\infty}C(n,k)a^kx^k = (ax+1)^n$ |
| $C(n,k/r)~if~r整除k$;0,otherwise | $\sum_{k=0}^{\infty}C(n,k/r)x^k = (1+x^r)^n$ |
| $1,1,1,\dots,1$ | $\sum_{k=0}^{n}x^k = \frac{1-x^{n+1}}{1-x}$ |
| $1,1,1,\dots$ | $\sum_{k=0}^{\infty}x^k = \frac{1}{1-x}$ |
| $a^k$ | $\sum_{k=0}^{\infty}a^kx^k = \frac{1}{1-ax}$ |
| $1~if~r整除k$;0,otherwise | $\sum_{k=0}^{\infty}x^{kr} = \frac{1}{1-x^r}$ |
| $k+1$ | $\sum_{k=0}^{\infty}(k+1)x^k = \frac{1}{(1-x)^2}$ |
| $C(n+k-1,k)$ | $\sum_{k=0}^{\infty}C(n+k-1,k)x^k = \frac{1}{(1-x)^n}$ |
| $(-1)^kC(n+k-1,k)$ | $\sum_{k=0}^{\infty}(-1)^kC(n+k-1,k)x^k = \frac{1}{(1+x)^n}$ |
| $a^kC(n+k-1,k)$ | $\sum_{k=0}^{\infty}C(n+k-1,k)a^kx^k = \frac{1}{(1-ax)^n}$ |
| $1/k!$ | $\sum_{k=0}^{\infty}\frac{1}{k!}x^k = e^x$ |
| $\frac{(-1)^{k+1}}{k}$ | $\sum_{k=1}^{\infty}\frac{(-1)^{k+1}}{k}x^k = ln(1+x)$ |

### 用Generation Functions解决计数问题

> [Example] Find the number of solutions of $e_1 + e_2 + e_3 = 17$, where $e_1, e_2, e_3$ are nonnegative integers with $2\leq e_1 \leq 5,3\leq e_2 \leq 6, 4\leq e_3 \leq 7$.
>
> - Solution:
>
> 1. 令$E_1(x)=x^2+x^3+x^4+x^5$，$E_2(x)=x^3+x^4+x^5+x^6$，$E_3(x)=x^4+x^5+x^6+x^7$，则$E_1(x)E_2(x)E_3(x)$的$x^{17}$的系数即为所求。
>
>---
>
> [Example] Use generating functions to find the number of r-combinations from a set with $n$ elements when repetition of elements is allowed.
>
> - Solution:
>
> 1. 令$G(x)=(1+x+x^2+\dots)^n=\frac{1}{(1-x)^n}$，则$G(x)$的$x^r$的系数即为所求。
> 2. $\frac{1}{(1-x)^n}=\sum_{k=0}^{\infty}C(n+k-1,k)x^k$，则$G(x)$的$x^r$的系数为$C(n+r-1,r)$。
>
> ---
>
> [Example] Determine the number of ways to insert tokens worth $\$1$,$\$2$ and $\$5$ into a vending machine to pay for an item that costs $r$ dollars in both the case when the order in which the tokens are inserted does not matter and when the order does matter.
>
> - Solution:
>
> 1. Do not matter: $G(x)=(1+x+x^2+\dots)(1+x^2+x^4+\dots)(1+x^5+x^{10}+\dots)=\frac{1}{(1-x)(1-x^2)(1-x^5)}$, the coefficient of $x^r$ is the solution.
> 2. Matter: $G(x)=(x+x^2+x^5)^n$, the coefficient of $x^r$ is the solution for exactly $n$ tokens. So the final function is $1+(x+x^2+x^5)+(x+x^2+x^5)^2+\dots=\frac{1}{1-(x+x^2+x^5)}$. The coefficient of $x^r$ is the solution.

### 用Generation Functions解决递归关系

> [Example]  Use generating functions to solve the recurrence relation $a_n = 2a_{n-1}+3a_{n-2}+4^n+6$ with initial conditions $a_0 = 20$ and $a_1 = 60$.
>
> - Solution:
>
> 1. 令$A(x)=\sum_{n=0}^{\infty}a_nx^n$，则
>
> $$\sum_{n=2}^{\infty}a_nx^n - 2\sum_{n=2}^{\infty}a_{n-1}x^{n} - 3\sum_{n=2}^{\infty}a_{n-2}x^{n} = \sum_{n=2}^{\infty}4^nx^n + \sum_{n=2}^{\infty}6x^n$$
>
> $$\therefore (A(x)-a_0-a_1x)-2x(A(x)-a_0)-3x^2A(x)$$
>
> $$=(\frac{1}{1-4x}-1-4x)+6(\frac{1}{1-x}-1-x)$$
>
> $$\therefore A(x)=\frac{20-80x+2x^2+40x^3}{(1-4x)(1-x)(1+x)(1-3x)}=\frac{16/5}{1-4x}+\frac{-3/2}{1-x}+\frac{31/20}{1+x}+\frac{67/4}{1-3x}$$
>
> $$\therefore a_n=\frac{16}{5}\times 4^n-\frac{3}{2}+\frac{31}{20}\times (-1)^n+\frac{67}{4}\times 3^n$$

## Section 4 - Inclusion-Exclusion and Applications

> How many permutations of the $26$ letters of the English alphabet do not contain any of the strings $fish$, $rat$ or $bird$?
>
> - Solution:
>
> U: the set of all permutations of the $26$ letters .
>
> A: the set of all permutations of the $26$ letters containing $fish$.
>
> B: the set of all permutations of the $26$ letters containing $rat$.
>
> C: the set of all permutations of the $26$ letters containing $bird$.
>
> $~~~~|\overline{A}\cap\overline{B}\cap\overline{C}|$
>
> $=|U|-|A\cup B\cup C|$
>
> $=|U|-(|A|+|B|+|C|-|A\cap B|-|A\cap C|-|B\cap C|+|A\cap B\cap C|) $
>
> $= 26!-(23!+24!+23!-21!-0-0-0)$

**An alternate form of inclusion-exclusion** - 记$N(P_1P_2\dots P_n)$为包含性质$P_1,P_2,\dots,P_n$的元素个数；记$N(P_1'P_2'\dots P_n')$为不包含性质$P_1,P_2,\dots,P_n$的元素个数，则

$$N(P_1'P_2'\dots P_n')=N-\sum_{1 \leq i \leq n}N(P_i)+\sum_{1 \leq i < j \leq n}N(P_iP_j)-\dots+(-1)^nN(P_1P_2\dots P_n)$$

**The number of onto functions**: Let $m$ and $n$ be positive integers with $m \geq n$. Then,there are

$$n^m - C(n,1)(n-1)^m + C(n,2)(n-2)^m - \dots + (-1)^{n-1}C(n,n-1)1^m$$

onto functions from a set with $m$ elements to a set with $n$ elements.
> 也就是$S(m,n)n!$，其中$S(m,n)$为第二类Stirling数。

### Derangements 错排

**Derangement** - The number of derangements of a set with n elements is

$$D_n = n!(1-\frac{1}{1!}+\frac{1}{2!}-\frac{1}{3!}+\dots+(-1)^n\frac{1}{n!})$$

> $D_n = N(P_1'P_2'\dots P_n')$
>
> $ = N - \sum_{1 \leq i \leq n}N(P_i) + \sum_{1 \leq i < j \leq n}N(P_iP_j) - \dots + (-1)^nN(P_1P_2\dots P_n)$
>
> $ = n! - C(n,1)(n-1)! + C(n,2)(n-2)! - \dots + (-1)^nC(n,n-1)0!$
>
> $ = n!-\frac{n!}{1!(n-1)!}\times (n-1)!+\frac{n!}{2!(n-2)!}\times (n-2)!-\dots+(-1)^n\frac{n!}{n!(n-n)!}\times (n-n)!$
>
> $\therefore D_n = n!(1-\frac{1}{1!}+\frac{1}{2!}-\frac{1}{3!}+\dots+(-1)^n\frac{1}{n!})$
