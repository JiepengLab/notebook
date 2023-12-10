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
        \frac{\text{d} (\vec{u}^TXX^T\vec{v})}{\text{d} X} = X(\vec{v}\vec{u}^T + \vec{u}\vec{v}^T)
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

        然后，我们不加证明地给出(证明写累了QAQ)：

        $$
        \frac{\text{d} (\vec{u}^TXDX^T\vec{v})}{\text{d} X} = D^TX\vec{v}\vec{u}^T + DX\vec{u}\vec{v}^T
        $$


        !!! note "应用"
            
            $$\begin{aligned}
            \frac{\text{d}[(X\vec{u}-\vec{v})^T(X\vec{u}-\vec{v})]}{\text{d} X} &= \frac{\text{d}[(\vec{u}^TX^T-\vec{v}^T)(X\vec{u}-\vec{v})]}{\text{d} X} \\
            &= \frac{\text{d}[\vec{u}^TX^TX\vec{u}]}{\text{d} X} - \frac{\text{d}[\vec{u}^TX^T\vec{v}]}{\text{d} X} - \frac{\text{d}[\vec{v}^TX\vec{u}]}{\text{d} X} + \frac{\text{d}[\vec{v}^T\vec{v}]}{\text{d} X} \\
            &= 2X\vec{u}\vec{u}^T - \vec{v}\vec{u}^T - \vec{v}\vec{u}^T + 0\\
            &= 2(X\vec{u}-\vec{v})\vec{u}^T
            \end{aligned}$$

            之后我们会用链式法则再把这道题做一遍

### 1.1.3 行列向量对行列向量求导

实际上就是每个元素对后面的那个向量进行求导，可能刚接触的时候不太熟悉，这里逐一列举：

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

### 1.1.4 行列向量、矩阵对矩阵求导

其实就是每个元素对后面的矩阵求导，然后每个元素生成一个矩阵，按原来的顺序拼接起来，不常用到，这里有个概念即可。

### 1.1.5 向量积对列向量求导

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
        
        $$\frac{\partial \vec{x}^T\vec{a}}{\partial \vec{x}} = \frac{\partial \vec{a}^T\vec{x}}{\partial \vec{x}} = \vec{a}$$
        
        $$
        \frac{\text{d} \|\vec{x}\|_2^2}{\text{d} \vec{x}}=\frac{\text{d} (\vec{x}^T\vec{x})}{\text{d} \vec{x}} = 2\vec{x},\frac{\text{d} (\vec{x}^TA\vec{x})}{\text{d} \vec{x}} = (A+A^T)\vec{x}
        $$
    
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

### 1.1.6 链式法则

有些求导运算中中更好的方法是采用链式法则：

!!! note ""
    $$\begin{aligned}
    \frac{\text{d}[(X\vec{u}-\vec{v})^T(X\vec{u}-\vec{v})]}{\text{d} X} &= \frac{\text{d}[(X\vec{u}-\vec{v})^T(X\vec{u}-\vec{v})]}{\text{d} (X\vec{u}-\vec{v})}\frac{\text{d} (X\vec{u}-\vec{v})}{\text{d} X} \\
    &= 2(X\vec{u}-\vec{v})\vec{u}^T
    \end{aligned}$$

!!! note ""
    $$\begin{aligned}
    \frac{\partial[(X\vec{b}+c)^TD(X\vec{b}+c)]}{\partial X} &= \frac{\partial[(X\vec{b}+c)^TD(X\vec{b}+c)]}{\partial (X\vec{b}+c)}\frac{\partial (X\vec{b}+c)}{\partial X} \\
    &= (D+D^T)(X\vec{b}+c)\vec{b}^T
    \end{aligned}$$

### 1.1.7 方阵的迹对方阵求导

我们来研究一下矩阵的微分和矩阵的迹的关系：

