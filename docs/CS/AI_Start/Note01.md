# 1. AI的数学基础

!!! note "本章主要内容"

    - 向量和矩阵的求倒数（求梯度）运算
    - 常用的概率分布
    - 联合概率公式及其应用举例
    - 贝叶斯定理及其应用举例
    - 朴素贝叶斯模型及其应用举例
    - 简单的线性回归模型
    - 简单的分类模型

## 1.1 向量和矩阵的求导数（求梯度）运算

### 1.1.1 行向量、列向量与矩阵对标量求导

!!! note ""

    行向量、列向量与矩阵类似，都是逐元素求导。

#### 矩阵对标量求导

!!! note "矩阵$Y=F(x)_{m\times n}$对标量$x$求导:"

    $$\frac{\text{d} Y}{\text{d} x} = \begin{bmatrix}
    \frac{\partial F_{11}}{\partial x} & \frac{\partial F_{12}}{\partial x} & \cdots & \frac{\partial F_{1n}}{\partial x} \\
    \frac{\partial F_{21}}{\partial x} & \frac{\partial F_{22}}{\partial x} & \cdots & \frac{\partial F_{2n}}{\partial x} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial F_{m1}}{\partial x} & \frac{\partial F_{m2}}{\partial x} & \cdots & \frac{\partial F_{mn}}{\partial x}
    \end{bmatrix}$$

### 1.1.2 标量对行向量、列向量与矩阵求导

!!! note ""
    以下三个都是逐元素被求导

#### 标量对列向量求导

!!! note "标量$y=f(X)$对列向量$\vec{x}=\begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} y}{\text{d} \vec{x}} = \begin{bmatrix}
    \frac{\partial f}{\partial x_1} \\
    \frac{\partial f}{\partial x_2} \\
    \vdots \\
    \frac{\partial f}{\partial x_m}
    \end{bmatrix}$$

#### 标量对行向量求导

!!! note "标量$y=f(\vec{x})$对行向量$\vec{x}^T=\begin{bmatrix}x_1 & x_2 & \cdots & x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} y}{\text{d} \vec{x}^T} = \begin{bmatrix}
    \frac{\partial f}{\partial x_1} &
    \frac{\partial f}{\partial x_2} &
    \cdots &
    \frac{\partial f}{\partial x_m}
    \end{bmatrix}$$

#### 标量对矩阵求导

