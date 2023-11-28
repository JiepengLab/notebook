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