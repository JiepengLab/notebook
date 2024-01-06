# 18 数学规划

## 运筹学

运筹学的主要分支：

- 数学规划（Mathematical Programming）
    - 线性规划（Linear Programming）
    - 非线性规划（Nonlinear Programming）
    - 整数规划（Integer Programming）
    - 多目标规划（Multiobjective Programming）
- 组合优化（Combinatorial Optimization）
- 随机运筹
    - 排队论（Queuing Theory）
    - 库存论（Inventory theory）
    - 可靠性理论（Reliability Theory）
- 博弈论（Game Theory）与决策理论（Decision Theory）

## 数学规划

- 若干个变量在满足一些等式或不等式限制条件下，使目标函数取得最大值或最小值
- 研究问题的数学性质，构造求解问题的方法，实现求解问题的算法，以及将算法应用于实际问题

![Alt text](images/image-78.png){width=50%}

!!! note "数学规划分类"

    !!! note "按函数性质"

        - 线性规划（linear programming）
            - 目标函数为线性函数，约束条件为线性等式或不等式
        - 非线性规划（nonlinear programming）
            - 目标函数为非线性函数，或至少有一个约束条件为非线性等式或不等式
                - 二次规划（Quadratic Programming, QP）：目标函数为二次函数，约束条件为线性等式或不等式
                - 带二次约束的二次规划（Quadratically Constrained Quadratic Program， QCQP）：目标函数为二次函数，约束条件为线性或二次等式或不等式
                - 线性分式规划（linear fractional programming）：目标函数为两个线性函数的商，约束条件为线性等式或不等式

    !!! note "按变量性质"
        整数规划（integer programming）：至少有一个决策变量限定取整数值
        - 整数决策变量意义
            - 用于表示只能取离散值的对象的数量
            - 用于表示约束条件之间的逻辑关系或复杂的函数形式
            - 用于表示非数值的优化或可行性问题
        - 特殊整数规划
            - 部分决策变量取整数值的数学规划特称为混合整数规划（Mixed Integer Programming, MIP）
            - 0-1规划：决策变量仅取值0或1的数学规划

    !!! note "按约束条件"
        - 无约束优化
        - 约束优化

### 数学规划建模的基本要求

- 数学规划模型是问题要求和限制的真实反映
    - 数学规划模型的最优解（可行解）与问题最优解（可行解）是否一致或对应
    - 是否遗漏问题的隐含约束、决策变量的必然要求、多组决策变量间的联系等约束条件
- 数学规划模型应符合数学规划的内容规范和形式要求
    - 要素完整、变量指标运用准确。逻辑关系、集合运算等一般不在数学规划中出现
- 问题可能存在多个数学规划描述，需根据实际情况进行选择和不断完善
    - 复杂目标函数和约束条件的简化， 0-1变量的灵活运用
    - 可行域约简、数学规划的重构、分解与松弛

### 数学规划建模的适用范围

- 具有简单最优算法或可转化为已知多项式时间可解问题，不需运用数学规划求解
- 最优解不具必要性，或求解时间要求高于精度要求等问题，不宜盲目运用数学规划求解
- 建立数学规划模型困难，因实例规模或问题结构等原因使求解不具现实可能性的问题，不能直接运用数学规划求解

## 食谱问题

![Alt text](images/image-79.png)

也就是说，我们要找到在约束条件下的 $\vec{x}$，使得到 $\min\sum\limits_{i=1}^n c_{i}x_{i}$。（大概是多元线性规划？）

例如：

$$\begin{array}{rl}\min&60x_1+30x_2+20x_3\\s.t.&120x_1+180x_2+160x_3\geq50\\&300x_1+90x_2+30x_3\geq90\\&x_1,x_2,x_3\geq0\end{array}$$

## 运输问题

![Alt text](images/image-81.png)

## 数独

![Alt text](images/image-82.png)

!!! note ""
    $\sum\limits_{k=1}^9kx_{ijk}$ 的值为在这个格子里填的数字。

![Alt text](images/image-83.png){width=60%}

## 下料问题

!!! question "问题背景"
    现有 $W$ 米长的钢管若干。生产某产品需长为 $w_i$ 米的短管 $b_i$ 根，$i=1,2,\cdots,n$。如何截取能使材料最省？

我们构造数学规划模型：

决策变量：$x_{ji}$ 表示第 $j$ 根钢管截取第 $i$ 种短管的数量，$i=1,2,\cdots,k$，$j=1,2,\cdots,n$。（$n=\sum\limits_{i=1}^k b_{i}$）

