# 1. AI的数学基础

!!! note "本章主要内容"

    - 向量和矩阵的求倒数（求梯度）运算
    - 常用的概率分布
    - 联合概率公式及其应用举例
    - 贝叶斯定理及其应用举例
    - 朴素贝叶斯模型及其应用举例
    - 简单的线性回归模型
    - 简单的分类模型

## 1.1 向量和矩阵的求倒数（求梯度）运算

### 1.1.1 向量和矩阵求导运算

!!! note "矩阵$Y=F(x)_{m\times n}$对标量$x$求导:"

    $$\frac{\text{d} Y}{\text{d} x} = \begin{bmatrix}
    \frac{\partial F_{11}}{\partial x} & \frac{\partial F_{12}}{\partial x} & \cdots & \frac{\partial F_{1n}}{\partial x} \\
    \frac{\partial F_{21}}{\partial x} & \frac{\partial F_{22}}{\partial x} & \cdots & \frac{\partial F_{2n}}{\partial x} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial F_{m1}}{\partial x} & \frac{\partial F_{m2}}{\partial x} & \cdots & \frac{\partial F_{mn}}{\partial x}
    \end{bmatrix}$$

    !!! note ""
        这里的$\partial$也可以是$\text{d}$，因为只有一个变量$x$。

!!! note "标量$y=f(X)$对列向量$\vec{x}=\begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} y}{\text{d} \vec{x}} = \begin{bmatrix}
    \frac{\partial f}{\partial x_1} \\
    \frac{\partial f}{\partial x_2} \\
    \vdots \\
    \frac{\partial f}{\partial x_m}
    \end{bmatrix}$$

!!! note "行向量$\vec{y}^T=\begin{bmatrix}f_1(x) & f_2(x) & \cdots & f_n(x)\end{bmatrix}$对列向量$\vec{x}=\begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} \vec{y}^T}{\text{d} \vec{x}} = \begin{bmatrix}
    \frac{\partial f_1}{\partial x_1} & \frac{\partial f_2}{\partial x_1} & \cdots & \frac{\partial f_n}{\partial x_1} \\
    \frac{\partial f_1}{\partial x_2} & \frac{\partial f_2}{\partial x_2} & \cdots & \frac{\partial f_n}{\partial x_2} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial f_1}{\partial x_m} & \frac{\partial f_2}{\partial x_m} & \cdots & \frac{\partial f_n}{\partial x_m}
    \end{bmatrix}$$
    
    !!! note "重要结论"
        $$\frac{\text{d} \vec{x}^T}{\text{d} \vec{x}}= I,\frac{\text{d} (A\vec{x})^T}{\text{d} \vec{x}} = A^T$$

!!! note "列向量$\vec{y}=\begin{bmatrix}f_1(x) \\ f_2(x) \\ \vdots \\ f_n(x)\end{bmatrix}$对行向量$\vec{x}^T=\begin{bmatrix}x_1 & x_2 & \cdots & x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} \vec{y}}{\text{d} \vec{x}^T} =(\frac{\text{d} \vec{y}^T}{\text{d} \vec{x}})^T = \begin{bmatrix}
    \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \cdots & \frac{\partial f_1}{\partial x_m} \\
    \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \cdots & \frac{\partial f_2}{\partial x_m} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial f_n}{\partial x_1} & \frac{\partial f_n}{\partial x_2} & \cdots & \frac{\partial f_n}{\partial x_m}
    \end{bmatrix}$$

    !!! note "重要结论"
        $$\frac{\text{d} \vec{x}}{\text{d} \vec{x}^T}= I,\frac{\text{d} (A\vec{x})}{\text{d} \vec{x}^T} = A$$

