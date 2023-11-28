# 3 图像灰度变换 | Image grayscale transform

## 灰度感知 | Grayscale perception

根据韦伯定理，我们有

$$\dfrac{\Delta I}{I}\approx K_{Weber}\approx 1\%\sim 2\%$$

$$\frac{I_{max}}{I_{min}}=(1+K_{Weber})^{255} \approx 13 \sim 156$$

另外人们发现感知能力是服从$\log(I)$ 的，这称作**Fechner’s Law**。

## 可视化增强 | Visibility enhancement

### $\gamma$ 校正 | $\gamma$ correction

我们可以用 $\gamma$ 来近似表示这个关系，即

![Alt text](images/image-44.png){: width=50%}

用 $\gamma$ 来增强可视化效果，称作 $\gamma$ 校正。

![Alt text](images/image-45.png)

!!! note "图像通过gamma校正进行操作"

    ![Alt text](images/image-46.png)

    > 姑且可以认为这样操作与调整曝光时间的效果是一样的

!!! note "不同$\gamma$的渐变效果"

    ![Alt text](images/image-47.png)

### 对数操作 | logarithmic operation

为了增强图像的可视信息，我们对图像中的像素进行基于对数的操作，这更加符合人眼的感知。

$$L_d=\dfrac{\log(L_w+1)}{\log(L_{max}+1)}$$

其中，$L_d$ 是显示亮度，$L_w$ 是真实世界亮度，$L_{max}$ 是场景中的最亮值。

这个映射能够确保不管场景的动态范围是怎么样的，其最大值都能映射到1（白），其他的值能够比较平滑地变化。

## 灰度图像及其直方图 | Grayscale image and histogram

### Grayscale image

- 由像素组成的二维阵列。（M 行 × N 列）
- 每个像素由 8 位表示。灰度有 $2^8 = 256$ 级，分别为 p=0,1,2,...,255。
- 灰度强度越小，像素越暗，反之亦然。 p = 0 为黑色， p = 255 为白色。

### Histogram

灰度直方图是一类统计图形，它表示一幅图像中各个灰度等级的像素个数在像素总数中所占的比重。

***e.g.***  

![Alt text](images/image-65.png){: width=30%}

量化：如 256 分为 8 个灰度级， 0-32 为一个灰度级，以此类推... 每个柱子就反映了像素数目占的比例。

设灰度等级范围为$[0,L-1]$ ，灰度直方图用下列离散函数来表示：

$$h(r_k)=n_k$$

其中，$r_k$ 为第$k$级灰度，$n_k$ 是图像中具有灰度级 $r_k$ 的像素数目，$0 \leq k \leq L-1,0 \leq n_k \leq n-1$, $n$ 为图像总的像素数目。  

我们通常用概率密度函数来归一化直方图：

$$P(r_k)=\dfrac{n_k}{n}$$

$P(r_k)$为灰度级$r_k$所发生的概率（概率密度函数）。此时，满足下列条件：  

$$\sum\limits_{k=0}^{L-1}P(r_k)=1$$

!!! Example
    ![Alt text](images/image-39.png)

## 彩色图像及其直方图 | Color image and histogram

### Color histogram

接下来我们介绍彩色图像的直方图。彩色直方图也是一类统计图形，它表示一幅图像中 r,g,b 通道上<u>各个</u>灰度等级的像素个数在像素总数中所占的比重。

![Alt text](images/image-40.png)

## 直方图的特性 | Characteristics of histogram

直方图  

* 是空间域处理技术的基础。
* 反映图像灰度的分布规律，但不能体现图像中的细节变化情况。
* 对于一幅给定的图像，其直方图是唯一的。
* 不同的图像可以对应相同的直方图。

!!! note "不同的图像可以对应相同的直方图。"
    ![Alt text](images/image-41.png)

对直方图进行操作能有效地用于图像增强、压缩和分割, 他们是图像处理的一个实用手段。

!!! note "例如"
    ![Alt text](images/image-42.png)
    缺点：对直方图直接操作会带来噪声

!!! Question "用直方图表示图像的特征有什么缺点？"

    ![Alt text](images/image-43.png)

    直方图把结构信息丢失，只知道颜色分布，不知道结构。  

## 直方图变换 | Histogram transform

### 变换例子

#### 直方图均衡化 | Histogram equalization

