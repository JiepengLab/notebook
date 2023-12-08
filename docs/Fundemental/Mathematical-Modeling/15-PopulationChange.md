# Model 15 种群数量变化模型

!!! warning ""
   - [ ] TODO

## 指数增长模型

我们给出假设：

- 环境承载容量无限，所有个体独立生活，彼此间不存在竞争
- 种群处于封闭（closed）状态，不存在迁入（immigration）和迁出（emigration）
- 记人均出生/死亡/增长率为：$b, \mu, r=b-\mu$
   - 存在常数 $b$ 和 $\mu$，对任意 $t$ ，在自 $t$ 至 $t+\Delta t $内，出生的个体数量为 $bx(t)\Delta t$，死亡的个体数量为 $\mu x(t)\Delta t$
  
所以

$$x(t+\Delta t)-x(t)=(b-\mu)x(t)\Delta t$$

即

$$\frac{x(t+\Delta t)-x(t)}{\Delta t}=rx(t) \Rightarrow \frac{dx}{dt}=rx$$

所以

$$ x(t) = x_0e^{rt}$$

指数增长模型不适于描述较长时期的人口演变过程，但某地一个较短时间内的人口统计数据可能符合指数增长模型.

## Logistic模型

种群人均增长率仅与种群数量有关，且是种群数量的递减函数：

$$\frac{dx}{dt}=rx\left(1-\frac{x}{K}\right)$$

其中 $K$ 为环境承载量，$r$ 为内禀增长率，$x$ 为种群数量

所以

$$x(t)=\frac{Kx_0}{x_0+(K-x_0)e^{-rt}}$$

### 性质

![Alt text](images/image-63.png){width=80%}

- 当 $0<x(0)<K$ 时，种群数量随时间单调递增；当 $x_0>K$ 时，种群数量随时间单调递减；当 $x_0=K$ 时，种群数量保持不变。
- $x(t)$ 在 $t=\frac{1}{2}K$ 时有拐点。
- 当 $r<0$ 时，种群数量随时间单调递减至 $0$；当 $r>0$ 时，种群数量随时间单调递增至 $K$；当 $r=0$ 时，种群数量保持不变。

## 小总结

多数情况下，指数模型与 Logistic 模型并不是基于生物学机理，而是一种经验模型模型及其参数应根据实际数据进行估计和检验

除此之外，还有很多别的模型，如

$$
\begin{aligned}
&\frac{dx}{dt} =rx\ln\frac Kx  \\
& \begin{aligned}\frac{dx}{dt}&=rx\frac{K-x}{K+ax}\end{aligned}  \\
&\frac{dx}{dt}=rx\Bigg(1-\Bigg(\frac{x}{K}\Bigg)^\theta\Bigg) \\
&\frac{dx}{dt}=\left(re^{1-\left(\frac xK\right)}-d\right)x
\end{aligned}
$$

## 自洽系统

对一阶常微分方程 $x'(t)=f(x)$，若 $f(x)$ 不显含变量 $t$，则称该方程为**自洽系统（autonomous system）**。

满足 $f(x_\infty)=0$ 的 $x_\infty$ 称为**平衡点（equilibrium point）**。

对一阶常微分方程 $x'(t)=f(x)$ ，或者 $x(t)$ 无界，或者 $\lim\limits_{t\to\infty}x(t)=x_{\infty}$。但不是所有平衡点均为某个非零解的极限

可用线性化（linearization）方法研究平衡点附近解的性态

## 随机模型

记 $x(t)$ 为 $t$ 时刻一种群个体数量

- $x(t)$ 是一个取非负整数值的随机变量，$\{x(t),t\geq0\}$为一随机过程
- $x(t)$为连续时间齐次 Markov 链

    - $P\{x(t+s)=j\mid x(s)=i,x(u)=x_u,0\leq u<s\}=P\{x(t+s)=j\mid x(s)=i\}$ 
    - $P\{x(t+s)=j\mid x(s)=i\}$值与 s 无关，记其为 $p_{ij}(t)$

- 设 $x(t)=n$ , 种群在$(t,t+\Delta t)$ 时段内
    - 出生 1 人的概率为 $\lambda_n\Delta t+o\left(\Delta t\right)$
    - 死亡 1 人的概率为 $\mu_n\Delta t+o\left(\Delta t\right)$
    - 出生和死亡事件总发生两次或以上的概率很小，忽略不计

### 生灭过程

生灭过程

离散状态空间连续时间齐次Markov链称为**生灭过程**(birth-death process),若对充分小的 $\Delta t$ ,

!!! note ""
    $p_{i,j}$表示在$\Delta t$时间内，从状态 $i$ 转移到状态 $j$ 的概率

$\begin{cases}p_{i,i+1}(\Delta t)=\lambda_i\Delta t+o(\Delta t),\quad\lambda_i\geq0,i\geq0\\p_{i,i-1}(\Delta t)=\mu_i\Delta t+o(\Delta t),\quad\mu_i\geq0,i\geq1
\\p_{i,i}\left(\Delta t\right)=1-(\lambda_i+\mu_i)\Delta t+o(\Delta t)\end{cases}\Rightarrow\sum\limits_{|j-i|\geq2}p_{ij}(\Delta t)=o(\Delta t)$ 

- 纯生过程 (pure birth process) : $\mu_i=0,i\geq0$ 
- 纯灭过程 (pure death process) : $\lambda_i=0,i\geq0$ 
- Poisson过程： $\mu_i=0,i\geq0$ , $\lambda_i=\lambda,i\geq0$

## 家族消亡问题

假设：

![Alt text](images/image-73.png)

我们有

![Alt text](images/image-74.png)