??? note "复习一下微分"
    取矩阵变元的实值标量函数
    
    $f(\pmb{X}),\pmb{X}_{m\times n}=(x_{ij})_{i=1,j=1}^{m,n}$

    它也是多元函数，设其可微，则它的全微分，就是：

    $$\begin{aligned} \mathbb{d}f(\pmb{X}) &=\frac{\partial f}{\partial x_{11}}\mathbb{d}x_{11}+\frac{\partial f}{\partial x_{12}}\mathbb{d}x_{12} + \cdots+\frac{\partial f}{\partial x_{1n}}\mathbb{d}x_{1n}\\ &+\frac{\partial f}{\partial x_{21}}\mathbb{d}x_{21}+\frac{\partial f}{\partial x_{22}}\mathbb{d}x_{22} + \cdots+\frac{\partial f}{\partial x_{2n}}\mathbb{d}x_{2n}\\ &+\cdots\\ &+\frac{\partial f}{\partial x_{m1}}\mathbb{d}x_{m1}+\frac{\partial f}{\partial x_{m2}}\mathbb{d}x_{m2} + \cdots+\frac{\partial f}{\partial x_{mn}}\mathbb{d}x_{mn} \end{aligned} $$

    我们从这个结果中发现，它其实就是矩阵 $(\frac{\partial f}{\partial x_{ij}})_{i=1,j=1}^{m,n}$ 与矩阵 $(\mathbb{d}x_{ij})_{i=1,j=1}^{m,n}$ 对应位置的元素相乘并相加，则该式也可以写成迹的形式，即：

    $$\begin{aligned} \mathbb{d}f(\pmb{X}) &=\frac{\partial f}{\partial x_{11}}\mathbb{d}x_{11}+\frac{\partial f}{\partial x_{12}}\mathbb{d}x_{12} + \cdots+\frac{\partial f}{\partial x_{1n}}\mathbb{d}x_{1n}\\ &+\frac{\partial f}{\partial x_{21}}\mathbb{d}x_{21}+\frac{\partial f}{\partial x_{22}}\mathbb{d}x_{22} + \cdots+\frac{\partial f}{\partial x_{2n}}\mathbb{d}x_{2n}\\ &+\cdots\\ &+\frac{\partial f}{\partial x_{m1}}\mathbb{d}x_{m1}+\frac{\partial f}{\partial x_{m2}}\mathbb{d}x_{m2} + \cdots+\frac{\partial f}{\partial x_{mn}}\mathbb{d}x_{mn} \\\\ &=\mathbb{tr}( \begin{bmatrix} \frac{\partial f}{\partial x_{11}}&\frac{\partial f}{\partial x_{21}}&\cdots&\frac{\partial f}{\partial x_{m1}} \\ \frac{\partial f}{\partial x_{12}}&\frac{\partial f}{\partial x_{22}}& \cdots & \frac{\partial f}{\partial x_{m2}}\\ \vdots&\vdots&\vdots&\vdots\\ \frac{\partial f} {\partial x_{1n}}&\frac{\partial f}{\partial x_{2n}}&\cdots&\frac{\partial f}{\partial x_{mn}} \end{bmatrix}_{n\times m} \begin{bmatrix} \mathbb{d}x_{11} & \mathbb{d}x_{12} & \cdots & \mathbb{d}x_{1n} \\ \mathbb{d}x_{21} & \mathbb{d}x_{22} & \cdots & \mathbb{d}x_{2n} \\ \vdots&\vdots&\vdots&\vdots\\ \mathbb{d}x_{m1} & \mathbb{d}x_{m2} & \cdots & \mathbb{d}x_{mn} \end{bmatrix}_{m \times n} ) \end{aligned}  $$

