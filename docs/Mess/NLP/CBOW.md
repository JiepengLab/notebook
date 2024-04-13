# Continuous-bag-of-words

!!! note "CBOW的更上一层"
    为了使计算机理解书面文本，我们可以将单词表示为数值向量。一种方法是使用单词嵌入，它们是将单词表示为数值向量的一种方法。这些向量捕获单词的含义及其与语言中其他单词的关系。词嵌入可以使用无监督学习算法（例如 **Word2vec**、GloVe 或 FastText）生成。

    Word2vec 是一种基于神经网络的生成词嵌入的方法，词嵌入是捕获其语义和关系的单词的密集向量表示。实现 Word2vec 有两种主要方法：

    + Skip-gram：给定一个单词，预测其上下文单词。
    + **Continuous Bag of Words (CBOW)**：给定上下文单词，预测目标单词。

## 算法介绍

CBOW模型（Continuous Bag-of-Words）是自然语言处理中深度学习领域经常使用的模型之一。它的作用是在给定目标词前后的几个词的上下文情境下尝试预测目标词。

CBOW模型与语言建模（language modeling）有所不同，因为CBOW模型**不是顺序的，也不一定是概率性的**。

![alt text](images/image.png){:height="50%" width="50%"}

!!! example "举个例子"

    + 对于句子"The cat sits on the mat"，CBOW模型会尝试根据"cat", “sits”, “the”, "mat"等词来预测"on"这个词。通过这种方式，CBOW模型可以学习到词与其上下文之间的关系，从而得到**词嵌入**。
    + 如果是语言建模的话，模型会尝试根据"cat", “sits”, “on”, "the"等词来预测"mat"这个词，也就是预测下一个词。

> 通常，CBOW模型被用来快速训练词嵌入（word embeddings），而这些词嵌入会被用来初始化一些更复杂模型的嵌入。这通常被称为预训练嵌入（pretraining embeddings）。通常情况下，这种做法能够帮助模型性能提升几个百分点。
> CBOW模型的预训练嵌入可以被用于各种自然语言处理任务，比如情感分析、命名实体识别等。通过使用预训练的词嵌入，模型在开始学习任务时就能够具备一定的语义信息，从而提升了模型的性能。

<!-- ## CBOW 的架构

CBOW模型的神经网络结构如下：

1. 输入层：输入是一个大小为`2 * C`的词向量，其中`C`是上下文窗口的大小。在本程序中，`CONTEXT_SIZE`为2，因此输入大小为4。
2. 隐藏层：隐藏层是一个线性层，其输出维度为`embedding_dim`。
3. 输出层：输出层是一个线性层，其输出维度为`vocab_size`。
4. 激活函数：隐藏层使用`ReLU`激活函数，输出层使用`LogSoftmax`激活函数。
5. 词嵌入层：词嵌入层是一个`vocab_size * embedding_dim`的矩阵，用于将词索引转换为词向量。
6. 损失函数：损失函数使用负对数似然损失函数。 -->

## 算法流程

### 预处理数据

```python
CONTEXT_SIZE = 2  # 上下文窗口大小
EMDEDDING_DIM = 100

raw_text = """We are about to study the idea of a computational process.
Computational processes are abstract beings that inhabit computers.
As they evolve, processes manipulate other abstract things called data.
The evolution of a process is directed by a pattern of rules
called a program. People create programs to direct processes. In effect,
we conjure the spirits of the computer with our spells.""".split()


# By deriving a set from `raw_text`, we deduplicate the array
vocab = set(raw_text)
vocab_size = len(vocab) # 这里的词汇表大小为 49
print("Vocab size: ", vocab_size)

word_to_ix = {word:ix for ix, word in enumerate(vocab)}
ix_to_word = {ix:word for ix, word in enumerate(vocab)}

data = []
for i in range(2, len(raw_text) - 2):
    context = [raw_text[i - 2], raw_text[i - 1],
               raw_text[i + 1], raw_text[i + 2]]
    target = raw_text[i]
    data.append((context, target))
```

#### `CONTEXT_SIZE` 

```python
CONTEXT_SIZE = 2  # 上下文窗口大小
```

