# 07 赠券收集问题

!!! question "问题背景"

    一套赠券共有 $N$ 种，商家在每件商品中随机放入一张赠券。假设每件商品中放入各种赠券的概率相同，那么集齐全套赠券平均需购买多少件商品？

## 方法一：德摩根定律

定义随机变量 $X$ 为“集齐全套赠券需购买的商品件数”，$E(X)=\sum\limits_{i=1}^N i\cdot P(X=i)$。记 $B_i$为事件“购买 $i$ 件商品后集齐全套赠券”，记 $A_i^j$为事件“购买 $i$ 件商品后收集到第 $j$ 种赠券”。则有

$$
\begin{aligned}
P(A_i^j)=&1-P(\overline{A_i^j})=1-\left(1-\frac{1}{N}\right)^i\\
P(B_i)=&P(A_i^1\cap A_i^2\cap\cdots\cap A_i^N)\\
=&1-P(\overline{A_i^1\cap A_i^2\cap\cdots\cap A_i^N})\\
=&1-P(\overline{A_i^1}\cup\overline{A_i^2}\cup\cdots\cup\overline{A_i^N})\\
=&1-(\sum\limits_{j=1}^N P(\overline{A_i^j})-\sum\limits_{1\leq j_1<j_2\leq N}P(\overline{A_i^{j}}\cap\overline{A_i^{k}})+\cdots+(-1)^{N-1}P(\overline{A_i^1}\cap\overline{A_i^2}\cap\cdots\cap\overline{A_i^N}))\\
\end{aligned}
$$

分析括号中的第二项，对任意固定的$j,k$，$1 \leq j < k \leq N$，$\overline{A_i^{j}}\cap\overline{A_i^{k}}$表示购买 $i$ 件商品后未收集到第 $j$ 种和第 $k$ 种赠券，有$P(\overline{A_i^{j}}\cap\overline{A_i^{k}})=\left(1-\frac{2}{N}\right)^i$。

同理，对任意$1 \leq j_1 < j_2 < \cdots < j_k \leq N$，$\overline{A_i^{j_1}}\cap\overline{A_i^{j_2}}\cap\cdots\cap\overline{A_i^{j_k}}$表示购买 $i$ 件商品后未收集到第 $j_1$ 种、第 $j_2$ 种、$\cdots$、第 $j_k$ 种赠券，有$P(\overline{A_i^{j_1}}\cap\overline{A_i^{j_2}}\cap\cdots\cap\overline{A_i^{j_k}})=\left(1-\frac{k}{N}\right)^i$。因此，有

$$
\begin{aligned}
P(B_i)=&1-(\sum\limits_{j=1}^N P(\overline{A_i^j})-\sum\limits_{1\leq j_1<j_2\leq N}P(\overline{A_i^{j}}\cap\overline{A_i^{k}})+\cdots+(-1)^{N-1}P(\overline{A_i^1}\cap\overline{A_i^2}\cap\cdots\cap\overline{A_i^N}))\\
=&1-\left(\sum\limits_{j=1}^N \left(1-\frac{1}{N}\right)^i-\sum\limits_{1\leq j_1<j_2\leq N}\left(1-\frac{2}{N}\right)^i+\cdots+(-1)^{N-1}\left(1-\frac{N}{N}\right)^i\right)\\
=&1-\left(\begin{pmatrix}N\\1\end{pmatrix}\left(1-\frac{1}{N}\right)^i-\begin{pmatrix}N\\2\end{pmatrix}\left(1-\frac{2}{N}\right)^i+\cdots+(-1)^{N-1}\begin{pmatrix}N\\N\end{pmatrix}\left(1-\frac{N}{N}\right)^i\right)\\
=&1-\sum\limits_{j=1}^N (-1)^{j-1}\begin{pmatrix}N\\j\end{pmatrix}\left(1-\frac{j}{N}\right)^i\\
=&\sum\limits_{j=0}^N (-1)^{j}\begin{pmatrix}N\\j\end{pmatrix}\left(1-\frac{j}{N}\right)^i
\end{aligned}
$$

所以其期望为：

$$\sum\limits_{i=1}^N i\cdot P(X=i)=\sum\limits_{i=1}^N i\cdot\sum\limits_{j=0}^N (-1)^{j}\begin{pmatrix}N\\j\end{pmatrix}\left(1-\frac{j}{N}\right)^i$$

## 方法二：几何分布

记随机变量 $X$ 为“集齐全套赠券购买的商品件数”，定义随机变量 $Y$ 为“从收集到 $k-1$ 种赠券到 $k$种赠券购买的商品件数”，则有： 

$$X = Y_1 + Y_2 + \cdots + Y_N$$

我们考察$Y_k$。$Y_k = j$ 意味着先购买的 $j-1$ 件商品中的赠券均为已收集到的 $k-1$ 种中的一种，第 $j$ 件商品中有未收集到的 $N-k+1$ 种赠券中的一种。可知，$Y_k$ 服从参数为 $\frac{N-k+1}{N}$ 的几何分布

!!! note "分布回忆"

    ![Alt text](images/image-25.png)   

所以，根据几何分布的性质，有$E(Y_k) = \frac{N}{N-k+1}$。因此，$E(X) = \sum\limits_{k=1}^N E(Y_k) = \sum\limits_{k=1}^N \frac{N}{N-k+1} = N\sum\limits_{k=1}^N \frac{1}{k}$。


!!! note ""
    显然，方法二的计算量要小于方法一。而且，方法二的思路更加简单，更加容易理解。