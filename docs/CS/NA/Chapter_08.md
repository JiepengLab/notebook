# Chapter 8 逼近论 | Approximation Theory

!!! note ""
    逼近和插值的区别在于，插值是要求通过所有的数据点，而逼近则是通过部分数据点，但是要求逼近的函数和原函数的误差尽可能小。

## 8.1 Discrete Least Squares Approximation | 离散最小二乘逼近

### 误差表达

设 $p(x)$ 是逼近函数，$y_{i}$ 是给定的 $n$ 个数据点，那么逼近误差的三种表达方式如下：

#### Minimax problem

$$E_\infty(p) = \max \{|y_i - f(x)|\}$$

这用初等技术是解决不了的

#### Absolute deviation

$$E_1(p) = \sum\limits_{i=1}^{n} |y_i - f(x)|$$

困难在于绝对值函数在零点不可微，可能无法求解多元函数的最小值。

#### Least squares

$$E_2(p) = \sum\limits_{i=1}^{n} (y_i - f(x))^2$$

此即为**最小二乘**的误差表达，也是最常用的逼近方法。

我们的目标是找到一个 $p(x)$，使得 $E_2(p)$ 最小。

### 离散最小二乘逼近

定义： $P_n(x)$ 是 $m$ 个数据点的**离散最小二乘逼近**，如果 $P_n(x)$ 是 $n$ 次多项式，且满足

$$
p=\arg \min _{p \in \mathbb{P}_{n}} \sum\limits_{i=1}^{m}\left(y_{i}-p\left(x_{i}\right)\right)^{2}$$

其中 $\mathbb{P}_{n}$ 是 $n$ 次多项式的集合，$n$ 应远远小于 $m$，如果 $n=m-1$，其即为 lagrange 插值。

#### 离散最小二乘逼近的解

设 $P_n(x) = a_0 + a_1 x + \cdots + a_n x^n= \sum\limits_{i=0}^{n} a_i x^i$。

$$
\begin{aligned}
E_2&=\sum\limits_{i=1}^{m}\left(y_{i}-P_n\left(x_{i}\right)\right)^{2} \\
\end{aligned}
$$

为了使 $E_2$ 最小，则其必要条件是

$$
\frac{\partial E_{2}}{\partial a_{k}}=0, \quad k=0,1, \cdots, n
$$

即

$$
\begin{aligned}
\frac{\partial E_{2}}{\partial a_{k}}&=2 \sum\limits_{i=1}^{m}\left(P_{n}\left(x_{i}\right)-y_{i}\right) \frac{\partial P_{n}\left(x_{i}\right)}{\partial a_{k}}\\
&=2 \sum\limits_{i=1}^{m}\left(\sum _{j=0}^{n} a_j x_i^j - y_i\right) x_i^k\\
&=2 \left(\sum\limits_{j=0}^{n} (a_j \sum\limits_{i=1}^{m} x_i^{j+k}) -  \sum\limits_{i=1}^{m} y_i x_i^k \right)= 0
\end{aligned}
$$

即

$$
\sum\limits_{j=0}^{n} (a_{j} \sum\limits_{i=1}^{m} x_{i}^{j+k})=\sum\limits_{i=1}^{m} y_{i} x_{i}^{k}, \quad k=0,1, \cdots, n
$$

也就是

$$
\begin{bmatrix}
\sum\limits_{i=1}^{m} x_{i}^{0} & \sum\limits_{i=1}^{m} x_{i}^{1} & \cdots & \sum\limits_{i=1}^{m} x_{i}^{n} \\
\sum\limits_{i=1}^{m} x_{i}^{1} & \sum\limits_{i=1}^{m} x_{i}^{2} & \cdots & \sum\limits_{i=1}^{m} x_{i}^{n+1} \\
\vdots & \vdots & \ddots & \vdots \\
\sum\limits_{i=1}^{m} x_{i}^{n} & \sum\limits_{i=1}^{m} x_{i}^{n+1} & \cdots & \sum\limits_{i=1}^{m} x_{i}^{2 n}
\end{bmatrix}
\begin{bmatrix}
a_0\\
a_1\\
\vdots\\
a_n
\end{bmatrix}=
\begin{bmatrix}
\sum\limits_{i=1}^{m} y_{i} x_{i}^{0}\\
\sum\limits_{i=1}^{m} y_{i} x_{i}^{1}\\
\vdots\\
\sum\limits_{i=1}^{m} y_{i} x_{i}^{n}
\end{bmatrix}
$$

