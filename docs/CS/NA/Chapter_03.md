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

!!! example "五个点"
    ![Alt text](images/image-40.png)

**证明：**

对于任意 $0\leq r\leq k$，$r\neq i$ 和 $r\neq j$，分子上的两个插值多项式在 $x_r$ 处都等于 $f(x_r)$，所以 $P(x_r)=f(x_r)$。

分子上的第一个多项式在 $x_i$ 处等于 $f(x_i)$，而第二个多项式在 $x_i$ 处为0，所以 $P(x_i)=f(x_i)$。同理 $P(x_j)=f(x_j)$。

所以 $P(x)$ 在 $x_0,x_1,\cdots,x_k$ 上与 $f(x)$ 相同，因为 $P(x)$ 是 $k$ 次多项式，所以 $P(x)=P_{0,1,\cdots,k}(x)$。

#### 伪代码

![Alt text](images/image-39.png)

## 3.2 Divided Differences | 差商

### Newton's Interpolatory Divided-Difference formula | 差商型 Newton 插值多项式

设 $P_n(x)$ 是函数 $f$ 在点 $x_0, x_1,\cdots,x_n$ 上的拉格朗日多项式，$f$ 关于 $x_0,x_1,\cdots,x_n$ 的差商被用于将 $P_n(x)$ 表示为：

$$P_n(x)=f[x_0]+f[x_0,x_1](x-x_0)+\cdots+f[x_0,x_1,\cdots,x_n](x-x_0)(x-x_1)\cdots(x-x_{n-1})$$

其中 $f[x_0,x_1,\cdots,x_n]$ 是 $f$ 关于 $x_0,x_1,\cdots,x_n$ 的差商，通过代值可以得到

$$f[x_0]=f(x_0), f[x_0,x_1]=\frac{f(x_1)-f(x_2)}{x_1-x_0}, f[x_0,x_1,x_2]=\frac{f[x_1,x_2]-f[x_0,x_1]}{x_2-x_0}, \cdots$$

$$f[x_0,x_1,\cdots,x_n]=\frac{f[x_1,x_2,\cdots,x_n]-f[x_0,x_1,\cdots,x_{n-1}]}{x_n-x_0}$$

我们记 $f[x_0], f[x_0,x_1],\cdots,f[x_0,x_1,\cdots,x_n]$ 为 $f$ 关于 $x_0,x_1,\cdots,x_n$ 的 $0$ 阶差商，$1$ 阶差商，$\cdots$，$n$ 阶差商。

!!! note "六个点的三阶差商计算的例子"
    ![Alt text](images/image-41.png)

同时，我们称

$$P_n(x)=f[x_0]+f[x_0,x_1](x-x_0)+\cdots+f[x_0,x_1,\cdots,x_n](x-x_0)(x-x_1)\cdots(x-x_{n-1})$$