`CONTEXT_SIZE` 就是上下文窗口的大小，这里设置为2

#### `EMDEDDING_DIM`

```python
EMDEDDING_DIM = 100
```

`EMDEDDING_DIM` 是词嵌入的维度，这里设置为100。词嵌入的维度是一个超参数，可以根据实际情况调整。**通过词向量之间的距离可以度量他们之间的关系**，**意思相近的词**在空间中的距离比较近。

词嵌入的维度越大，模型的表达能力越强，但训练时间也会增加。

#### `raw_text`

```python
raw_text = """...""".split()
```

`raw_text` 是我们的原始文本，这里是一个字符串，我们将其分割成一个单词列表。

#### `vocab`

```python
vocab = set(raw_text)
```

`vocab` 是我们的词汇表，是一个集合，里面包含了所有的单词。

#### `word_to_ix` 和 `ix_to_word`

```python
word_to_ix = {word:ix for ix, word in enumerate(vocab)}
ix_to_word = {ix:word for ix, word in enumerate(vocab)}
```

`word_to_ix` 是一个字典，用于将单词映射为索引，`ix_to_word` 是一个字典，用于将索引映射为单词。

``` python
Word to index:  {'other': 0, 'conjure': 1, 'that': 2, 'process': 3, 'process.': 4, 'spells.': 5, 'Computational': 6, 'processes.': 7, 'study': 8, 'direct': 9, 'idea': 10, 'with': 11, 'computers.': 12, 'our': 13, 'a': 14, 'spirits': 15, 'beings': 16, 'evolution': 17, 'processes': 18, 'programs': 19, 'computer': 20, 'The': 21, 'pattern': 22, 'In': 23, 'by': 24, 'effect,': 25, 'we': 26, 'are': 27, 'rules': 28, 'about': 29, 'As': 30, 'We': 31, 'called': 32, 'they': 33, 'inhabit': 34, 'directed': 35, 'things': 36, 'computational': 37, 'is': 38, 'create': 39, 'program.': 40, 'to': 41, 'People': 42, 'the': 43, 'manipulate': 44, 'data.': 45, 'of': 46, 'abstract': 47, 'evolve,': 48}        
Index to word:  {0: 'other', 1: 'conjure', 2: 'that', 3: 'process', 4: 'process.', 5: 'spells.', 6: 'Computational', 7: 'processes.', 8: 'study', 9: 'direct', 10: 'idea', 11: 'with', 12: 'computers.', 13: 'our', 14: 'a', 15: 'spirits', 16: 'beings', 17: 'evolution', 18: 'processes', 19: 'programs', 20: 'computer', 21: 'The', 22: 'pattern', 23: 'In', 24: 'by', 25: 'effect,', 26: 'we', 27: 'are', 28: 'rules', 29: 'about', 30: 'As', 31: 'We', 32: 'called', 33: 'they', 34: 'inhabit', 35: 'directed', 36: 'things', 37: 'computational', 38: 'is', 39: 'create', 40: 'program.', 41: 'to', 42: 'People', 43: 'the', 44: 'manipulate', 45: 'data.', 46: 'of', 47: 'abstract', 48: 'evolve,'}  
```

!!! note ""
    因为 set 是无序的，所以每次运行的结果可能不一样。

#### `data`

```python
data = []
for i in range(2, len(raw_text) - 2):
    context = [raw_text[i - 2], raw_text[i - 1],
               raw_text[i + 1], raw_text[i + 2]]
    target = raw_text[i]
    data.append((context, target))
```

`data` 是我们的训练数据，是一个列表，里面包含了所有的训练样本。每个训练样本是一个元组，包含了**上下文**和**目标单词**，格式如`([context], target)`。

!!! warning ""
    实际上，这里的代码最好使用 `CONTEXT_SIZE` 来代替 `2`，这样可以使代码更加通用。（当然，这样调整之后，context 中的单词数量也要相应调整）

