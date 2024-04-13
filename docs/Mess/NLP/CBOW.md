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
        # print("Context vector: ", context_vector)
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