为**差商型 Newton 插值多项式**(Newton's Interpolatory Divided-Difference formula)。

#### 伪代码

![Alt text](images/image-42.png)

#### 差商和导数的关系

##### 一阶差分

将中值定理应用到 $f$ 在 $[x_0,x_1]$ 上，得到

$$f[x_0,x_1]=\frac{f(x_1)-f(x_0)}{x_1-x_0}=f'(\xi)$$

##### $n$ 阶差分

设 $f\in C^n[a,b]$ 且 $x_0,x_1,\cdots,x_n\in[a,b]$，则存在 $\xi\in(a,b)$，使得

$$f[x_0,x_1,\cdots,x_n]=\frac{f^{(n)}(\xi)}{n!}$$

***证明：***

设 $g(t)=f(t)-P_n(t)$，则 $g(x_i)=0$，$i=0,1,\cdots,n$。所以 $g(t)$ 在 $[x_0,x_n]$ 上有 $n+1$ 个零点，根据推广的 Rolle 定理，存在 $\xi\in(a,b)$，使得 $g^{(n)}(\xi)=0$，即

$$f^{(n)}(\xi)-P_n^{(n)}(\xi)=0$$

所以 $P_n^{(n)}(\xi)=f^{(n)}(\xi)$，因为

$$P_n^{(n)}(\xi)=n!f[x_0,x_1,\cdots,x_n]$$

所以

$$f[x_0,x_1,\cdots,x_n]=\frac{f^{(n)}(\xi)}{n!}$$

!!! note "PPT上采用的证明方法"
    ![Alt text](images/image-43.png)

#### 差分记号引入

如果每个点都连续等步长排列，记步长为$h$，令$x_i=x_0+ih$，则

引入**向前差分(forward difference)**记号：

$$\begin{aligned}
\Delta f(x_i)&=f(x_{i+1})-f(x_i)\\
\Delta^2 f(x_i)&=\Delta f(x_{i+1})-\Delta f(x_i)\\
\Delta^3 f(x_i)&=\Delta^2 f(x_{i+1})-\Delta^2 f(x_i)\\
\cdots
\end{aligned}$$

引入**向后差分(backward difference)**记号：

$$\begin{aligned}
\nabla f(x_i)&=f(x_i)-f(x_{i-1})\\
\nabla^2 f(x_i)&=\nabla f(x_i)-\nabla f(x_{i-1})\\
\nabla^3 f(x_i)&=\nabla^2 f(x_i)-\nabla^2 f(x_{i-1})\\
\cdots
\end{aligned}$$

引入**中心差分(central difference)**记号：

$$\delta^k f_i = \delta^{k-1}f_{i+\frac{1}{2}}-\delta^{k-1}f_{i-\frac{1}{2}}$$

其中

$$f_{i\pm\frac{1}{2}}=f(x_i\pm\frac{h}{2})$$

#### 等距下的向前差商公式

在等距情况下，向前差商的公式可表示为：

$$\begin{aligned}
P_n(x_s)=P_n(x_0+sh)&=f[x_0]+f[x_0,x_1]sh+\cdots+f[x_0,x_1,\cdots,x_n]s(s-1)\cdots(s-n+1)h^n\\
&=\sum\limits_{k=0}^n\begin{pmatrix}s\\k\end{pmatrix}k!h^kf[x_0,x_1,\cdots,x_k]
\end{aligned}$$

!!! note ""
    这里的 $\begin{pmatrix}s\\k\end{pmatrix}$ 是组合数，即 $\frac{s(s-1)\cdots(s-k+1)}{k!}$

#### 等距下的向前差分公式

由向前差分的记号可知道

$$
\begin{aligned}
f[x_{0},x_{1}]& =\frac{f(x_{1})-f(x_{0})}{x_{1}-x_{0}}=\frac{1}{h}\Delta f(x_{0})  \\
f[x_{0},x_{1},x_{2}]& =\frac{1}{2h}\left[\frac{\Delta f(x_{1})-\Delta f(x_{0})}{h}\right]=\frac{1}{2h^{2}}\Delta^{2}f(x_{0}), 
\end{aligned}
$$

由此可推广得出

$$f[x_{0},x_{1},\ldots,x_{k}]=\frac{1}{k!h^{k}}\Delta^{k}f(x_{0}).$$

所以

$$P_n(x_s)=\sum\limits_{k=0}^n\begin{pmatrix}s\\k\end{pmatrix}\Delta^{k}f(x_{0})$$

此即为向前差分的公式

#### 等距下的向后差商公式

重排插值节点再计算，此时：

$$\begin{aligned}P_n(x)=&f[x_n]+f[x_n,x_{n-1}](x-x_n)+f[x_n,x_{n-1},x_{n-2}](x-x_n)(x-x_{n-1})\\&+\cdots+f[x_n,\ldots,x_0](x-x_n)(x-x_{n-1})\cdots(x-x_1).\end{aligned}$$

在等距情况下，记 $x_s=x_n+sh=x_i+(s+n-i)h$，有

$$
\begin{aligned}
P_{n}(x_s) =&P_{n}(x_{n}+sh)  \\
=&f[x_{n}]+shf[x_{n},x_{n-1}]+s(s+1)h^{2}f[x_{n},x_{n-1},x_{n-2}]+\cdots  \\
&+s(s+1)\cdots(s+n-1)h^nf[x_n,\ldots,x_0]\\
=&\sum\limits_{k=0}^n(-1)^k\begin{pmatrix}-s\\k\end{pmatrix}k!h^kf[x_n,x_{n-1},\cdots,x_{n-k}]
\end{aligned}
$$

!!! note ""
    这里的 $\begin{pmatrix}-s\\k\end{pmatrix}$ 是组合数，即 $\frac{-s(-s-1)\cdots(-s-k+1)}{k!}=(-1)^k \cdot \frac{s(s+1)\cdots(s+k-1)}{k!}$

#### 等距下的向后差分公式

由向后差分的记号可知道

$$\begin{aligned}
f[x_n,x_{n-1}]&=\frac1h\nabla f(x_n),\\
f[x_n,x_{n-1},x_{n-2}]&=\frac1{2h^2}\nabla^2f(x_n),\\\end{aligned}$$

由此可推广得出

$$
\begin{aligned}
f[x_n,x_{n-1},\ldots,x_{n-k}]&=\frac1{k!h^k}\nabla^kf(x_n).\end{aligned}$$

所以

$$P_n(x_s)=\sum\limits_{k=0}^n(-1)^k\begin{pmatrix}-s\\k\end{pmatrix}\nabla^kf(x_n)$$

## 3.3 Hermite Interpolation | Hermite 插值

Hermite 插值的目标是找到一个插值多项式

### Osculating polynomials | 密切多项式

在 $x_0,x_1,\cdots,x_n$ 上逼近 $f\in C^m[a,b]$ 的**密切多项式(osculating polynomial)** 是具有以下性质的多项式 $P_n(x)$：

1. $P_n(x)$ 在 $x_0,x_1,\cdots,x_n$ 上与 $f(x)$ 相同
2. 对每个 $x_i$，$P_n(x)$ 和 $f(x)$ 在 $x_i$ 处的前 $m_i$ 阶导数相同
3. 因此，我们可以得到 $\sum\limits_{i=0}^n(m_i+1)=\sum\limits_{i=0}^nm_i+(n+1)$ 个条件，于是 $P_n(x)$ 是一个次数至多为 $\sum\limits_{i=0}^nm_i+n$ 的多项式

我们给出密切多项式的定义：

**定义：** 设 $x_0,x_1,\cdots,x_n$ 是 $[a,b]$ 上的 $n+1$ 个不同的点，$m_0,m_1,\cdots,m_n$ 是 $n+1$ 个非负整数，假设$ f\in C^m[a,b]$，其中 $m=\max\limits_{0\leq i\leq n}m_i$。逼近 $f$ 的**密切多项式** $P_n(x)$ 是使得下式成立的**最小次数**的多项式：

$$\frac{d^k}{dx^k}P_n(x_i)=\frac{d^k}{dx^k}f(x_i),\quad k=0,1,\cdots,m_i,\quad i=0,1,\cdots,n$$

!!! note ""

    1. 当 $n=0$ 时，逼近 $f$ 的密切多项式是 $f$ 在 $x_0$ 处的 $m_0$ 阶 Taylor 多项式。
    2. 当 $m_i=0$ 时，密切多项式就是对 $f$ 在 $x_0,x_1,\cdots,x_n$ 上插值的 $n$ 次拉格朗日插值多项式。

### Hermite 插值多项式

对密切多项式 $m_i=1$ 的情况，我们定义其为 Hermite 多项式。也就是说，多项式 $P(n)$ 和它的一阶导数 $P'(n)$ 在 $x_i$ 处与 $f$ 和 $f'$ 相同。

#### 特殊例子

假设 $x_0\neq x_1 \neq x_2$，给定 $f(x_0),f(x_1),f(x_2),f'(x_1)$，找到多项式使得$P(x_i)=f(x_i)$，$P'(x_1)=f'(x_1)$。

首先，其次数为3次，我们猜想其形式为

$$P(x)=\sum\limits_{i=0}^2f(x_i)h_i(x)+f'(x_1)\hat{h}_1(x)$$

其中$h_i(x_j)=\delta_i(x_j),h'_i(x_1)=0,\hat{h}_1(x_i)=0,\hat{h}'_1(x_1)=1$。

根据这个猜想，我们试图构造出$h_i(x)$和$\hat{h}_1(x)$。

首先，我们可以用拉格朗日同样的方法构造出$h_i(x)$，使得$h_i(x_j)=\delta_i(x_j)$，$h'_i(x_1)=0$，$i=0,1,2$。

对于$h_0(x)$，有根$x_1,x_2$，所以

$$h_0(x)=A(x-x_1)(x-x_2)$$

又因为$h'_0(x_0)=1$，所以

$$h_0(x)=\frac{(x-x_1)(x-x_2)}{(x_0-x_1)(x_0-x_2)}=L_{2,0}(x)$$

类似地，我们可以得到

$$h_1(x)=\frac{(x-x_0)(x-x_2)}{(x_1-x_0)(x_1-x_2)}=L_{2,1}(x)$$

$$h_2(x)=\frac{(x-x_0)(x-x_1)}{(x_2-x_0)(x_2-x_1)}=L_{2,2}(x)$$

然后，我们构造$\hat{h}_1(x)$，使得$\hat{h}_1(x_i)=0$，$\hat{h}'_1(x_1)=1$。对于$\hat{h}_1(x)$，有根$x_0,x_1,x_2$，所以

$$\hat{h}_1(x)=B(x-x_0)(x-x_1)(x-x_2)$$

又因为$\hat{h}'_1(x_1)=1$，所以可以通过计算得到 $B$ 的值。此处略。

#### 一般情况

假设 $x_0,x_1,\cdots,x_n$ 是 $[a,b]$ 上的 $n+1$ 个不同的点，$m_0,m_1,\cdots,m_n$ 是 $n+1$ 个非负整数。如果$ f\in C^1[a,b]$。则与 $f$ 和 $f'$ 在 $x_i$ 处相同的 Hermite 多项式 $P_n(x)$ 是次数不超过 $2n+1$ 的多项式，由下式给出

$$H_{2n+1}(x)=\sum\limits_{i=0}^nf(x_i)h_i(x)+\sum\limits_{i=0}^nf'(x_i)\hat{h}_i(x)$$