!!! note "向量积$\vec{u}^T\vec{v}$对列向量$\vec{x}$求导"

    $$\frac{\text{d} (\vec{u}^T\vec{v})}{\text{d} \vec{x}} = \frac{\text{d} \vec{u}^T}{\text{d} \vec{x}}\vec{v} +\frac{\text{d} \vec{v}^T}{\text{d} \vec{x}}\vec{u}$$

    ??? example "证明"
        令$\vec{u}^T=\begin{bmatrix}u_1 & u_2 & \cdots & u_m\end{bmatrix},\vec{v}=\begin{bmatrix}v_1 \\ v_2 \\ \vdots \\ v_m\end{bmatrix}, \vec{x}=\begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m\end{bmatrix}$，则
        
        $$\begin{aligned}
        \frac{\text{d} (\vec{u}^T\vec{v})}{\text{d} \vec{x}} &=\frac{\text{d} (u_1v_1+u_2v_2+\cdots+u_mv_m)}{\text{d} \vec{x}} \\ 
        &=\begin{bmatrix}
        \frac{\partial (u_1v_1+u_2v_2+\cdots+u_mv_m)}{\partial x_1} \\  
        \frac{\partial (u_1v_1+u_2v_2+\cdots+u_mv_m)}{\partial x_2} \\
        \vdots \\
        \frac{\partial (u_1v_1+u_2v_2+\cdots+u_mv_m)}{\partial x_m}
        \end{bmatrix} \\
        &=\begin{bmatrix}
        u_1\frac{\partial v_1}{\partial x_1}+v_1\frac{\partial u_1}{\partial x_1}+u_2\frac{\partial v_2}{\partial x_1}+v_2\frac{\partial u_2}{\partial x_1}+\cdots+u_m\frac{\partial v_m}{\partial x_1}+v_m\frac{\partial u_m}{\partial x_1} \\
        u_1\frac{\partial v_1}{\partial x_2}+v_1\frac{\partial u_1}{\partial x_2}+u_2\frac{\partial v_2}{\partial x_2}+v_2\frac{\partial u_2}{\partial x_2}+\cdots+u_m\frac{\partial v_m}{\partial x_2}+v_m\frac{\partial u_m}{\partial x_2} \\
        \vdots \\
        u_1\frac{\partial v_1}{\partial x_m}+v_1\frac{\partial u_1}{\partial x_m}+u_2\frac{\partial v_2}{\partial x_m}+v_2\frac{\partial u_2}{\partial x_m}+\cdots+u_m\frac{\partial v_m}{\partial x_m}+v_m\frac{\partial u_m}{\partial x_m}
        \end{bmatrix} \\
        &=\begin{bmatrix}
        \frac{\partial u_1}{\partial x_1} v_1 + \cdots + \frac{\partial u_m}{\partial x_1} v_m \\
        \frac{\partial u_1}{\partial x_2} v_1 + \cdots + \frac{\partial u_m}{\partial x_2} v_m \\
        \vdots \\
        \frac{\partial u_1}{\partial x_m} v_1 + \cdots + \frac{\partial u_m}{\partial x_m} v_m
        \end{bmatrix} + \begin{bmatrix}
        u_1 \frac{\partial v_1}{\partial x_1} + \cdots + u_m \frac{\partial v_m}{\partial x_1} \\
        u_1 \frac{\partial v_1}{\partial x_2} + \cdots + u_m \frac{\partial v_m}{\partial x_2} \\
        \vdots \\
        u_1 \frac{\partial v_1}{\partial x_m} + \cdots + u_m \frac{\partial v_m}{\partial x_m}
        \end{bmatrix} \\
        &=\begin{bmatrix}
        \frac{\partial u_1}{\partial x_1} + \cdots + \frac{\partial u_m}{\partial x_m} \\
        \frac{\partial u_1}{\partial x_2} + \cdots + \frac{\partial u_m}{\partial x_m} \\
        \vdots \\
        \frac{\partial u_1}{\partial x_m} + \cdots + \frac{\partial u_m}{\partial x_m}
        \end{bmatrix} \begin{bmatrix}
        v_1 \\
        v_2 \\
        \vdots \\
        v_m
        \end{bmatrix} +  \begin{bmatrix}
        \frac{\partial v_1}{\partial x_1} & \frac{\partial v_2}{\partial x_1} & \cdots & \frac{\partial v_m}{\partial x_1} \\
        \frac{\partial v_1}{\partial x_2} & \frac{\partial v_2}{\partial x_2} & \cdots & \frac{\partial v_m}{\partial x_2} \\
        \vdots & \vdots & \ddots & \vdots \\
        \frac{\partial v_1}{\partial x_m} & \frac{\partial v_1}{\partial x_m} & \cdots & \frac{\partial v_m}{\partial x_m}
        \end{bmatrix}\begin{bmatrix}
        u_1 \\
        u_2 \\
        \vdots \\
        u_m
        \end{bmatrix} \\
        &=\frac{\text{d} \vec{u}^T}{\text{d} \vec{x}}\vec{v} +\frac{\text{d} \vec{v}^T}{\text{d} \vec{x}}\vec{u}
        \end{aligned}$$

    !!! note "重要结论"
        
        $$\frac{\text{d} (\vec{x}^T\vec{x})}{\text{d} \vec{x}} = 2\vec{x},\frac{\text{d} (\vec{x}^TA\vec{x})}{\text{d} \vec{x}} = (A+A^T)\vec{x}$$
    
    !!! warning "注意"
        !!! note ""
            向量积中出现$\vec{x}^T\vec{x}$（即标量）时的处理方法:
            直接把$\vec{x}^T\vec{x}$移到最左边
            
            $$\frac{\text{d} (\vec{a}^T\vec{x}^T\vec{x}\vec{b})}{\text{d} \vec{x}} = \frac{\text{d} (\vec{x}^T\vec{x}\vec{a}^T\vec{b})}{\text{d} \vec{x}} = \frac{\text{d} (\vec{x}^T\vec{x})}{\text{d} \vec{x}}\vec{a}^T\vec{b} = 2\vec{x}\vec{a}^T\vec{b}$$

        !!! note ""
            向量积中出现$\vec{x}\vec{x}^T$（即矩阵）时的处理方法:
            
            $$\frac{\text{d} (\vec{a}^T\vec{x}\vec{x}^T\vec{b})}{\text{d} \vec{x}} 
            = \frac{\text{d} (\vec{a}^T\vec{x}\vec{x}^T\vec{b})}{\text{d} \vec{x}} 
            = \frac{\text{d} (\vec{a}^T\vec{x})}{\text{d} \vec{x}}\vec{x}^T\vec{b} + \frac{\text{d} (\vec{x}^T\vec{b})}{\text{d} \vec{x}}\vec{a}^T \vec{x}
            = \vec{a}\vec{x}^T\vec{b} + \vec{b}\vec{a}^T\vec{x}
            = (\vec{a}\vec{b}^T + \vec{b}\vec{a}^T)\vec{x}$$

            最后一个等号是因为$\vec{x}^T\vec{b}$是标量，所以$\vec{x}^T\vec{b}= \vec{b}^T\vec{x}$