!!! note "标量$y=f(x)$对矩阵$X_{m \times n}$求导"

    $$\frac{\text{d} y}{\text{d} X} = \begin{bmatrix}
    \frac{\partial f}{\partial x_{11}} & \frac{\partial f}{\partial x_{12}} & \cdots & \frac{\partial f}{\partial x_{1n}} \\
    \frac{\partial f}{\partial x_{21}} & \frac{\partial f}{\partial x_{22}} & \cdots & \frac{\partial f}{\partial x_{2n}} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial f}{\partial x_{m1}} & \frac{\partial f}{\partial x_{m2}} & \cdots & \frac{\partial f}{\partial x_{mn}}
    \end{bmatrix}$$

    !!! note "重要结论"
        
        $$
        \frac{\text{d} (\vec{u}^TX\vec{v})}{\text{d} X} = \vec{u}\vec{v}^T
        $$

        $$
        \frac{\text{d} (\vec{u}^TX^T\vec{v})}{\text{d} X} = \vec{v}\vec{u}^T
        $$

        $$
        \frac{\text{d} (\vec{u}^TXX^T\vec{v})}{\text{d} X} = X\vec{v}\vec{u}^T + X\vec{u}\vec{v}^T
        $$


        ??? example "证明"
            $$\begin{align*}
            \frac{\text{d} (\vec{u}^TX\vec{v})}{\text{d} X} &= \frac{\text{d} \begin{bmatrix}u_1 & u_2 & \cdots & u_m\end{bmatrix}\begin{bmatrix}x_{11} & x_{12} & \cdots & x_{1n} \\ x_{21} & x_{22} & \cdots & x_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ x_{m1} & x_{m2} & \cdots & x_{mn}\end{bmatrix}\begin{bmatrix}v_1 \\ v_2 \\ \vdots \\ v_n\end{bmatrix}}{\text{d} X} \\
            &= \frac{\text{d} (u_1x_{11}v_1+u_1x_{12}v_2+\cdots+u_1x_{1n}v_n+u_mx_{m1}v_1+u_mx_{m2}v_2+\cdots+u_mx_{mn}v_n)}{\text{d} X} \\
            &= \begin{bmatrix}u_1v_1 & u_1v_2 & \cdots & u_1v_n \\ u_2v_1 & u_2v_2 & \cdots & u_2v_n \\ \vdots & \vdots & \ddots & \vdots \\ u_mv_1 & u_mv_2 & \cdots & u_mv_n\end{bmatrix} \\
            &= \vec{u}\vec{v}^T\end{align*}$$

            $$\begin{align*}
            \frac{\text{d} (\vec{u}^TX^T\vec{v})}{\text{d} X} &= \frac{\text{d} \begin{bmatrix}u_1 & u_2 & \cdots & u_m\end{bmatrix}\begin{bmatrix}x_{11} & x_{21} & \cdots & x_{m1} \\ x_{12} & x_{22} & \cdots & x_{m2} \\ \vdots & \vdots & \ddots & \vdots \\ x_{1n} & x_{2n} & \cdots & x_{mn}\end{bmatrix}\begin{bmatrix}v_1 \\ v_2 \\ \vdots \\ v_n\end{bmatrix}}{\text{d} X} \\
            &= \frac{\text{d} (u_1x_{11}v_1+u_1x_{21}v_2+\cdots+u_1x_{m1}v_n+\cdots+u_mx_{1n}v_1+u_mx_{2n}v_2+\cdots+u_mx_{mn}v_n)}{\text{d} X} \\
            &= \begin{bmatrix}u_1v_1 & u_2v_1 & \cdots & u_mv_1 \\ u_1v_2 & u_2v_2 & \cdots & u_mv_2 \\ \vdots & \vdots & \ddots & \vdots \\ u_1v_n & u_2v_n & \cdots & u_mv_n\end{bmatrix} \\
            &= \vec{v}\vec{u}^T\end{align*}$$

            $$\begin{align*}
            \frac{\text{d} (\vec{u}^TXX^T\vec{v})}{\text{d} X} &= \frac{\text{d} 
            \begin{bmatrix}u_1 & u_2 & \cdots & u_m\end{bmatrix}
            \begin{bmatrix}
            x_{11} & x_{21} & \cdots & x_{m1} \\ 
            x_{12} & x_{22} & \cdots & x_{m2} \\ 
            \vdots & \vdots & \ddots & \vdots \\ 
            x_{1m} & x_{2m} & \cdots & x_{mm}
            \end{bmatrix}
            \begin{bmatrix}
            x_{11} & x_{12} & \cdots & x_{1m} \\ 
            x_{21} & x_{22} & \cdots & x_{2m} \\ 
            \vdots & \vdots & \ddots & \vdots \\ 
            x_{m1} & x_{m2} & \cdots & x_{mm}
            \end{bmatrix}
            \begin{bmatrix}v_1 \\ v_2 \\ \vdots \\ v_m\end{bmatrix}
            }{\text{d} X} \\
            &= \frac{\text{d} 
            \begin{bmatrix}u_1 & u_2 & \cdots & u_m\end{bmatrix}
            \begin{bmatrix}x_{11}^2+x_{21}^2+\cdots+x_{m1}^2 & x_{11}x_{12}+x_{21}x_{22}+\cdots+x_{m1}x_{m2} & \cdots & x_{11}x_{1m}+x_{21}x_{2m}+\cdots+x_{m1}x_{mm} \\
            x_{12}x_{11}+x_{22}x_{21}+\cdots+x_{m2}x_{m1} & x_{12}^2+x_{22}^2+\cdots+x_{m2}^2 & \cdots & x_{12}x_{1m}+x_{22}x_{2m}+\cdots+x_{m2}x_{mm} \\
            \vdots & \vdots & \ddots & \vdots \\
            x_{1m}x_{11}+x_{2m}x_{21}+\cdots+x_{mm}x_{m1} & x_{1m}x_{12}+x_{2m}x_{22}+\cdots+x_{mm}x_{m2} & \cdots & x_{1m}^2+x_{2m}^2+\cdots+x_{mm}^2
            \end{bmatrix}
            \begin{bmatrix}v_1 \\ v_2 \\ \vdots \\ v_m\end{bmatrix}
            }{\text{d} X} \\
            &= \frac{\text{d} 
            \begin{pmatrix}
            \begin{aligned}
            &u_1(x_{11}^2+x_{21}^2+\cdots+x_{m1}^2)v_1+u_1(x_{11}x_{12}+x_{21}x_{22}+\cdots+x_{m1}x_{m2})v_2+\cdots+u_1(x_{11}x_{1m}+x_{21}x_{2m}+\cdots+x_{m1}x_{mm})v_m \\
            +&u_2(x_{12}x_{11}+x_{22}x_{21}+\cdots+x_{m2}x_{m1})v_1+u_2(x_{12}^2+x_{22}^2+\cdots+x_{m2}^2)v_2+\cdots+u_2(x_{12}x_{1m}+x_{22}x_{2m}+\cdots+x_{m2}x_{mm})v_m \\
            +&\cdots \\
            +&u_m(x_{1m}x_{11}+x_{2m}x_{21}+\cdots+x_{mm}x_{m1})v_1+u_m(x_{1m}x_{12}+x_{2m}x_{22}+\cdots+x_{mm}x_{m2})v_2+\cdots+u_m(x_{1m}^2+x_{2m}^2+\cdots+x_{mm}^2)v_m
            \end{aligned}
            \end{pmatrix}
            -}{\text{d} X} \\
            &= \begin{bmatrix}
            u_1(v_1x_{11}+v_2x_{12}+\cdots+v_mx_{1m}) +v_1(u_1x_{11}+u_2x_{12}+\cdots+u_mx_{1m}) & u_2(v_1x_{11}+v_2x_{12}+\cdots+v_mx_{1m}) +v_2(u_1x_{11}+u_2x_{12}+\cdots+u_mx_{1m}) & \cdots & u_m(v_1x_{11}+v_2x_{12}+\cdots+v_mx_{1m}) +v_m(u_1x_{11}+u_2x_{12}+\cdots+u_mx_{1m}) \\
            u_1(v_1x_{21}+v_2x_{22}+\cdots+v_mx_{2m}) +v_1(u_1x_{21}+u_2x_{22}+\cdots+u_mx_{2m}) & u_2(v_1x_{21}+v_2x_{22}+\cdots+v_mx_{2m}) +v_2(u_1x_{21}+u_2x_{22}+\cdots+u_mx_{2m}) & \cdots & u_m(v_1x_{21}+v_2x_{22}+\cdots+v_mx_{2m}) +v_m(u_1x_{21}+u_2x_{22}+\cdots+u_mx_{2m}) \\
            \vdots & \vdots & \ddots & \vdots \\
            u_1(v_1x_{m1}+v_2x_{m2}+\cdots+v_mx_{mm}) +v_1(u_1x_{m1}+u_2x_{m2}+\cdots+u_mx_{mm}) & u_2(v_1x_{m1}+v_2x_{m2}+\cdots+v_mx_{mm}) +v_2(u_1x_{m1}+u_2x_{m2}+\cdots+u_mx_{mm}) & \cdots & u_m(v_1x_{m1}+v_2x_{m2}+\cdots+v_mx_{mm}) +v_m(u_1x_{m1}+u_2x_{m2}+\cdots+u_mx_{mm})
            \end{bmatrix} \\
            =&
            \begin{bmatrix}
            u_1X\vec{v} & u_2X\vec{v} & \cdots & u_mX\vec{v} 
            \end{bmatrix} + \begin{bmatrix}
            v_1X\vec{u} & v_2X\vec{u} & \cdots & v_mX\vec{u}
            \end{bmatrix} \\
            =& X\vec{v}\vec{u}^T + X\vec{u}\vec{v}^T
            \end{align*}$$

