# LDA | 线性判别分析

高维灾难：数据在高维空间失去区分性（超过30维的欧式距离无区别）

思想：类内方差小，类间方差大

方法：线性判别分析(LDA) / Fisher判别分析(FDA)

推导：

假设样本集合为$D=\set{(x_i,y_i)}_{i=1}^n,x_i\in\mathbb R^d$标签为$y_i\in{C_1,\cdots,C_K}$共$K$类样本

$\mathbf X$为所有样本构成的集合，$N_i$为第$i$个类别所包含的样本总数，$X_i$为第$i$类样本的集合，$\mathbf m$为所有样本的均值向量，$\mathbf m_i$为第$i$类样本的均值向量，$\Sigma_i$为第$i$类样本的协方差矩阵

$$
\Sigma_i=\sum_{x\in x_i}(x-m_i)(x-m_i)^\mathsf T
$$

二分类：$K=2$

+ 投影函数：$y(x)=w^\mathsf Tx\in\mathbb R$
+ 投影后$C_1$类别的协方差矩阵$s_1$为
$$
\mathbf s_1=\sum_{x\in C_i}(w^\mathsf Tx-w^\mathsf Tm_i)^2=w^\mathsf T[\sum_{x\in C_i}(x-m_i)(x-m_i)^\mathsf T]w
$$
+ 目标：
	1. 同一类别协方差最小：$\mathbf s_1+\mathbf s_2$
	2. 不同类别均值距离差距最大：
		+ 样本数据中心：$\mathbf m_1=w^\mathsf Tm_1,\mathbf m_2=w^\mathsf Tm_2$
		+ 距离定义：$\Vert \mathbf m_2-\mathbf m_1\Vert_2^2$
+ 优化目标：最小化目标作分母，最大化目标作分子
$$
\max\quad J(\mathbf w)=\dfrac{\Vert \mathbf m_2-\mathbf m_1\Vert_2^2}{\mathbf s_1+\mathbf s_2}
$$
化简为关于$\mathbf w$的式子：
$$
J(\mathbf w)=\dfrac{\Vert \mathbf w^\mathsf T(m_2-m_1)\Vert_2^2}{\mathbf w^\mathsf T\Sigma_1\mathbf w+\mathbf w^\mathsf T\Sigma_2\mathbf w}=\dfrac{\mathbf w^\mathsf T(m_2-m_1)(m_2-m_1)^\mathsf T\mathbf w}{\mathbf w^\mathsf T(\Sigma_1+\Sigma_2)\mathbf w}\equiv\dfrac{\mathbf w^\mathsf TS_b\mathbf w}{\mathbf w^\mathsf TS_w\mathbf w}
$$
其中$S_b$为类间散度矩阵，$S_w$为类内散度矩阵
由于分子分母都是关于$\mathbf w$的二次式，故仅与$\mathbf w$方向有关，与$\mathbf w$的长度无关；令$\mathbf w^\mathsf TS_w\mathbf w=1$转化为约束最值

+ 上述带约束条件（即$𝒘^𝑇 𝑺_𝑊 𝒘−1=0$）的函数极大值（即 $𝒘^𝑇 𝑺_𝑏 𝒘$取值最大）优化问题所对应拉格朗日函数为：

$$
L(\mathbf w)=\mathbf w^\mathsf TS_b\mathbf w-\lambda(\mathbf w^\mathsf TS_w\mathbf w-1)
$$
$$
\dfrac{\partial L}{\partial \mathbf w}=0\Rightarrow S_w^{-1}S_b\mathbf w=\lambda\mathbf  w
$$
故$\lambda,\mathbf w$为$S_w^{-1}S_b$的特征值和特征向量，上式称为Fisher线性判别。
> 求导公式：$A=A^\mathsf T\Rightarrow\dfrac{\text{d}x^\mathsf TAx}{x}=2Ax$

+ 求解$\mathbf w$：带入$S_b$
由于$(m_2-m_1)^\mathsf T\mathbf w\in\mathbb R$，$\mathbf w$数乘变换不影响结果，故$\mathbf w=S_w^{-1}(m_2-m_1)$

+ 多维推广：给定原始$d$维数据样本$x_i$，通过$x_iW$将其从$d$维空间映射到$r$维空间，实现原始数据降维，得到紧凑表达
	+ 步骤：
		1. 计算数据样本集中每个类别样本的均值
		2. 计算类内散度矩阵$S_W$和类间散度矩阵$S_b$
		3. 根据$S_w^{-1}S_bW=\lambda W$，求解$S_w^{-1}S_b$前$r$个==最大特征值==所对应的特征向量$(\mathbf w_1,\cdots,\mathbf w_r)$，构成矩阵$W$
		4. 通过$W$进行映射，实现特征降维
> 投影后维度$r$最大取值为$\min(K-1,d)$