```python
Data:  [(['We', 'are', 'to', 'study'], 'about'), (['are', 'about', 'study', 'the'], 'to'), (['about', 'to', 'the', 'idea'], 'study'), (['to', 'study', 'idea', 'of'], 'the'), (['study', 'the', 'of', 'a'], 'idea'), (['the', 'idea', 'a', 'computational'], 'of'), (['idea', 'of', 'computational', 'process.'], 'a'), (['of', 'a', 'process.', 'Computational'], 'computational'), (['a', 'computational', 'Computational', 'processes'], 'process.'), (['computational', 'process.', 'processes', 'are'], 'Computational'), (['process.', 'Computational', 'are', 'abstract'], 'processes'), (['Computational', 'processes', 'abstract', 'beings'], 'are'), (['processes', 'are', 'beings', 'that'], 'abstract'), (['are', 'abstract', 'that', 'inhabit'], 'beings'), (['abstract', 'beings', 'inhabit', 'computers.'], 'that'), (['beings', 'that', 'computers.', 'As'], 'inhabit'), (['that', 'inhabit', 'As', 'they'], 'computers.'), (['inhabit', 'computers.', 'they', 'evolve,'], 'As'), (['computers.', 'As', 'evolve,', 'processes'], 'they'), (['As', 'they', 'processes', 'manipulate'], 'evolve,'), (['they', 'evolve,', 'manipulate', 'other'], 'processes'), (['evolve,', 'processes', 'other', 'abstract'], 'manipulate'), (['processes', 'manipulate', 'abstract', 'things'], 'other'), (['manipulate', 'other', 'things', 'called'], 'abstract'), (['other', 'abstract', 'called', 'data.'], 'things'), (['abstract', 'things', 'data.', 'The'], 'called'), (['things', 'called', 'The', 'evolution'], 'data.'), (['called', 'data.', 'evolution', 'of'], 'The'), (['data.', 'The', 'of', 'a'], 'evolution'), (['The', 'evolution', 'a', 'process'], 'of'), (['evolution', 'of', 'process', 'is'], 'a'), (['of', 'a', 'is', 'directed'], 'process'), (['a', 'process', 'directed', 'by'], 'is'), (['process', 'is', 'by', 'a'], 'directed'), (['is', 'directed', 'a', 'pattern'], 'by'), (['directed', 'by', 'pattern', 'of'], 'a'), (['by', 'a', 'of', 'rules'], 'pattern'), (['a', 'pattern', 'rules', 'called'], 'of'), (['pattern', 'of', 'called', 'a'], 'rules'), (['of', 'rules', 'a', 'program.'], 'called'), (['rules', 'called', 'program.', 'People'], 'a'), (['called', 'a', 'People', 'create'], 'program.'), (['a', 'program.', 'create', 'programs'], 'People'), (['program.', 'People', 'programs', 'to'], 'create'), (['People', 'create', 'to', 'direct'], 'programs'), (['create', 'programs', 'direct', 'processes.'], 'to'), (['programs', 'to', 'processes.', 'In'], 'direct'), (['to', 'direct', 'In', 'effect,'], 'processes.'), (['direct', 'processes.', 'effect,', 'we'], 'In'), (['processes.', 'In', 'we', 'conjure'], 'effect,'), (['In', 'effect,', 'conjure', 'the'], 'we'), (['effect,', 'we', 'the', 'spirits'], 'conjure'), (['we', 'conjure', 'spirits', 'of'], 'the'), (['conjure', 'the', 'of', 'the'], 'spirits'), (['the', 'spirits', 'the', 'computer'], 'of'), (['spirits', 'of', 'computer', 'with'], 'the'), (['of', 'the', 'with', 'our'], 'computer'), (['the', 'computer', 'our', 'spells.'], 'with')]
```

### 定义CBOW神经网络模型