约束条件：

1. 每根钢管截取的短管总长度不超过钢管长度 $W$，即 $\sum\limits_{i=1}^n w_ix_{ji}\leq W$，$j=1,2,\cdots,n$
2. 每种短管截取的数量不低于需求量，即 $\sum\limits_{j=1}^n x_{ji}\geq b_i$，$i=1,2,\cdots,k$

我们的目标是使得截取的钢管最少，即 $\min n$。但这个 $n$ 是出现在求和号上的，在线代的数学规划中我们往往不会直接去求解这个 $n$，而是将其转化。

我们构造一个 0-1变量 $y_j$，表示第 $j$ 根钢管是否被截取，即 $y_j=1$ 表示第 $j$ 根钢管被截取，$y_j=0$ 表示第 $j$ 根钢管未被截取，$j=1,2,\cdots,n$。

所以我们的目标函数可以写成 $\min\sum\limits_{j=1}^n y_j$。

但现在有一个问题：$y_j$ 与 $x_{ji}$ 之间的关系是什么呢？

$$\exists i,x_{ji}>0\rightarrow y_j=1 \Rightarrow \sum\limits_{i=1}^k x_{ji}> 0 \rightarrow y_j=1$$

约束条件1可以写成 $\sum\limits_{i=1}^k w_ix_{ji}\leq Wy_j$，$j=1,2,\cdots,n$。

所以我们有：

$$\begin{array}{rl}\min&\sum\limits_{j=1}^n y_j\\s.t.&\sum\limits_{i=1}^k w_ix_{ji}\leq Wy_j\\&\sum\limits_{j=1}^n x_{ji}\geq b_i\\&x_{ji}\geq0,y_j\in\{0,1\}\end{array}$$

当 $y_j=1\rightarrow \exists i,x_{ji}> 0$。给定目标下，最优解自动满足。

### 另一种决策变量

![Alt text](images/image-85.png)

同样，这个解法可以用于解决装箱问题。

### 装箱问题

两个问题实际上是同一个问题，只是描述的方式不同。

装箱问题指的是给定一系列大小已知的物品和若干个容量相同的箱子，如何将物品放入箱子中，使所用箱子数尽可能少。

!!! note ""
    三维的情况往往不使用数学规划，而是使用启发式算法。

## 选址问题

!!! question "问题背景"
    平面上有 $n$ 个点，求一个面积最小的圆，使得这 $n$ 个点都在圆内。

记第 $j$ 个点的坐标为 $(x_j,y_j)$，$j=1,2,\cdots,n$。我们给出一个带二次约束的二次规划模型：

!!! note ""

    **决策变量**：圆心坐标 $(x_0,y_0)$，圆半径 $r$

    **目标函数**：$\min r^2$

    **约束条件**：$(x_j-x_0)^2+(y_j-y_0)^2\leq r^2$，$j=1,2,\cdots,n$

约束为二次时，比较难写，我们可以将其转化成更简单的形式：

!!! note ""

    **决策变量**改为 $\lambda=r^2-(x_0^2+y_0^2)$

    **目标函数**改为 $\min\lambda+(x_0^2+y_0^2)$

    **约束条件**改为 $\lambda+2x_0x_j+2y_0y_j\geq x_j^2+y_j^2$，$j=1,2,\cdots,n$

## 时间分配问题

!!! question "问题背景"
    有 $T$ 天时间可用于安排复习 $n$ 门课程，每天只能复习一门课程，每门课程至少复习一天。用 $t$ 天时间复习第 $j$ 门课程可使该门课程提高 $p_{jt}$ 分。如何制定复习计划可使所有课程提高的总分尽可能大？

!!! note ""

    **决策变量**：$x_{jt}$ 表示第 $j$ 门课程是否复习 $t$ 天，$j=1,2,\cdots,n$，$t=1,2,\cdots,T$

    $$x_{jt}=\left\{\begin{array}{ll}1,&\text{第 $j$ 门课程复习 $t$ 天}\\0,&\text{其他}\end{array}\right.$$

    **目标函数**：$\max\sum\limits_{j=1}^n\sum\limits_{t=1}^Tp_{jt}x_{jt}$

    **约束条件**：$\sum\limits_{t=1}^Tx_{jt}=1$；$\sum\limits_{j=1}^n\sum\limits_{t=1}^Ttx_{jt}\leq T$
