# Chapter 3 插值和多项式逼近 | Interpolation and Polynomial Approximation

## 3.1 插值和 Lagrange 多项式 | Interpolation and Lagrange Polynomials

### 构造 Lagrange 多项式

拉格朗日插值就是构造一个次数至多为 $n$ 次的多项式使它通过 $n+1$ 个给定的点，这个多项式就是拉格朗日多项式。

!!! note  " $n = 1$ "

    构造$P(x)=a_0+a_1x$，使得$P(x_0)=y_0$，$P(x_1)=y_1$。
    
    则$P(x)=y_0+\frac{y_1-y_0}{x_1-x_0}(x-x_0)=\frac{x-x_1}{x_0-x_1}y_0+\frac{x-x_0}{x_1-x_0}y_1$。 

    其中$\frac{x-x_1}{x_0-x_1}$和$\frac{x-x_0}{x_1-x_0}$分别记作$L_{1,0}(x)$和$L_{1,1}(x)$（第一个下标即为$n$的值，第二个下标为样本点的序号），这称为拉格朗日基函数（Lagrange Basis）。

!!! note ""
    可以知道，拉格朗日基函数总是满足Kronecker Delta函数$\delta_{ij}$。

    $$\delta_{ij} = \begin{cases} 1, & i = j \\ 0, & i \neq j \end{cases}$$

推广到$n$次插值，构造$P(x)=a_0+a_1x+\cdots+a_nx^n$，使得$P(x_i)=y_i$，$i=0,1,\cdots,n$。就是要找到 $L_{n,i}(x)$ 使得 $L_{n,i}(x_j) = \delta_{ij}$

分析可知，这里的$L_{n,i}(x)$有 $n$ 个根，分别为$x_0,x_1,\cdots,x_{i-1},x_{i+1},\cdots,x_n$。所以可以构造出

$$L_{n,i}(x)=C(x-x_0)(x-x_1)\cdots(x-x_{i-1})(x-x_{i+1})\cdots(x-x_n)$$

又因为$L_{n,i}(x_i)=1$，所以

$$L_{n,i}(x)=\frac{(x-x_0)(x-x_1)\cdots(x-x_{i-1})(x-x_{i+1})\cdots(x-x_n)}{(x_i-x_0)(x_i-x_1)\cdots(x_i-x_{i-1})(x_i-x_{i+1})\cdots(x_i-x_n)}$$

即

$$L_{n,i}(x)=\prod\limits_{j=0,j\neq i}^n\frac{x-x_j}{x_i-x_j}$$

于是我们根据拉格朗日基函数构造出了 $n$ 次拉格朗日插值多项式

$$P_n(x)=\sum\limits_{i=0}^nL_{n,i}(x)y_i$$

### Lagrange 多项式的唯一性

对 $n$ 个不同的点 ， $n$ 次拉格朗日插值多项式是唯一的

***证明：***

如果不唯一，假设存在另一个多项式$Q_n(x)$，使得$Q_n(x_i)=y_i$，$i=0,1,\cdots,n$，且$Q_n(x)\neq P_n(x)$。

则$R_n(x)=P_n(x)-Q_n(x)$是一个次数不超过$n$的多项式，且$R_n(x_i)=0$，$i=0,1,\cdots,n$。

由于$R_n(x)$的次数不超过$n$，$n$次多项式不可能有 $n+1$ 个解，所以$R_n(x)=0$，即$P_n(x)=Q_n(x)$，与假设矛盾。

!!! note ""

    如果 对 $n$ 个点 运用 超过$n$ 次的拉格朗日插值多项式，那么得到的多项式就不唯一了。

    例如 $P(x)=L_n\left(x\right)+p(x)\prod\limits_{i=0}^n\left(x-x_i\right)$

### 拉格朗日逼近的余项

假定$a\leq x_0<x_1<\cdots<x_n\leq b$，$f\in C[a,b]$，$P_n(x)$是$f(x)$在$x_0,x_1,\cdots,x_n$上的拉格朗日插值多项式，则对任意$x\in[a,b]$，存在$\xi(x)\in(a,b)$，使得

$$f(x)-P_n(x)=\frac{f^{(n+1)}(\xi(x))}{(n+1)!}\prod\limits_{i=0}^n(x-x_i)$$

