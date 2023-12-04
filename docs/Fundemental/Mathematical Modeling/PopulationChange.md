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

当 $0<x(0)<K$ 时，种群数量随时间单调递增；当 $x_0>K$ 时，种群数量随时间单调递减；当 $x_0=K$ 时，种群数量保持不变。

$x(t)$ 在 $t=\frac{1}{2}K$ 时有拐点。

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

## 