##### $P(x)$ 线性

即 $n=1$ 。此时，$P_1(x) = a_0 + a_1 x$，有

$$
\begin{bmatrix}
m & \sum\limits_{i=1}^{m} x_{i} \\
\sum\limits_{i=1}^{m} x_{i} & \sum\limits_{i=1}^{m} x_{i}^{2}
\end{bmatrix}
\begin{bmatrix}
a_0\\
a_1
\end{bmatrix}=
\begin{bmatrix}
\sum\limits_{i=1}^{m} y_{i}\\
\sum\limits_{i=1}^{m} y_{i} x_{i}
\end{bmatrix}
$$

所以

$$
\begin{cases}
a_0 = \frac{\sum\limits_{i=1}^{m} x_{i}^{2} \sum\limits_{i=1}^{m} y_{i}-\sum\limits_{i=1}^{m} x_{i} \sum\limits_{i=1}^{m} x_{i} y_{i}}{m \sum\limits_{i=1}^{m} x_{i}^{2}-\left(\sum\limits_{i=1}^{m} x_{i}\right)^{2}}\\
a_1 = \frac{m \sum\limits_{i=1}^{m} x_{i} y_{i}-\sum\limits_{i=1}^{m} x_{i} \sum\limits_{i=1}^{m} y_{i}}{m \sum\limits_{i=1}^{m} x_{i}^{2}-\left(\sum\limits_{i=1}^{m} x_{i}\right)^{2}}
\end{cases}
$$

##### $P(x)=\frac{x}{ax+b}$

令 $Y_i = \frac{1}{y_i}$，$X_i = \frac{1}{x_i}$，则可化为

$$
Y_i = a  + bX_i
$$

线性最小二乘即可

##### $P(x)=a e^{-b/x}$

令 $Y_i = \ln y_i$，$X_i = \frac{1}{x_i}$，则可化为

$$
Y_i = \ln a - bX_i
$$

线性最小二乘即可。

### 8.2 Orthogonal Polynomials and Least Squares Approximation | 正交多项式与最小二乘逼近

!!! note ""
    刚刚是离散化的最小二乘逼近，现在是连续的最小二乘逼近。

给定定义在 $[a,b]$ 上的函数 $f(x)$，我们希望找到一个 简单的函数 $p(x)$ 来逼近 $f(x)$，使得 

$$
E = \int_{a}^{b}\left|f(x)-p(x)\right|^{2}  d x
$$

最小。

**广义多项式(Generalized Polynomial)**：用线性无关的函数 $\phi_0(x), \phi_1(x), \cdots, \phi_n(x)$ 的线性组合 $P(x)=\sum\limits_{i=0}^{n} a_{i} \phi_{i}(x)$ 来逼近 $f(x)$，这里的 $P(x)$ 称为广义多项式。

!!! note ""
    - Trigonometric  polynomial: $\phi_{i}(x)=\cos (i x)$ or $\sin (i x)$
    - Exponential polynomial: $\phi_{i}(x)=e^{k_i x}, k_i \neq k_j$
    - 记 $\Pi_n(x)$ 为 阶数最多为 $n$ 的多项式的集合，$\Pi_n(x)$ 是一个线性空间，$\Pi_n(x)$ 的基为 $\{1, x, x^2, \cdots, x^n\}$，可以拿来做广义多项式的基。

#### Weight Function | 权函数

离散的情况下，为了在某些点上分配不同程度的重要性，我们在计算离散最小二乘逼近的误差表达式时附上权重：

$$
E = \sum\limits_{i=1}^{m} w_i (y_i - p(x_i))^2
$$

连续的情况下，我们也可以引入权重函数 $w(x)$，使得

$$
E = \int_{a}^{b} w(x) \left|f(x)-p(x)\right|^{2}  d x
$$

#### Inner Product and Norm | 内积与范数

