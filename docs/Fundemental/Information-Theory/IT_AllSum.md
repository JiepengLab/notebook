# Information Theory All Sum

## 第二章 信息的度量

!!! note ""
    - 事件的互信息可正可负，平均互信息不可能为负。

### 事件

$\begin{cases}
    \text{事件自信息：} I(x) = -\log P(x) >0\\
    \text{条件自信息：} I(x|y) = -\log P(x|y)\\
    \text{联合自信息：} I(x,y) = -\log P(x,y)\\
    \downarrow\downarrow\downarrow\downarrow\\
    \text{联合链式法则：} I(x,y) = I(x)+I(y|x)
\end{cases}$

$\begin{cases}
    \text{事件互信息：} I(x;y) = I(x) - I(x|y)=\log \frac{P(x|y)}{P(x)}\leq I(x)[\text{或}I(y)] \quad\text{可正可负}\\
    \text{条件互信息：} I(x;z|y) = I(x|y) - I(x|y,z)\\
    \text{联合互信息：} I(x;(y,z)) = I(x) - I(x|y,z)\\
    \downarrow\downarrow\downarrow\downarrow\\
    \text{联合链式法则：} I(x;(y,z)) = I(x;y)+I(x;z|y)
    \end{cases}$

### 离散随机变量

$\begin{cases}
    \text{熵：} H(X) = -\sum_{i=1}^{n}P(x_i)\log P(x_i)\geq 0\\
    \text{条件熵：} 0<H(X|Y) = -\sum_{y\in\mathcal{Y}}\sum_{x\in\mathcal{X}}p(x,y)\log p(x|y)\leq H(X)\\
    \text{联合熵：} H(X,Y=y) = -\sum_{x\in\mathcal{X}}\sum_{y\in\mathcal{Y}}p(x,y)\log p(x,y)\\
    \downarrow\downarrow\downarrow\downarrow\\
    \text{联合链式法则：} H(X,Y) = H(X) + H(Y|X)=H(Y)+H(X|Y)
\end{cases}$

$\begin{cases}
\lim_{\epsilon\to 0}H_{K+1}(P_1,P_2,\cdots,P_K-\epsilon,\epsilon)=H_K(P_1,P_2,\cdots,P_K)\\
H_M(p_1q_{11},p_1q_{21},\cdots,p_1q_{m1},p_2q_{12},\cdots,p_2q_{m2},\cdots,p_nq_{mn})=H_N(p_1,p_2,\cdots,p_n)+\sum_{i=1}^n p_iH_M(q_1,q_2,\cdots,q_m)，树状图魅力时刻\\
H_K(P)\leq \log K\\
\text{H(X)是严格上凸函数，} H(\lambda \vec{P_1}+(1-\lambda)\vec{P_2})\geq \lambda H(\vec{P_1})+(1-\lambda)H(\vec{P_2}),\quad 0\leq \lambda\leq 1\\
\text{极大值的充要条件：}
\frac{\partial f(P)}{\partial p_k}=\lambda,\ p_k > 0\quad\text{且}
\frac{\partial f(P)}{\partial p_k}\leq \lambda,\  p_k = 0
\end{cases}$

$\begin{cases}
\text{互信息：}I(X;Y) =E\{I(x;y)\}=\sum_x\sum_yp(x,y)\log\frac{p(x|y)}{q(x)}\geq 0\quad{是输入分布的上凸函数，转移概率矩阵的下凸函数}\\
\text{互信息与熵：}I(X;Y)=H(X)-H(X|Y)=H(Y)-H(Y|X)=H(X)+H(Y)-H(X,Y)\\
I(X;Y)\leq \min\{H(X),H(Y)\}\\
\text{条件互信息：}I(X;Y|Z)=\sum_{x,y,z}p(x,y,z)\log\frac{p(x,y|z)}{p(x|z)p(y|z)}\\
\text{联合互信息：}I(X;(Y,Z))=\sum_{x,y,z}p(x,y,z)\log\frac{p(x,y,z)}{p(x)p(y,z)}\\
\downarrow\downarrow\downarrow\downarrow\\
\text{联合链式法则：}I(X;(Y,Z))=I(X;Y)+I(X;Z|Y)
\end{cases}$

![alt text](images/image-47.png){width=50%}

