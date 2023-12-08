# Neural Networks

!!! note "引入"

    生物学中，神经网络是由一组在化学上连接或功能上关联的神经元组成的电路。神经元的连接是通过权重来建模的。正权重表示兴奋连接，而负值表示抑制连接。所有输入都经过权重的修改并相加。这种聚合对应于进行线性组合。最后，激活函数控制输出的幅度。
    
    尽管每个神经元都相对简单，但它们可以构建出具有惊人处理能力的网络。这引起了神经网络自20世纪70年代以来，用于解决人工智能问题的发展。特别是在过去的十年里，在这个方向取得了显著的进展。例如，我们可以提到神经网络Leela Chess Zero，它在2019年5月赢得了顶级国际象棋引擎锦标赛，并在决赛中击败了传统的国际象棋引擎Stockfish。

!!! info "本章概述"

    在本章中，我们了解神经元的功能如何在数学上建模。这是通过以 **广义线性回归(The generalized linear regression)** 的术语对分类神经元进行建模来完成的。这里的**广义**指的是激活函数的使用。首先，我们关注 **sigmoid 激活函数**和相应的**逻辑回归(logistic regression)**。权重的训练将基于**最大似然估计(maximum likelihood estimation)**引起的**平均交叉熵(average cross-entropy)**的最小化。我们通过**随机梯度下降(stochastic gradient descent)**来最小化平均交叉熵。其次，考虑**阈值激活函数(threshold activation function)**。相应的神经元被称为**感知机(perceptron)**。对于后者，已经显示 **Rosenblatt learning** 在有限的迭代步骤中提供了正确的线性分类器。在提到不能通过具有一层的感知器处理的 XOR问题 之后，我们引入了**多层感知器(multilayer perceptrons)**。我们通过陈述 **通用逼近定理(universal approximation theorem)** 来强调它们的重要性。