!!! note "证明"

    记$R_n(x)=f(x)-P_n(x)$，则$R_n(x)$是一个次数不超过$n$的多项式，且$R_n(x_i)=0$，$i=0,1,\cdots,n$。所以$R_n(x)$可记作$C(x)\prod\limits_{i=0}^n(x-x_i)$

    固定一个点$x$ ($x\neq x_i$) 时，记$g(t)=R_n(t)-C(x)\prod\limits_{i=0}^n(t-x_i)$，则$g(x)=0$，$g(x_i)=0$，$i=0,1,\cdots,n$，所以$g(t)$存在$n+2$个不同的零点
    
    根据推广的Rolle定理，存在$\xi(x)\in(a,b)$，使得$g^{(n+1)}(\xi(x))=0$，即
    
    $$
    \begin{aligned}
    0=g^{(n+1)}(\xi(x))&=(R_n(\xi(x))-C(x)\prod\limits_{i=0}^n(\xi(x)-x_i))^{(n+1)}\\&=(f(\xi(x))-P_n(\xi(x))-C(x)\prod\limits_{i=0}^n(t-x_i))^{(n+1)}\\
    &=f^{(n+1)}(\xi(x))-C(x)(n+1)! \quad //因为P_n(x)是n次多项式，所以P_n^{(n+1)}(x)=0\\
    \end{aligned}
    $$
    
    所以$C(x)=\frac{f^{(n+1)}(\xi(x))}{(n+1)!}$，所以$R_n(x)=\frac{f^{(n+1)}(\xi(x))}{(n+1)!}\prod\limits_{i=0}^n(x-x_i)$

因为这里的$f^{(n+1)}(\xi(x))$是不知道的，所以我们经常用$f^{(n+1)}(x)$的上界来估计余项。

!!! note ""

    分析余项可知，对于小于等于 $n$ 次的多项式 $f$ ，经过$n$次拉格朗日插值得到的余项为0，得到的多项式就是 $f$ 本身

    !!! note ""
        这里限制了$f$为多项式

#### 例子 1

假设为 $x\in [0,1]$ 的函数 $f(x)=e^x$ 做一个表格。设表中每一项精确的位数是 $d\geq 8$，相邻 $x$ 值之差即步长为 $h$。为使线性插值（即一次Lagrange插值）的误差不超过 $10^{-6}$，$h$应该是多少？

***解：***

假设 $[0, 1]$ 被分成 $n$ 个等距的子区间 $[x_0, x_1], [x_1, x_2], \cdots, [x_{n-1} , x_n]$，$x$ 在区间 $[x_k, x_{k+1}]$ 中。则误差估计为

$$
\begin{aligned}
|f(x)-P_1(x)| &= |\frac{f''(\xi(x))}{2!}(x-x_k)(x-x_{k+1})| \\
&\leq |\frac{e^\xi}{2}(x-kh)(x-(k+1)h)| \\
&\leq \frac{e}{2}\cdot \frac{h^2}{4} \\
&\leq 10^{-6}
\end{aligned}
$$

所以 $h\leq 1.72\times 10^{-3}$。我们不妨取 $h=10^{-3}$，则 $n=1000$。

#### 例子 2

![Alt text](images/image-37.png)

!!! note ""

    给三个点，我们有两种方法来线性插值。往往，**内插(Intrapolation)** 会比 **外插(Extrapolation)** 更加准确。

![Alt text](images/image-38.png)

!!! note ""

    高次的拉格朗日插值一般会比低次的插值更加准确，但是这不一定总成立。

### Neville 迭代插值法

**记号说明：** 设 $f$ 在 $x_0,x_1,\cdots,x_n$ 上有定义，$m_1,m_2,\cdots,m_k$ 是 $k$ 个不同的整数，$0\leq m_i\leq n$，$i=1,2,\cdots,k$。记在这 $k$ 个点上与 $f(x)$ 相同的拉格朗日多项式为 $P_{m_1,m_2,\cdots,m_k}(x)$。

**定理：** 设 $f$ 在 $x_0,x_1,\cdots,x_n$ 上有定义，让 $x_i$ 和 $x_j$ 是这个集合中的两个不同的数。则

$$P(x)=\frac{(x-x_j)P_{0,1,...,j-1,j+1,...,k}(x)-(x-x_i)P_{0,1,...,i-1,i+1,...,k}(x)}{(x_i-x_j)}$$

描述了对 $f$ 在 $x_0,x_1,\cdots,x_k$ 这 $k+1$个点 上的 $k$ 次插值多项式。

**证明：**

对于任意 $0\leq r\leq k$，$r\neq i$ 和 $r\neq j$，分子上的两个插值多项式在 $x_r$ 处都等于 $f(x_r)$，所以 $P(x_r)=f(x_r)$。

分子上的第一个多项式在 $x_i$ 处等于 $f(x_i)$，而第二个多项式在 $x_i$ 处为0，所以 $P(x_i)=f(x_i)$。同理 $P(x_j)=f(x_j)$。

所以 $P(x)$ 在 $x_0,x_1,\cdots,x_k$ 上与 $f(x)$ 相同，因为 $P(x)$ 是 $k$ 次多项式，所以 $P(x)=P_{0,1,\cdots,k}(x)$。

#### 伪代码

![Alt text](images/image-39.png)

## 3.2 Divided Differences | 差分