!!! note ""
    直方图均衡化是一种简单有效的图像增强技术，通过改变图像的直方图来改变图像中各像素的灰度，主要用于增强动态范围偏小的图像的对比度。原始图像由于其灰度分布可能集中在较窄的区间，造成图像不够清晰。例如，过曝光图像的灰度级集中在高亮度范围内，而曝光不足将使图像灰度级集中在低亮度范围内。采用直方图均衡化，可以把原始图像的直方图变换为均匀分布（均衡）的形式，这样就增加了像素之间灰度值差别的动态范围，从而达到增强图像整体对比度的效果。换言之，直方图均衡化的基本原理是：对在图像中像素个数多的灰度值（即对画面起主要作用的灰度值）进行展宽，而对像素个数少的灰度值（即对画面不起主要作用的灰度值）进行归并，从而增大对比度，使图像清晰，达到增强的目的。

直方图均衡化：将原图像的非均匀分布的直方图通过变换函数 $T$ 修正为均分布的直方图，然后按均衡直方图修正原图像。

图像均衡化处理后，图像的直方图是平直的，即各灰度级具有相同的出现频数：

![Alt text](images/image-48.png)

所以我们就是要找到变换函数 $T$ ，确定如下对应关系：

$$s=T(r)$$

从而确保输入图像中的每一个灰度 $r$ 都能转换为新图像中的一个对应的灰度 $s$ 。

##### 变换函数 $T$ - 连续灰度变化

假设：  

* 令 $r$ 和 $s$ 分别代表变化前后图像的灰度级，并且 $0\leq r,s \leq 1$ 。
* $P(r)$ 和 $P(s)$ 分别为变化前后各级灰度的概率密度函数（$r$ 和 $s$ 值已归一化，最大灰度值为 $1$ ）

规定：  

* 在$0\leq r \leq 1$中，$T(r)$ 是单调递增函数，并且 $0\leq T(r)\leq 1$。
* 反变换 $r = T^{-1}(s)$ 也为单调递增函数。

考虑到灰度变换不影响像素的位置分布，也不会增减像素数目。所以有：

$$\int_{0}^rP(r)dr =\int_{0}^sP(s)ds=\int_{0}^s1ds=s=T(r)$$

!!! question "为什么 $P(s)= 1$ ？ "
    因为这里 $P(s)$ 是概率密度函数，因为 $s$ 是均匀分布的，所以 $P(s)= 1$ 。

因此 $s=T(r)=\int_{0}^rP(r)dr$  
即转换函数 $T$ 在变量 $r$ 处的函数值 $s$，是原直方图中灰度等级为 $[0,r]$ 以内的直方图曲线所覆盖的面积。

##### 变换函数 $T$ - 离散灰度变化

设一幅图像的像素总数为 $n$ ，分 $L$ 个灰度级，$n_k$ 为第 $k$ 个灰度级出现的像素数，则第 $k$ 个灰度级出现的概率为：

$$P(r_k)=\dfrac{n_k}{n}\quad (0\leq r_k\leq 1, k=0, 1,2,...L-1)$$

**离散**灰度直方图均衡化的转换公式为：

$$s_k=T(r_k)=\sum\limits_{i=0}^kP(r_i)=\sum\limits_{i=0}^k\dfrac{n_i}{n}=\dfrac{1}{n}\sum\limits_{i=0}^k n_i$$  

对于原直方图中的任意一个灰度级 $r_k$，只需将灰度级为 $[0,r_k]$ 以内的所有像素个数的和除以图像的像素总数，就可以得到转换之后的对应灰度级 $s_k$

##### 直方图均衡化的步骤

以灰度直方图为例：

1. 计算原始图像的灰度直方图 $n_k$。
2. 计算原始图像的像素总个数（对于 bmp 文件，这一数值储存在图像信息头的 `biSizeImage` 中）。
3. 计算原始图像的灰度分布频率 $P (r_k)$.
4. 计算原始图像的灰度累积分布频率 $s_k$.
5. 将归一化的 $s_k$ 乘以 $L - 1$ 再四舍五入，以使得均衡化后图像的灰度级与归一化前的原始图像一致。
6. 根据以上映射关系，参照原始图像中的像素，写出直方图均衡化之后的图像。由于“四舍五入”的关系，几个相邻的 $s_k$ 可能会落入同一个灰度级。也就是说离散直方图均衡化后，不同灰度的概率可能不同。

!!! Example
    设图像有 $64*64=4096$ 个像素，有8个灰度级，灰度分布为:

    ![Alt text](images/image-79.png)

    1. 计算 $s_k$(利用前缀和)
    2. 把计算的 $s_k$ 就近安排到8个灰度级中

    ![Alt text](images/image-50.png)

    通过直方图，可以看出，灰度分布比之前更加均匀了。

    ![Alt text](images/image-80.png)

