# Information Theory All Sum

## 第二章

### 信息的度量

#### 事件

- 自信息：$I(x) = -\log P(x)$
    - 条件自信息：$I(x|y) = -\log P(x|y)$
    - 联合自信息：$I(x,y) = -\log P(x,y)$
- 互信息：$I(x;y) = I(x) - I(x|y)=\log \frac{p(x,y)}{q(x)\omega(y)}$
    - 条件互信息：$I(x;y|z) =\log \frac{p(x|(y,z))}{q(x|z)}=\log\frac{p(x,y|z)}{q(x|z)\omega(y|z)}$
    - 联合互信息：$I(x;(y,z)) = \log \frac{P(x|y,z)}{P(x)}=\log\frac{p(x,y,z)}{q(x)\omega(y,z)}$
        - 链式法则：$I(x;(y,z))=I(x;y)+I(x;z|y)$

#### 随机变量

- 熵：$H(X) = -\sum_{i=1}^{n}P(x_i)\log P(x_i)$
    - 条件熵
        - 事件 $y$：$H(X|Y=y) = -\sum_{i=1}^{n}P(x_i|y)\log P(x_i|y)$
        - 随机变量 $Y$：$H(X|Y) = -\sum_{i=1}^{n}P(x_i,y)\log P(x_i|y)$
    - 联合熵：$H(X,Y) = -\sum_{i=1}^{n}P(x_i,y)\log P(x_i,y)$
        - 链式法则：$H(X,Y) = H(X) + H(Y|X)=H(Y)+H(X|Y)$
    - 性质
        - 概率排列不同，熵不变
        - $H(X)\geq 0$ 当且仅当 $X$ 的取值只有一个时，$H(X) = 0$
        - $\lim_{\epsilon\to 0}H_{K+1}(P_1,P_2,\cdots,P_K-\epsilon,\epsilon)=H_K(P_1,P_2,\cdots,P_K)$
        - $H_M(p_1q_{11},p_1q_{21},\cdots,p_1q_{m1},p_2q_{12},\cdots,p_2q_{m2},\cdots,p_nq_{mn})=H_N(p_1,p_2,\cdots,p_n)+\sum_{i=1}^n p_iH_M(q_1,q_2,\cdots,q_m)$
        - $H_K(P)\leq \log K$
        - $H(X|Y)\leq H(X)$ 当且仅当$X$ 和 $Y$ 独立时取等号
        - $H(X)$是严格上凸函数， $H(\lambda \vec{P_1}+(1-\lambda)\vec{P_2})\geq \lambda H(\vec{P_1})+(1-\lambda)H(\vec{P_2}),\quad 0\leq \lambda\leq 1$
        - 极大值的充要条件：$
        \begin{cases}
        \frac{\partial f(P)}{\partial p_k}=\lambda\qquad p_k > 0\\
        \frac{\partial f(P)}{\partial p_k}\leq \lambda\qquad p_k = 0
        \end{cases}
        $