??? note "矩阵微分和迹的关系: $\begin{aligned} \mathbb{d}f(\pmb{X}) &=\mathbb{tr}(\frac{\partial f(\pmb{X})}{\partial\pmb{X}^T} \mathbb{d}\pmb{X})\end{aligned}$"

    $\pmb{X}_{m \times n}$ 自己就是矩阵变元为 $\pmb{X}_{m \times n}$ 的实矩阵函数，它的每个元素是 $x_{ij}$ ，每个元素的全微分是 $\mathbb d{x_{ij}}$ 。

    因此， $\pmb{X}_{m \times n}$ 的矩阵微分是：

    $$
    \begin{aligned} \mathbb{d}\pmb{X}_{m \times n} &= \begin{bmatrix} \mathbb{d}x_{11}& \mathbb{d}x_{12} & \cdots & \mathbb{d}x_{1n} \\ \mathbb{d}x_{21}& \mathbb{d}x_{22} & \cdots & \mathbb{d}x_{2n} \\ \vdots&\vdots&\vdots&\vdots \\ \mathbb{d}x_{m1}& \mathbb{d}x_{m2} & \cdots & \mathbb{d}x_{mn} \\ \end{bmatrix}_{m \times n} \end{aligned}
    $$

    向量 $\pmb{x}=[x_1,x_2,\cdots,x_n]^T$ 的矩阵微分是：

    $$
    \begin{aligned} \mathbb{d}\pmb{x} &= \begin{bmatrix} \mathbb{d}x_{1}\\ \mathbb{d}x_{2}\\ \vdots \\ \mathbb{d}x_{n} \\ \end{bmatrix}_{n \times 1} \end{aligned}
    $$

    我们现在回到矩阵变元的实值标量函数的全微分：

    $$\begin{aligned} \mathbb{d}f(\pmb{X}) &=\frac{\partial f}{\partial x_{11}}\mathbb{d}x_{11}+\frac{\partial f}{\partial x_{12}}\mathbb{d}x_{12} + \cdots+\frac{\partial f}{\partial x_{1n}}\mathbb{d}x_{1n}\\ &+\frac{\partial f}{\partial x_{21}}\mathbb{d}x_{21}+\frac{\partial f}{\partial x_{22}}\mathbb{d}x_{22} + \cdots+\frac{\partial f}{\partial x_{2n}}\mathbb{d}x_{2n}\\ &+\cdots\\ &+\frac{\partial f}{\partial x_{m1}}\mathbb{d}x_{m1}+\frac{\partial f}{\partial x_{m2}}\mathbb{d}x_{m2} + \cdots+\frac{\partial f}{\partial x_{mn}}\mathbb{d}x_{mn} \\\\ &=\mathbb{tr}( \begin{bmatrix} \frac{\partial f}{\partial x_{11}}&\frac{\partial f}{\partial x_{21}}&\cdots&\frac{\partial f}{\partial x_{m1}} \\ \frac{\partial f}{\partial x_{12}}&\frac{\partial f}{\partial x_{22}}& \cdots & \frac{\partial f}{\partial x_{m2}}\\ \vdots&\vdots&\vdots&\vdots\\ \frac{\partial f} {\partial x_{1n}}&\frac{\partial f}{\partial x_{2n}}&\cdots&\frac{\partial f}{\partial x_{mn}} \end{bmatrix}_{n\times m} \begin{bmatrix} \mathbb{d}x_{11} & \mathbb{d}x_{12} & \cdots & \mathbb{d}x_{1n} \\ \mathbb{d}x_{21} & \mathbb{d}x_{22} & \cdots & \mathbb{d}x_{2n} \\ \vdots&\vdots&\vdots&\vdots\\ \mathbb{d}x_{m1} & \mathbb{d}x_{m2} & \cdots & \mathbb{d}x_{mn} \end{bmatrix}_{m \times n} ) \end{aligned}$$

    观察结果，发现在 $\mathbb{tr}$ 中，左边的矩阵，其实就是式：

    $$\begin{aligned} \text{D}_{\pmb{X}}f(\pmb{X})= \frac{\partial f(\pmb{X})}{\partial \pmb{X}^T_{m\times n}}\end{aligned} $$

    而右边的矩阵，其实就是：

    $$
    \begin{aligned} \mathbb{d}\pmb{X}_{m \times n} &= \begin{bmatrix} \mathbb{d}x_{11}& \mathbb{d}x_{12} & \cdots & \mathbb{d}x_{1n} \\ \mathbb{d}x_{21}& \mathbb{d}x_{22} & \cdots & \mathbb{d}x_{2n} \\ \vdots&\vdots&\vdots&\vdots \\ \mathbb{d}x_{m1}& \mathbb{d}x_{m2} & \cdots & \mathbb{d}x_{mn} \\ \end{bmatrix}_{m \times n} \end{aligned}$$

    因此，矩阵变元的实值标量函数的全微分，可以写成：

    $$\begin{aligned} \mathbb{d}f(\pmb{X}) &=\mathbb{tr}(\frac{\partial f(\pmb{X})}{\partial\pmb{X}^T} \mathbb{d}\pmb{X})\end{aligned}$$

    别忘了我们的目标是什么，其实就是要求 $\frac{\partial f(\pmb{X})}{\partial \pmb{X}^T}$ 。所以，只要我们可以把一个矩阵变元的实值标量函数的全微分写成上式，我们就找到了矩阵求导的结果。（已经有人证明，这样的结果是唯一的。即若 $\mathbb{d}f(\pmb{X}) =\mathbb{tr}(\pmb{A}_1\mathbb{d}\pmb{X}) = \mathbb{tr}(\pmb{A}_2\mathbb{d}\pmb{X})$ ，则 $\pmb{A}_1=\pmb{A}_2$ )

    对于向量变元的实值标量函数的全微分，同样可以写成：

    $$\begin{aligned} \mathbb{d}f(\pmb{x}) &=\mathbb{tr}(\frac{\partial f(\pmb{x})}{\partial\pmb{x}^T} \mathbb{d}\pmb{x})\end{aligned} $$

!!! note "实值标量函数$f(\pmb{X})$的微分与迹的关系"
    对于实值标量函数 $f(\pmb{X})$ ， $\mathbb{tr}(f(\pmb{X})) =f(\pmb{X})$ ， $\mathbb{d}f(\pmb{X})=\mathbb{tr}(\mathbb{d}f(\pmb{X}))$

    所以有

    $$\mathbb{d}f(\pmb{X}) = \mathbb{d}(\mathbb{tr}f(\pmb{X}))=\mathbb{tr}(\mathbb{d}f(\pmb{X})) $$

    如果实值标量函数本身就是某个矩阵函数 $\pmb{F}_{p \times p}(\pmb{X})$ 的迹，如 $\mathbb{tr}{\pmb{F}(\pmb{X})}$ ，则由全微分的线性法，得：

    $$\mathbb{d}(\mathbb{tr}{\pmb{F}_{p\times p}(\pmb{X})}) = \mathbb{d}(\sum_{i=1}^pf_{ii}(\pmb{X})) = \sum_{i=1}^p\mathbb{d}(f_{ii}(\pmb{X})) = \mathbb{tr}(\mathbb{d}F_{p \times p}(\pmb{X})) $$