!!! Question
    按照均衡化的要求，在均衡化后的结果直方图中，各灰度级发生的概率应该是相同的，如右上图所示连续灰度级均衡化结果那样。但是，如刚刚中离散灰度级均衡化后，各灰度级出现的概率并不完全一样。为什么？

    * 步骤2中，所得的 $s_k$ 不可能正好等于8级灰度值中的某一级，因此需要就近归入某一个灰度级中。这样，相邻的多个 $s_k$ 就可能落入同一个灰度级，需要在步骤3时将处于同一个灰度级的像素个数累加。因此，离散灰度直方图均衡化操作以后，每个灰度级处的概率密度（或像素个数）并不完全一样。

直方图均衡化实质上是减少图像的灰度级以换取对比度的加大。在均衡过程中，原来的直方图上出现概率较小的灰度级被归入很少几个甚至一个灰度级中，故得不到增强。若这些灰度级所构成的图像细节比较重要，则需采用局部区域直方图均衡化处理。

!!! note "Matlab实现"
    ```matlab
    I = imread('pic.tif');
    J = histeq(I);
    imshow(I);
    imshow(J);
    ```

#### 直方图匹配 | Histogram fitting

* 所谓直方图匹配，就是修改一幅图像的直方图，使得它与另一幅图像的直方图匹配或具有一种预先规定的函数形状。  
* 直方图匹配的目标，是突出我们感兴趣的灰度范围，使图像质量改善。  
* 利用直方图均衡化操作，可以实现直方图匹配过程。

![Alt text](images/image-55.png)

具体过程：  

* Base on the equation $s=T(r)=\int_0^rP(r)dr$ map the gray level r in the resulted histogram to be s.  

    ![Alt text](images/image-52.png)

* Base on the equation $v=T(z)=\int_0^zP(z)dz$ map the gray level z in the resulted histogram to be v.

    ![Alt text](images/image-53.png)

* 由$v = G(z)$得到 $z =G^{-1}(v)$。由于s和v有相同的分布，逐一取$v = s$，求出与r对应的$z =G^{-1}(s)$。

    ![Alt text](images/image-54.png)

方法简述：

在步骤 1 和 2 中，分别计算获得两张表（参见直方图均衡化中的算例），从中选取一对 $v_k$ 、$s_j$ ，使 $v_k = s_j$，并从两张表中查出对应的$z_k$、$r_j$。这样，原始图像中灰度级为 $r_j$ 的所有像素都映射成灰度级 $z_k$ ，最终得到所期望的图像。

直方图（灰度）变换用以确定变换前后两个直方图灰度级之间对应关系的变换函数。经过直方图变换以后，原图像中的任何一个灰度值都唯一对应一个新的灰度值，从而构成一幅新图像。  

直方图均衡化、直方图匹配都属于直方图变换操作。

#### 图像增强 | Image enhancement

* 采用一系列技术去改善图像的视觉效果，或将图像转换成一种更适合于人或机器进行分析处理的形式。
* 图像增强并不以图像保真为准则，而是有选择地突出某些对人或机器分析有意义的信息，抑制无用信息，提高图像的使用价值。
* 根据任务目标突出图像中感兴趣的信息，消除干扰，改善图像的视觉效果或增强便于机器识别的信息。

    !!! Example "Luminance adjustment"

        ![Alt text](images/image-81.png)

    !!! Example "Contrast adjustment"

        ![Alt text](images/image-82.png)

    !!! Example "Color quantization"

        ![Alt text](images/image-83.png)

## 变换分类

根据变换函数类型的不同，直方图灰度变换可以分为线性变换和非线性变换两大类。

### 线性变换 | Linear grayscale transform

直方图灰度的线性变换函数可以表示为

$$s=T(r)=kx+b$$

!!! note ""
    - $r$ 为输入点的灰度值
    - $s$ 为相应输出点的灰度值
    - $k$、$b$为常数。$k<1$时表示灰度值被抑制，$b$为图像的抬升

![Alt text](images/image-84.png)

!!! Example
    ![Alt text](images/image-85.png)

#### 拉伸 | Contrast stretching

![Alt text](images/image-57.png){: width=50%}

输入图像f(x,y)灰度范围为[a,b]
输出图像g(x,y)灰度范围为[c,d]

!!! note "拉伸例子"
    ![Alt text](images/image-58.png)

    ![Alt text](images/image-59.png)

#### 分段拉伸

![Alt text](images/image-61.png)

利用分段直方图变换，可以将感兴趣的灰度范围线性扩展，同时相对抑制不感兴趣的灰度区域。

### 非线性变换 | 　Nonlinear histogram transform

我们有对数变换(Logarithmic transform)和指数变换(Exponential transform)

![Alt text](images/image-62.png)

![Alt text](images/image-63.png)

!!! note "例子"
    ![Alt text](images/image-64.png)