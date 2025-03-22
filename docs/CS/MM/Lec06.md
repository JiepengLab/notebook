# Lossless Compression Algorithms

## Introduction and Basics of Information Theory

### Data Compression Scheme

- **Data Compression** = B0 / B1
    - B0: Original Data
    - B1: Compressed Data

一般情况下，压缩比>1。

### Basics of Information Theory

![alt text](images/image-62.png)

编码的平均码长一定会大于等于信息的熵。

## Lossless Coding Algorithms

### Run-Length Encoding (RLE)

![alt text](images/image-71.png)

另一种编码，第一位为0的个数

![alt text](images/image-72.png)

### Variable-Length Coding

熵揭示了信源的信息含量。变长编码（VLC）作为最经典的**熵编码**方法之一，涵盖香农-范诺算法、霍夫曼编码及自适应霍夫曼编码等。

!!! note ""
    字典编码、游程编码、算术编码不属于熵编码。

#### Shannon-Fano Algorithm

自上而下的编码方法。平衡树

![alt text](images/image-73.png)

![alt text](images/image-74.png)

#### Huffman Coding

自下而上的编码方法。

![alt text](images/image-75.png)

- 哈夫曼编码是前缀码（Prefix Code），任意有效编码都不是其他编码的前缀。

- 对于给定概率分布，哈夫曼编码是平均码长最短的前缀码，满足最小冗余特性。

!!! note "证明"
    ![alt text](images/image-76.png)
    ![alt text](images/image-77.png)

进一步提升编码效率：**对符号串进行编码**。

##### Extended Huffman Coding

![alt text](images/image-78.png)

!!! note "Example"

    ![alt text](images/image-79.png)

    ![alt text](images/image-80.png)

##### Adaptive Huffman Coding

编解码过程中，随着符号的出现频率发生变化，哈夫曼树也随之动态调整。

![alt text](images/image-81.png)

![alt text](images/image-83.png)

#### Dictionary-Based Coding

具体是指LZW算法。我们的GIF格式就是使用LZW算法进行压缩的。

对可能的符号串进行编码。s相当于栈，如果s+c在字典中，就继续往后读，直到找不到为止；如果找不到，就将s+c加入字典，并编码。

![alt text](images/image-84.png)

#### Arithmetic Coding

##### 编码

对CAEE$进行编码。

![alt text](images/image-85.png)

最后从0.33184-0.3322之间的数中任意取一个数作为编码。

##### 解码

先看处于哪个区间，然后找到对应的符号。处理完一个符号后，将`Value=(Value-Range_low)/Range`，然后继续。

![alt text](images/image-86.png)

## Lossless Image Compression

### Differential Coding of Images

差分编码(Differential Coding)是一种简单的无损压缩方法，通过对图像的相邻像素值进行差分编码，以减少图像中的冗余信息。

![alt text](images/image-87.png)

!!! note "换一种表达方式后，熵会减小"
    ![alt text](images/image-88.png)

### Lossless JPEG

预测编码->差分编码

比如预测下面的X

![alt text](images/image-89.png)

有很多种预测方式，比如左边、上边、左上角等。

![alt text](images/image-90.png)

然后计算残差，再进行编码。