$\begin{cases}
\text{相对熵：}D(p||q)=\sum_xp(x)\log\frac{p(x)}{q(x)}\geq 0\quad\text{实际分布p与假定分布q之间的距离}\\
D(p||q)\neq D(q||p)\\
D(p||q)\leq \log K\\
\text{相对熵与互信息：}D(p(x,y)||p(x)p(y))=I(X;Y)\\
\end{cases}$

$\begin{cases}
\text{Fano不等式：}\hat{X}\text{已知条件下}X\text{的疑义度：}H(X|\hat{X})\leq H(P_E)+P_E\log (K-1)\\
\end{cases}$

### 马尔科夫链

$\begin{cases}
\text{如果}X\rightarrow Y\rightarrow Z\text{，则} \max\{I(X;Z),I(X;Y|Z)\}\leq I(X;Y)\\
\text{如果}U\rightarrow X\rightarrow Y \rightarrow V \text{，则} I(X;Y)\geq I(U;V)\\
\end{cases}$

### 连续随机变量

$\begin{cases}
\text{互信息：}I(X;Y)=\int\int p(x,y)\log\frac{p(x|y)}{q(x)}dxdy\geq 0\\
\text{条件互信息：}I(X;Y|Z)=\int\int\int p(x,y,z)\log\frac{p(x,y|z)}{p(x|z)p(y|z)}dxdydz\\
\text{联合互信息：}I(X;(Y,Z))=\int\int\int p(x,y,z)\log\frac{p(x,y,z)}{p(x)p(y,z)}dxdydz\\
\downarrow\downarrow\downarrow\downarrow\\
\text{联合链式法则：}I(X;(Y,Z))=I(X;Y)+I(X;Z|Y)
\end{cases}$

$\begin{cases}
\text{微分熵：}H_C(X)=-\int p(x)\log p(x)dx\quad\text{正负未知，非线性不变}\\
\text{条件微分熵：}H_C(X|Y)=-\int\int p(x,y)\log p(x|y)dxdy\\
\text{联合微分熵：}H_C(X,Y)=-\int\int p(x,y)\log p(x,y)dxdy\\
\downarrow\downarrow\downarrow\downarrow\\
\text{联合链式法则：}H_C(X,Y)=H_C(X)+H_C(Y|X)=H_C(Y)+H(X_C|Y)\\
\text{互信息和微分熵：}I(X;Y)=H_C(X)-H_C(X|Y)=H_C(Y)-H_C(Y|X)=H_C(X)+H_C(Y)-H_C(X,Y)\\
\text{极大化-峰值受限：}\int_{-M}^{M}p(x)dx=1 \rightarrow H_C(X)\leq \ln 2M\quad\text{均匀分布取等}\\
\text{极大化-平均功率受限：}\text{一定方差}\sigma^2\rightarrow H_C(X)\leq \ln\sqrt{2\pi e\sigma^2}\quad\text{高斯分布取等}\\
\end{cases}$

$\begin{cases}
\text{熵功率}\overline{\sigma_x}^2=\frac{1}{2\pi e}e^{2H_C(X)}\\
H_C(X)\leq \frac{1}{2}\ln\sqrt{2\pi e\sigma^2}\Leftrightarrow \overline{\sigma_x}^2\leq \sigma^2\\
\end{cases}$

### 平稳信源

$\begin{cases}
H(\mathrm{X})=H(X_1,X_2\cdots X_n)=-\sum_{i=1}^{n}P(x_i)\log P(x_i)\text{，长度越大，}\mathrm{X}\text{越容易被确定，}H(\mathrm{X})\text{单调不增}\\
H_N(\mathrm{X})=\frac1N H(\mathrm{X})\text{，平均每符号熵，单调不增}\\
H_\infty(\mathrm{X})=\lim_{N\to\infty}H_N(\mathrm{X})=H(X_N|X_{N-1},X_{N-2}\cdots X_1)\text{，熵速率}\\
H(X_N|X_{N-1},X_{N-2}\cdots X_1)\leq H_N(X)\text{，平均条件熵，单调不增}\\
\eta = \frac{H_\infty(\mathrm{X})}{\log K}\text{，熵速率，}0\leq \eta\leq 1\\
R = 1-\eta\text{，冗余度，}0\leq R\leq 1\\
\end{cases}$

### 马尔科夫源

$\begin{cases}
\vec{q}=\mathrm{P}\vec{q}\\
H_{\infty}(X)=H(X|S)
\end{cases}$

## 第三章 信息的无损压缩