### 1.1.3 向量积对列向量求导

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

### 1.1.4 行列向量对行列向量求导

#### 行向量对列向量求导

!!! note "行向量$\vec{y}^T=\begin{bmatrix}f_1(x) & f_2(x) & \cdots & f_n(x)\end{bmatrix}$对列向量$\vec{x}=\begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} \vec{y}^T}{\text{d} \vec{x}} = \begin{bmatrix}
    \frac{\partial f_1}{\partial x_1} & \frac{\partial f_2}{\partial x_1} & \cdots & \frac{\partial f_n}{\partial x_1} \\
    \frac{\partial f_1}{\partial x_2} & \frac{\partial f_2}{\partial x_2} & \cdots & \frac{\partial f_n}{\partial x_2} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial f_1}{\partial x_m} & \frac{\partial f_2}{\partial x_m} & \cdots & \frac{\partial f_n}{\partial x_m}
    \end{bmatrix}$$
    
    !!! note "重要结论"
        $$\frac{\text{d} \vec{x}^T}{\text{d} \vec{x}}= I,\frac{\text{d} (A\vec{x})^T}{\text{d} \vec{x}} = A^T$$

#### 列向量对行向量求导

!!! note "列向量$\vec{y}=\begin{bmatrix}f_1(x) \\ f_2(x) \\ \vdots \\ f_n(x)\end{bmatrix}$对行向量$\vec{x}^T=\begin{bmatrix}x_1 & x_2 & \cdots & x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} \vec{y}}{\text{d} \vec{x}^T} =(\frac{\text{d} \vec{y}^T}{\text{d} \vec{x}})^T = \begin{bmatrix}
    \frac{\partial f_1}{\partial x_1} & \frac{\partial f_1}{\partial x_2} & \cdots & \frac{\partial f_1}{\partial x_m} \\
    \frac{\partial f_2}{\partial x_1} & \frac{\partial f_2}{\partial x_2} & \cdots & \frac{\partial f_2}{\partial x_m} \\
    \vdots & \vdots & \ddots & \vdots \\
    \frac{\partial f_n}{\partial x_1} & \frac{\partial f_n}{\partial x_2} & \cdots & \frac{\partial f_n}{\partial x_m}
    \end{bmatrix}$$

    !!! note "重要结论"
        $$\frac{\text{d} \vec{x}}{\text{d} \vec{x}^T}= I,\frac{\text{d} (A\vec{x})}{\text{d} \vec{x}^T} = A$$

#### 行向量对行向量求导

!!! note "行向量$\vec{y}^T=\begin{bmatrix}y_1 & y_2 & \cdots & y_n\end{bmatrix}$对行向量$\vec{x}^T=\begin{bmatrix}x_1 & x_2 & \cdots & x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} \vec{y}^T}{\text{d} \vec{x}^T} = \begin{bmatrix}
    \frac{\partial \vec{y}^T}{\partial x_1} , \frac{\partial \vec{y}^T}{\partial x_2} , \cdots , \frac{\partial \vec{y}^T}{\partial x_m}
    \end{bmatrix}$$

#### 列向量对列向量求导

!!! note "列向量$\vec{y}=\begin{bmatrix}y_1 \\ y_2 \\ \vdots \\ y_n\end{bmatrix}$对列向量$\vec{x}=\begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m\end{bmatrix}$求导:"

    $$\frac{\text{d} \vec{y}}{\text{d} \vec{x}} = \begin{bmatrix}
    \frac{\partial y_1}{\partial \vec{x}} \\
    \frac{\partial y_2}{\partial \vec{x}} \\
    \vdots \\
    \frac{\partial y_n}{\partial \vec{x}}
    \end{bmatrix}$$
