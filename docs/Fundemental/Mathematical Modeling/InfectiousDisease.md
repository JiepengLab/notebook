# Model 16 传染病模型

## 传染病的基本概念

传染病得以在某一人群中发生和传播，必须具备**传染源**、**传播途径**和**易感人群**三个基本环节

## SIR模型

假设疾病传播期内所考察地区总人数保持不变，没有新增人口和因疾病以外的原因造成的死亡。

我们将人群分为三类：

- 易感者（Susceptible）：未得病者，但缺乏免疫力，与感染者接触后会被感染
- 感染者（Infectious）：已经感染病原体的人，可以传播疾病
- 移出者（Removed）：不会再感染疾病，也不会再传播疾病，可能是因为死亡或者获得了免疫力或者被隔离

记 $t$ 时刻易感者、感染者、移出者的人数分别为 $S(t)$、$I(t)$、$R(t)$

### 接触和移出

- 接触率：记为 $\beta$，表示单位时间内一个感染者与易感者接触的人数
- 移出率：记为 $\alpha$，表示单位时间内一个感染者被移出的人数

单位时间内每人与 $\beta N$ 个人接触，其中 $N$ 为总人数，易感者占比为 $\frac{S(t)}{N}$，所以单位时间内一个感染者与易感者接触的人数为 $\beta N \frac{S(t)}{N}=\beta S(t)$，**单位时间内新增感染者数量**为 $\beta S(t)I(t)$。

单位时间内移出感染者数量为 $\alpha I(t)$

此时每个感染者处于感染期的时间服从参数为 $\alpha$ 的指数分布，那么单位时间内移出感染者数量为 $\alpha I(t)$，我们有

![Alt text](images/image-64.png){width=50%}

- $P(X\leq t)=1-e^{-\alpha t}$，$E(X)=\frac{1}{\alpha}$
- 感染者经过长度至多为 $t$ 的感染期后被移出的概率为 $P(X\leq t)=1-e^{-\alpha t}$
- 若不计新增感染者，$\frac{I(t)}{I(0)}=e^{-\alpha t}$
- 若不计新增感染者，$\frac{\mathrm{d}I(t)}{\mathrm{d}t}=-\alpha I(t)$

所以我们可以得到微分方程组

$$\begin{cases}
\frac{\mathrm{d}S}{\mathrm{d}t}=-\beta SI\\
\frac{\mathrm{d}I}{\mathrm{d}t}=\beta SI-\alpha I\\
\frac{\mathrm{d}R}{\mathrm{d}t}=\alpha I
\end{cases}$$

!!! note ""
    其中，$\beta$ 和 $\alpha$ 为常数，$S(0)=S_0$，$I(0)=I_0$，$R(0)=R_0$，$S_0+I_0+R_0=N$

我们考察 $S$ 和 $I$ 的关系，有

$$\frac{\mathrm{d}I}{\mathrm{d}S}=\frac{\beta S-\alpha}{-\beta S}=\frac{1}{\frac{\alpha}{\beta}S}-1\triangleq \frac{1}{\sigma S}-1$$

其中，$\sigma=\frac{\beta}{\alpha}$

可以解得

$$I(t)=S_0+I_0-S(t)+\frac{1}{\sigma}\ln\frac{S(t)}{S_0}$$

我们可以得到如下图像：

![Alt text](images/image-65.png)

其中，横坐标为 $S$，纵坐标为 $I$。斜线上的点为 $S_0$ 和 $I_0$，是初始点。上图所述的先增后减，实际上可以理解为疫情的爆发和衰退。

### $I$ 总会衰减到0吗？