我们定义内积为

$$
\langle f, g\rangle=
\begin{cases}
\sum\limits_{i=1}^{m} w_i f(x_i) g(x_i) & \text{离散}\\
\int_{a}^{b} w(x) f(x) g(x) d x & \text{连续}
\end{cases}
$$

如果 $\langle f, g\rangle = 0$，则称 $f$ 和 $g$ 正交。

我们定义范数为

$$
\|f\|=\sqrt{\langle f, f\rangle}
$$  

所以我们可以把误差表达式写成

$$
E = \langle f-p, f-p\rangle=\|f-p\|^2
$$

#### 寻找多项式的系数

设 $P(x)=a_{0} \phi_{0}(x)+a_{1} \phi_{1}(x)+\cdots+a_{n} \phi_{n}(x)$，与离散的情况类似，我们要使得 $E$ 最小，即

$$
\begin{aligned}
\frac{\partial E}{\partial a_{k}}&=0\\
\frac{\partial (\int_{a}^{b} w(x) \left|\sum\limits_{i=0}^{n} a_{i} \phi_{i}(x)-f(x)\right|^{2} ) d x}{\partial a_{k}}&=0\\
\frac{\partial (\int_{a}^{b} w(x) ((\sum\limits_{i=0}^{n} a_{i} \phi_{i}(x))^2-2f(x)\sum\limits_{i=0}^{n} a_{i} \phi_{i}(x)+f(x)^2)  )d x}{\partial a_{k}}&=0\\
\int_{a}^{b} w(x) (2\phi_{k}(x)\sum\limits_{i=0}^{n} a_{i} \phi_{i}(x)-2f(x)\phi_{k}(x)) d x&=0\\
\int_{a}^{b} w(x) \phi_{k}(x)\sum\limits_{i=0}^{n} a_{i} \phi_{i}(x) d x&=\int_{a}^{b} w(x)\phi_{k}(x)f(x) d x\\
\sum\limits_{i=0}^{n} a_{i} \int_{a}^{b} w(x) \phi_{k}(x)\phi_{i}(x) d x&=\int_{a}^{b} w(x) \phi_{k}(x)f(x) d x\\
\sum\limits_{i=0}^{n} a_{i} \langle \phi_{k}, \phi_{i}\rangle&=\langle \phi_{k},f\rangle\\
\end{aligned}
$$

写成矩阵形式即为

$$
\begin{bmatrix}
\langle \phi_{0}, \phi_{0}\rangle & \langle \phi_{0}, \phi_{1}\rangle & \cdots & \langle \phi_{0}, \phi_{n}\rangle \\
\langle \phi_{1}, \phi_{0}\rangle & \langle \phi_{1}, \phi_{1}\rangle & \cdots & \langle \phi_{1}, \phi_{n}\rangle \\
\vdots & \vdots & \ddots & \vdots \\
\langle \phi_{n}, \phi_{0}\rangle & \langle \phi_{n}, \phi_{1}\rangle & \cdots & \langle \phi_{n}, \phi_{n}\rangle
\end{bmatrix}
\begin{bmatrix}
a_0\\
a_1\\
\vdots\\
a_n
\end{bmatrix}=
\begin{bmatrix}
\langle \phi_{0},f\rangle\\
\langle \phi_{1},f\rangle\\
\vdots\\
\langle \phi_{n},f\rangle
\end{bmatrix}
$$

!!! note ""
    左边的矩阵为对称矩阵。

!!! note "离散例子"

    可以证明，离散时的式子也是这样的。

    ![Alt text](images/image-46.png)

#### 构造正交多项式

由 $H_{ij}^{(n)}=\frac{1}{i+j-1}$ 定义的 $n\times n$ 的 Hilbert 矩阵是一个病态矩阵。在求解中往往因为舍入误差而导致结果不准确。

为了解决这个问题，我们可以通过正交化的方法来构造正交多项式，也就是让前文中提到的矩阵变成对角矩阵。这样就不需要进行求逆了。

此时的系数可以直接通过

$$
a_k = \frac{\langle \phi_{k},f\rangle}{\langle \phi_{k}, \phi_{k}\rangle}
$$

来计算。