```python
# 定义CBOW模型类，继承自nn.Module，是所有神经网络模块的基类
class CBOW(torch.nn.Module):
    # 构造函数，定义模型初始化时需要的参数：词汇表大小和嵌入向量的维度
    def __init__(self, vocab_size, embedding_dim):
        # 调用父类的构造函数来进行初始化
        super(CBOW, self).__init__()

        #out: 1 x emdedding_dim
        # 创建一个嵌入层，它将词汇表中的每个词映射到一个固定大小的嵌入向量
            # vocab_size指定了嵌入层的大小，即有多少个嵌入向量
            # embedding_dim指定了每个嵌入向量的维度
        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
        self.linear1 = nn.Linear(embedding_dim, 128)
        self.activation_function1 = nn.ReLU()
        
        #out: 1 x vocab_size
        self.linear2 = nn.Linear(128, vocab_size)
        self.activation_function2 = nn.LogSoftmax(dim = -1)
        

    def forward(self, inputs):
        embeds = sum(self.embeddings(inputs)).view(1,-1)
        out = self.linear1(embeds)
        out = self.activation_function1(out)
        out = self.linear2(out)
        out = self.activation_function2(out)
        return out

    def get_word_emdedding(self, word):
        word = torch.tensor([word_to_ix[word]])
        return self.embeddings(word).view(1,-1)
```

#### CBOW类

```python
class CBOW(torch.nn.Module):
```

这里定义了CBOW模型类。这个类**继承自nn.Module**，nn.Module是所有神经网络模块的基类