其实我上面列这么多，就是为了推出方阵与迹的关系：

!!! tip "方阵与迹的关系"
    $$\mathbb{d}(\mathbb{tr}{\pmb{F}_{p\times p}(\pmb{X})}) = \mathbb{tr}(\mathbb{d}F_{p \times p}(\pmb{X})) $$

    $$\begin{aligned} \mathbb{d}f(\pmb{X}) &=\mathbb{tr}(\frac{\partial f(\pmb{X})}{\partial\pmb{X}^T} \mathbb{d}\pmb{X})\end{aligned}$$

    !!! example "$\frac{\partial \text{tr}(X^2B)}{\partial X} = (XB+BX)^T$"
        $$
        \begin{aligned}
        \text{d}(\text{tr}(X^2B)) &= \text{tr}(\text{d}(X^2B)) \\
        &= \text{tr}((\text{d}X)XB+X\text{d}(XB)) \\
        &= \text{tr}((\text{d}X)XB+X(\text{d}X)B) \\
        &= \text{tr}((\text{d}X)XB)+\text{tr}(X(\text{d}X)B) \\
        &= \text{tr}(XB(\text{d}X))+\text{tr}(BX(\text{d}X)) \\
        &= \text{tr}((XB+BX)(\text{d}X)) \\
        \end{aligned}
        $$
        
        所以：

        $$\frac{\partial \text{tr}(X^2B)}{\partial X^T} = XB+BX$$

        因为对两边施加转置时，迹不变，所以：

        $$\frac{\partial \text{tr}(X^2B)}{\partial X} = (XB+BX)^T$$

!!! note "重要结论"
    $$
    \begin{aligned}
    \frac{\partial \text{tr}(X)}{\partial X} = \frac{\partial \text{tr}(X)^T}{\partial X} &=\frac{\partial \text{tr}(X)}{\partial X^T} = I\\
    \frac{\partial \text{tr}(AX)}{\partial X} = \frac{\partial \text{tr}(XA)}{\partial X} = A^T&, \frac{\partial \text{tr}(AX^T)}{\partial X} = \frac{\partial \text{tr}(X^TA)}{\partial X} = A\\
    \frac{\partial \text{tr}(AXB)}{\partial X} = \frac{\partial \text{tr}(XBA)}{\partial X} =(BA)^T&, \frac{\partial \text{tr}(AX^TB)}{\partial X} = \frac{\partial \text{tr}(X^TBA)}{\partial X} = BA\\
    \frac{\partial \text{tr}(X^2)}{\partial X} = 2X^T&,
    \frac{\partial \text{tr}(X^2B)}{\partial X} = (XB+BX)^T\\
    \frac{\partial \text{tr}(X^TBX)}{\partial X} = (B+B^T)X&, \frac{\partial \text{tr}(XBX^T)}{\partial X} = X(B^T+B)\\
    \frac{\partial \text{tr}(BXX^T)}{\partial X} = (B+B^T)X&, \frac{\partial \text{tr}(AXBX)}{\partial X} = A^TX^TB^T+B^TX^TA^T\\
    \frac{\partial \text{tr}(XX^T)}{\partial X} = \frac{\partial \text{tr}(X^TX)}{\partial X} &=\frac{\partial \|X\|^2_F}{\partial X}= 2X\\
    \nabla_X tr(AXAXAX)=3(AXAXA)^T&, \nabla_X tr(YX^k)=\sum_{i=0}^{k-1}(X^iYX^{k-1-i})^T\\
    \end{aligned}
    $$

### 1.1.8

$$
\begin{aligned}\nabla_{X}\ln\bigl|X\bigr|&=(X^{-1}\bigr)^{T}=X^{-T} \\
\nabla_X\ln\bigl|X^{-1}\bigr|&=-\bigl(X^{-1}\bigr)^T=-X^{-T} \\
\nabla_X\ln\bigl|AX+B\bigr|&=A^T\bigl(AX+B\bigr)^{-T} \\
\nabla_X\ln\left|I+A^TXA\right| &=A(I+A^TXA)^{-T}A^T  \\
\nabla_{X}\ln\bigl|I-A^{T}XA\bigr|&=-A(I-A^{T}XA)^{-T}A^{T}\end{aligned} 
$$