!!! note ""
    !!! note "为什么要用这个 [nn.Module](https://pytorch.org/docs/stable/generated/torch.nn.Module.html)？"

        直观来讲：因为 Module 是 PyTorch 体系下**所有神经网络模块的基类**。
        
        具体来说，Module里有很多实用的方法，可参考[CSDN torch.nn.Module模块简单介绍](https://blog.csdn.net/allan2222/article/details/109994420)，[知乎：PyTorch 源码解读之 nn.Module：核心网络模块接口详解](https://zhuanlan.zhihu.com/p/340453841)
        
        !!! note ""
            至于什么是 torch.nn，可以参考 [What is torch.nn really?](https://pytorch.org/tutorials/beginner/nn_tutorial.html)

    作为使用者，我们要知道的是：**我们在定义自已的网络的时候，需要继承nn.Module类，并重新实现构造函数__init__构造函数和forward这两个方法。**

    !!! note "一些注意技巧："

        1. 一般把网络中具有可学习参数的层（如全连接层、卷积层等）放在构造函数__init__()中。
        2. 不具有可学习参数的层(如 ReLU、dropout、BatchNormanation 层)也可放在构造函数中。如果不放在构造函数__init__里面，则在forward方法里面可以使用 nn.functional 来代替
        3. forward方法是必须要重写的，它是实现模型的功能，实现各个层之间的连接关系的核心。

#### `__init__`方法（这里都是在定义函数）

```python
    def __init__(self, vocab_size, embedding_dim):
        super(CBOW, self).__init__() #调用父类的构造函数，也就是Module的构造函数

        #out: 1 x emdedding_dim
        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
        self.linear1 = nn.Linear(embedding_dim, 128)
        self.activation_function1 = nn.ReLU()
        
        #out: 1 x vocab_size
        self.linear2 = nn.Linear(128, vocab_size)
        self.activation_function2 = nn.LogSoftmax(dim = -1)
```

在构造函数中，我们定义了CBOW模型的各个层：

!!! note ""
    如果我们使用 pytorch 封装好的网络层的时候,我们并不需要对模型的参数初始化,因为这些都是 pytorch 帮助我们完成的——参数会在后面的训练过程中自动更新。

##### 词嵌入层

```python
        self.embeddings = nn.Embedding(vocab_size, embedding_dim)
```

`nn.Embedding` 是一个类，用于构建词嵌入层。它的输入是词汇表的大小和词嵌入的维度，输出是一个`vocab_size * embedding_dim`的矩阵。

##### 隐藏层

```python
        self.linear1 = nn.Linear(embedding_dim, 128)
        self.activation_function1 = nn.ReLU()
```

`nn.Linear` 是一个类，用于构建线性层。它的输入是输入维度和输出维度，输出是一个`embedding_dim * 128`的矩阵。`nn.ReLU` 是一个类，用于构建ReLU激活函数。

##### 输出层

```python
        self.linear2 = nn.Linear(128, vocab_size)
        self.activation_function2 = nn.LogSoftmax(dim = -1)
```

同样，构建了线性层，其输出是一个`128 * vocab_size`的矩阵。`nn.LogSoftmax` 是一个类，用于构建LogSoftmax激活函数。

!!! note ""
    `dim = -1` 表示对最后一个维度进行LogSoftmax操作。

##### 总结

这里的CBOW模型包含了一个嵌入层、一个隐藏层和一个输出层。嵌入层用于将词索引转换为词向量，隐藏层用于学习词向量之间的关系，输出层用于预测目标词。

#### `get_word_emdedding`方法

```python
    def get_word_emdedding(self, word):
        word = torch.tensor([word_to_ix[word]])
        return self.embeddings(word).view(1,-1)
```

`get_word_emdedding` 方法是用于获取单词的词向量的方法。这个方法的输入是一个单词，输出是这个单词的词向量。

!!! example "例如"

    ```python
        Idxs:  [41, 21, 8, 44]

        Context:  ['We', 'are', 'to', 'study']

        Result:  tensor([41, 21,  8, 44])
    ```

    !!! note ""
        注意，这里的索引可能跟我们之前得到的索引不一样，因为每次运行的结果可能不一样。

#### `forward`方法

```python
    def forward(self, inputs):
        embeds = sum(self.embeddings(inputs)).view(1,-1)
        out = self.linear1(embeds)
        out = self.activation_function1(out)
        out = self.linear2(out)
        out = self.activation_function2(out)
        return out
```

`forward` 方法是 CBOW 模型的前向传播方法。在这个方法中，我们首先将输入的词索引转换为词向量，然后将词向量相加，得到一个大小为`1 * embedding_dim`的词向量。接着，我们将这个词向量输入到隐藏层，然后通过激活函数，最后输入到输出层，得到预测的目标词。

##### `sum(self.embeddings(inputs)).view(1,-1)`
    
举个例子，假设我们目标词的上下文的索引为`[1, 2, 4, 5]`，那么我们可以得到这些词的词向量，然后将这些词向量相加，得到一个大小为`1 * embedding_dim`的词向量。

```python
import torch.nn as nn
import torch

embedding = nn.Embedding(10, 4)

for name,parameter in embedding.named_parameters():
    print(name,parameter)

input = torch.LongTensor([1, 2, 4, 5])

print(embedding(input))
print(sum(embedding(input)).view(1,-1))
```

输出为

```python
weight Parameter containing:
tensor([[-0.0735,  0.6746, -0.0462,  0.1872],
        [-1.9644,  0.4112, -0.3923, -0.9312], #1
        [ 0.5848,  0.2998,  0.2441, -0.0068], #2
        [-0.6007, -1.9042, -0.4371,  0.0556], 
        [ 0.8018, -0.2902,  1.4201, -1.0429], #4
        [ 0.1352,  0.8013, -0.0362,  1.7028], #5
        [ 0.3222,  0.0047, -0.1267,  1.9690],
        [ 0.6990,  0.4895, -0.1262,  0.5683],
        [ 0.7954, -0.0089,  0.6119,  0.0387],
        [ 0.1405,  0.5712, -1.7555,  0.6445]], requires_grad=True)
tensor([[-1.9644,  0.4112, -0.3923, -0.9312],  #1
        [ 0.5848,  0.2998,  0.2441, -0.0068],  #2
        [ 0.8018, -0.2902,  1.4201, -1.0429],  #4
        [ 0.1352,  0.8013, -0.0362,  1.7028]], #5
        grad_fn=<EmbeddingBackward0>)
tensor([[-0.4425,  1.2221,  1.2357, -0.2781]], grad_fn=<ViewBackward0>)
```

> 通过`embedding(input)`可以得到每个词的词向量，然后通过`sum(embedding(input))`可以得到 `目标词` 对应所有词的词向量之和。

!!! note ""

    我们在这里训练的其实是前后文词向量的和，然后通过神经网络来预测目标词。

### 训练模型

```python
model = CBOW(vocab_size, EMDEDDING_DIM)

loss_function = nn.NLLLoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.001)

#TRAINING
for epoch in range(50):
    total_loss = 0

    for context, target in data:
        context_vector = make_context_vector(context, word_to_ix)  
        log_probs = model(context_vector)

        total_loss += loss_function(log_probs, torch.tensor([word_to_ix[target]]))

    #optimize at the end of each epoch
    optimizer.zero_grad()
    total_loss.backward()
    optimizer.step()
```

#### `CBOW`模型

```python
model = CBOW(vocab_size, EMDEDDING_DIM)
```

这里我们实例化了一个CBOW模型，传入了词汇表的大小和词嵌入的维度。

#### 损失函数和优化器

```python
loss_function = nn.NLLLoss()
optimizer = torch.optim.SGD(model.parameters(), lr=0.001)
```

我们定义了损失函数为负对数似然损失函数，优化器为随机梯度下降。

#### 训练模型

```python
#TRAINING
for epoch in range(50):
    total_loss = 0

    for context, target in data:
        context_vector = make_context_vector(context, word_to_ix)  
        # print("Context vector: ", context_vector)
        log_probs = model(context_vector)

        total_loss += loss_function(log_probs, torch.tensor([word_to_ix[target]]))

    #optimize at the end of each epoch
    optimizer.zero_grad()
    total_loss.backward()
    optimizer.step()
```

!!! note "我们不妨先看看训练了什么"

    我们一共有三个矩阵，分别是 `Embedding`、`Linear1` 和 `Linear2`，我们可以看看这三个矩阵的值。

    === "Initial"
        
        ```python
        ---------------------------------------------------------------------
        |Embeddings
        ---------------------------------------------------------------------
        weight Parameter containing:
        tensor([[-0.1929,  1.3019, -0.1615,  ...,  0.3178,  0.7756,  0.1911],
                [ 0.0175, -2.1408,  1.2395,  ...,  1.0324, -0.7601,  1.6530],
                [ 0.0097, -0.7432, -0.2277,  ..., -0.2837, -0.0155,  1.5967],
                ...,
                [-1.0959, -0.9396,  0.2614,  ...,  1.9833, -0.4451,  1.6793],
                [-0.8117, -1.5616, -0.3955,  ..., -1.0292, -1.6247,  1.2214],
                [-0.6332, -0.9553,  1.5350,  ...,  1.8452, -0.9594,  0.4358]],
            requires_grad=True)
        ---------------------------------------------------------------------
        |Linear1
        ---------------------------------------------------------------------
        weight Parameter containing:
        tensor([[ 0.0412,  0.0100, -0.0484,  ..., -0.0818,  0.0615,  0.0241],
                [-0.0387,  0.0354, -0.0823,  ...,  0.0989,  0.0323,  0.0481],
                [-0.0246,  0.0763, -0.0336,  ..., -0.0054,  0.0097,  0.0050],
                ...,
                [-0.0182,  0.0787, -0.0796,  ..., -0.0956,  0.0076, -0.0452],
                [ 0.0888,  0.0762, -0.0259,  ...,  0.0999, -0.0355,  0.0222],
                [ 0.0332,  0.0405,  0.0931,  ..., -0.0367,  0.0824,  0.0371]],
            requires_grad=True)
        bias Parameter containing:
        tensor([-0.0852,  0.0174,  0.0340,  0.0449, -0.0398, -0.0610, -0.0782, -0.0042,
                -0.0899, -0.0125,  0.0904,  0.0883,  0.0532, -0.0761, -0.0654,  0.0433,
                -0.0779, -0.0191, -0.0860,  0.0623, -0.0867, -0.0733, -0.0346, -0.0556,
                0.0385, -0.0347,  0.0010, -0.0093,  0.0219,  0.0228,  0.0680, -0.0717,
                -0.0241, -0.0817,  0.0856,  0.0903,  0.0577,  0.0461,  0.0823,  0.0651,
                -0.0451,  0.0033, -0.0507, -0.0904,  0.0009,  0.0337,  0.0460, -0.0468,
                -0.0453,  0.0145, -0.0632, -0.0723,  0.0186,  0.0367,  0.0379, -0.0079,
                -0.0515, -0.0280, -0.0364,  0.0342, -0.0936,  0.0710,  0.0649,  0.0613,
                -0.0242,  0.0411, -0.0939,  0.0154, -0.0995, -0.0319, -0.0389, -0.0928,
                0.0505,  0.0438,  0.0259, -0.0835,  0.0800, -0.0751,  0.0523,  0.0664,
                0.0732,  0.0610, -0.0530, -0.0952, -0.0638, -0.0175, -0.0222,  0.0040,
                -0.0318, -0.0188,  0.0740, -0.0357,  0.0767,  0.0688, -0.0273, -0.0851,
                -0.0978,  0.0562, -0.0061, -0.0759,  0.0989,  0.0033, -0.0833,  0.0367,
                0.0578,  0.0879,  0.0873, -0.0921,  0.0126,  0.0124, -0.0249,  0.0547,
                0.0738,  0.0760, -0.0377, -0.0845,  0.0324, -0.0835,  0.0090,  0.0247,
                -0.0453, -0.0324, -0.0939,  0.0592,  0.0007, -0.0963, -0.0132,  0.0141],
            requires_grad=True)
        ---------------------------------------------------------------------
        |Linear2
        ---------------------------------------------------------------------
        weight Parameter containing:
        tensor([[ 5.1111e-06,  7.7615e-03, -2.3666e-02,  ..., -1.3838e-02,
                5.0182e-02,  4.2004e-02],
                [-2.2665e-02, -6.1800e-02,  6.5428e-02,  ..., -7.6341e-02,
                -7.5291e-02, -8.5744e-02],
                [-1.7421e-02, -5.2573e-02,  5.9915e-02,  ...,  7.6008e-02,
                5.5941e-02,  1.4290e-02],
                ...,
                [-1.2493e-02,  2.4171e-02, -7.3219e-02,  ..., -6.6337e-02,
                -4.0219e-02,  7.0256e-02],
                [-7.1720e-02, -7.7537e-03,  5.5035e-02,  ...,  6.8415e-02,
                -1.8081e-02,  6.9562e-02],
                [ 6.1898e-02,  9.3248e-03,  2.6012e-02,  ..., -7.4153e-02,
                -8.7503e-02, -1.0867e-02]], requires_grad=True)
        bias Parameter containing:
        tensor([ 0.0861,  0.0628, -0.0688, -0.0081, -0.0553, -0.0881,  0.0758,  0.0511,
                -0.0005,  0.0330,  0.0309,  0.0688, -0.0657,  0.0471, -0.0770,  0.0165,
                -0.0612, -0.0194, -0.0215, -0.0127, -0.0061,  0.0522, -0.0454,  0.0422,
                -0.0668,  0.0642,  0.0429,  0.0570,  0.0862,  0.0869, -0.0869,  0.0350,
                -0.0251, -0.0753,  0.0302,  0.0419,  0.0033,  0.0105, -0.0162, -0.0794,
                -0.0073, -0.0437, -0.0784, -0.0778,  0.0177,  0.0108,  0.0422, -0.0332,
                0.0791], requires_grad=True)
        ```
    === "After Train"

        ```python
        ---------------------------------------------------------------------
        |Embeddings
        ---------------------------------------------------------------------
        weight Parameter containing:
        tensor([[-0.1935,  1.3034, -0.1628,  ...,  0.3230,  0.7737,  0.1949],
                [ 0.0202, -2.1419,  1.2431,  ...,  1.0304, -0.7579,  1.6539],
                [ 0.0111, -0.7430, -0.2258,  ..., -0.2847, -0.0181,  1.5973],
                ...,
                [-1.0970, -0.9422,  0.2593,  ...,  1.9813, -0.4448,  1.6834],
                [-0.8131, -1.5608, -0.3975,  ..., -1.0311, -1.6252,  1.2269],
                [-0.6362, -0.9531,  1.5331,  ...,  1.8450, -0.9626,  0.4382]],
            requires_grad=True)
        ---------------------------------------------------------------------
        |Linear1
        ---------------------------------------------------------------------
        weight Parameter containing:
        tensor([[ 0.0142, -0.0182, -0.0608,  ..., -0.1028,  0.0573,  0.0269],
                [-0.0431,  0.0206, -0.0833,  ...,  0.0938,  0.0317,  0.0494],
                [-0.0420,  0.0738, -0.0330,  ..., -0.0203,  0.0230, -0.0156],
                ...,
                [-0.0181,  0.0560, -0.0625,  ..., -0.0757, -0.0076, -0.0590],
                [ 0.1161,  0.0925, -0.0642,  ...,  0.1074, -0.0360,  0.0118],
                [ 0.0109,  0.0263,  0.0946,  ..., -0.0453,  0.0673,  0.0771]],
            requires_grad=True)
        bias Parameter containing:
        tensor([-0.0796,  0.0183,  0.0430,  0.0548, -0.0360, -0.0637, -0.0786, -0.0008,
                -0.0706, -0.0025,  0.0901,  0.0937,  0.0603, -0.0695, -0.0525,  0.0503,
                -0.0700, -0.0081, -0.0726,  0.0778, -0.0756, -0.0666, -0.0256, -0.0444,
                0.0413, -0.0211,  0.0170, -0.0057,  0.0367,  0.0325,  0.0884, -0.0648,
                -0.0145, -0.0797,  0.0888,  0.0996,  0.0629,  0.0552,  0.0840,  0.0791,
                -0.0382,  0.0098, -0.0416, -0.0868,  0.0136,  0.0409,  0.0490, -0.0295,
                -0.0401,  0.0218, -0.0505, -0.0624,  0.0178,  0.0466,  0.0445, -0.0046,
                -0.0403, -0.0214, -0.0311,  0.0377, -0.0826,  0.0835,  0.0682,  0.0682,
                -0.0165,  0.0425, -0.0863,  0.0211, -0.0887, -0.0298, -0.0339, -0.0975,
                0.0577,  0.0506,  0.0398, -0.0746,  0.0891, -0.0747,  0.0523,  0.0709,
                0.0795,  0.0720, -0.0396, -0.0912, -0.0478, -0.0064, -0.0153,  0.0086,
                -0.0296, -0.0102,  0.0801, -0.0216,  0.0862,  0.0721, -0.0178, -0.0786,
                -0.0919,  0.0710, -0.0026, -0.0710,  0.1086,  0.0102, -0.0771,  0.0500,
                0.0720,  0.0933,  0.0946, -0.0893,  0.0128,  0.0247, -0.0143,  0.0611,
                0.0790,  0.0809, -0.0219, -0.0680,  0.0353, -0.0679,  0.0143,  0.0327,
                -0.0316, -0.0270, -0.0781,  0.0683, -0.0009, -0.0946, -0.0002,  0.0196],
            requires_grad=True)
        ---------------------------------------------------------------------
        |Linear2
        ---------------------------------------------------------------------
        weight Parameter containing:
        tensor([[-0.0106,  0.0318, -0.0521,  ...,  0.0124,  0.1407,  0.0208],
                [ 0.0137, -0.0693,  0.0956,  ..., -0.0691, -0.0966, -0.0988],
                [ 0.0284, -0.0484,  0.0534,  ...,  0.0793,  0.1002, -0.0060],
                ...,
                [-0.0305,  0.0179, -0.0628,  ..., -0.0771, -0.0573,  0.0981],
                [-0.0695,  0.0039,  0.0422,  ...,  0.1331, -0.0327,  0.1296],
                [ 0.0549,  0.0041,  0.0129,  ..., -0.0489, -0.1006,  0.0172]],
            requires_grad=True)
        bias Parameter containing:
        tensor([ 0.0890,  0.0508, -0.0611, -0.0209, -0.0392, -0.1042,  0.0697,  0.0540,
                -0.0056,  0.0250,  0.0411,  0.0558, -0.0654,  0.0572, -0.0483, -0.0020,
                -0.0674, -0.0183, -0.0298, -0.0005, -0.0087,  0.0314, -0.0576,  0.0468,
                -0.0555,  0.0492,  0.0690,  0.0584,  0.0853,  0.0958, -0.0902,  0.0320,
                -0.0307, -0.0592,  0.0231,  0.0429,  0.0063,  0.0229, -0.0264, -0.0788,
                -0.0013, -0.0496, -0.0820, -0.0791,  0.0156,  0.0151,  0.0491, -0.0292,
                0.0800], requires_grad=True)
        ```
