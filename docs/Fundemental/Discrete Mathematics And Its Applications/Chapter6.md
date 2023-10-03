# Chapter.6 - Counting

## Section.1 The Basics of Counting

### Basic Counting Principles

- **Sum Rule**, **Product Rule**
- **Subtraction Rule**:如果一个task既可以用方法A完成，也可以用方法B完成，那么完成这个task的方法数为用方法A完成的方法数加上用方法B完成的方法数，减去两种方法都用的方法数。
    - 即：$|A\cup B|=|A|+|B|-|A\cap B|$
- **Division Rule**: 如果一个task可以用$n$种方法完成，而且对于每一种方法，有$d$种方法对应这一种方法，那么完成这个task的方法数为$n/d$
    - 例如：有$6$个人，其中$3$个人是男性，$3$个人是女性，那么有$6/3=2$种方法选出一个男性和一个女性。

## Section.2 The Pigeonhole Principle

### The Pigeonhole Principle

- **The Pigeonhole Principle**:如果有$n$个物体放到$m$个容器里，其中$n>m$，那么至少有一个容器里放了两个物体。

> [Example] In a party of $2$ or more people, there are $2$ people with the same number of friends in the party. (Assuming you can’t be your own friend and that friendship is mutual.)
>
> - Pigeons: the $n$ people
> - Pigeonholes: the number of friends of each person, which is a number between $0$ and $n-1$.
> 而且$0$和$n-1$这两个数是不可能同时出现的，所以有$n$个pigeons，$n-1$个pigeonholes，所以至少有一个pigeonhole里有两个pigeons。
>
> ---
> [Example] Show that for every integer $n$ there is a multiple of $n$ that has only $0$s and $1$s in its decimal expansion.
>
> - Pigeons: the numbers $1,11,111,\dots$, which are $n+1$ numbers.
> - Pigeonholes: the $n$ possible remainders when dividing by $n$.
> 根据鸽笼原理，至少有两个数的余数相同，假设这两个数是$11\dots1$和$11\dots1$，那么它们的差就是$11\dots100\dots0$，这个数就是$n$的倍数。
>

**[Collary]** 一个函数$f$从一个有限集合$A$到一个有限集合$B$的映射，如果$|A|>|B|$，那么$f$不是一一映射。

### Generalized Pigeonhole Principle

- **Generalized Pigeonhole Principle**:如果有$n$个物体放到$k$个容器里，其中$n>m$，那么至少有一个容器里放了$\lceil n/k\rceil$个物体。

> [Example] Among $100$ people there are at least $9$ who were born in the same month.
>
> ---
>
> [Example] What is the least number of area codes needed to guarantee that the $25$ million phones in a state have distinct $10$-digit telephone numbers?(NXX-NXX-XXXX is the format of a telephone number, where N is a digit from $2$ to $9$ and X is a digit from $0$ to $9$. The area code is the first three digits.)
>
> Solution: The number of phone numbers of the form NXX-XXXX is
>
> $$8\times 10^6=8,000,000$$
>
> By the generalized pigeonhole principle, we need at least
>
> $$\lceil 25,000,000/8,000,000\rceil=4$$
>
> area codes.
>
> ---
>
> [Example] A bowl contains 10 red balls and 10 blue balls. One selects balls at random without looking at them. How many balls must he select to be sure of having at least three balls of the same color?
>
> Solution:  
>
> Suppose he selects $n$ balls.
>
> $$\lceil n/2\rceil\geq3$$
>
> So $n \geq 5$, he must select at least $5$ balls.
>
> ---
>
> [Example] 在$n+1$个不超过$2n$的整数中，证明存在两个数，其中一个是另一个的倍数。
>
> Solution:
>
> 把每一个整数写成$2^k\cdot m$的形式，其中$m$是奇数，$k$是非负整数。如果$m$相同，那么其中一个数是另一个数的倍数。如果$m$不同，那么$m$的取值范围是$1,3,5,\dots,2n-1$，一共有$n$个数，所以根据鸽笼原理，至少有两个数的$m$相同，所以其中一个数是另一个数的倍数。
>
> ---
>
> [Example]在为期11周的足球联赛中，每天至少有一场比赛，每周最多有12场比赛。 证明： 在这11周中，有连续的21天，每天都有比赛。
>
> Solution:
>
> 记$x_i$为第$i$天的比赛场数，$1\leq i\leq 77$，且$1\leq x_i\leq 12$。
>
> 记$a_i$为第$i$天结束后的比赛总场数，则
>
> $$a_i=\sum_{j=1}^ix_j(1\leq a_1< a_2<\dots<a_{77}\leq 11\times 12=132)$$
>
> 记$b_i=a_i+21$，则
>
> $$1\leq b_1<b_2<\dots<b_{77}\leq 132+21=153$$
>
> 因为$a_i$和$b_i$都是$77$个数，且都在$[1,153]$之间，所以根据鸽笼原理，至少有两个数相同，即
>
> $$a_i=a_j+21$$
>
> 所以有连续的21天，每天都有比赛
>
> ---
>
> [Example] 证明：在任意$n$个整数中，存在连续的若干个数，它们的和是$n$的倍数。
>
> Solution:
>
> 记$x_i$为前$i$个数的和，$1\leq i\leq n$，则
>
> $$x_i=\sum_{j=1}^ia_j(1\leq x_1<x_2<\dots<x_n)$$
>
> 记$y_i=x_i\mod n$，则
>
> $$0\leq y_1<y_2<\dots<y_n\leq n-1$$
>
> 因为$y_i$都是$n$个数，且都在$[0,n-1]$之间，所以根据鸽笼原理，至少有两个数相同，即
>
> $$y_i=y_j$$
>
> 所以有连续的若干个数，它们的和是$n$的倍数。
>
> ---
>
> [Example] 证明：在任意$n^2+1$个不相等的整数中，存在$n+1$个数，他们要么是递增的，要么是递减的。
>
> Solution:
>
> 记这些数为$a_1,a_2,\dots,a_{n^2+1}$，其中$a_i\neq a_j$，$1\leq i<j\leq n^2+1$。
>
> 记从$a_k$最大的递增长度为$x_k$，最大的递减长度为$y_k$.
>
> 假设最多只有$n$个数递增或递减，那么
>
> $$1\leq x_k\leq n \quad 1\leq y_k\leq n$$
>
> 所以有$n^2$种$(x_k,y_k)$的可能取值。
>
> 但我们有$n^2+1$个$(x_k,y_k)$，所以根据鸽笼原理，至少有两个数的$(x_k,y_k)$相同，即
>
> $$x_i=x_j,y_i=y_j$$
>
> 又由于$a_i\neq a_j$，所以$a_i$和$a_j$要么是递增的，要么是递减的。不妨设$a_i<a_j(i<j)$，则$a_i$和$a_j$是递增的，将$a_i$与从$a_j$开始的递增序列连接起来，就得到了$n+1$个数，他们是递增的。
>
> 所以假设不成立。
>
> 即在任意$n^2+1$个不相等的整数中，存在$n+1$个数，他们要么是递增的，要么是递减的。
>
> ---
>
> [Example] 证明：六个人的关系可以是朋友或陌生人，那么这六个人中至少有三个人互相认识，或者至少三个人互相不认识。
>
> Solution:
>
> Pigeons: {$a_2,a_3,a_4,a_5,a_6$}
>
> Pigeonholes: Relation with $a_1$:{friend, stranger}
>
> 由于
>
> $$\lceil n/2\rceil=3$$
>
> 所以至少有三个人互相认识，或者至少三个人互相不认识。

## Section.3 Permutations and Combinations(排列与组合)

- **r-permutation**:从$n$个元素中选取$r$个元素，有$P(n,r)=n(n-1)\dots(n-r+1)=\frac{n!}{(n-r)!}$种选法。

- **r-combination**:从$n$个元素中选取$r$个元素，有$C(n,r)=\binom{n}{r}=\frac{n!}{r!(n-r)!}=\frac{P(n,r)}{r!}$种选法。
    - [Combination Corollary] $C(n,r)=C(n,n-r)$
  > *Bijective proof*:
  >
  > - 假设$S$是一个有$n$个元素的集合。将$S$的一个子集$A$映射到$S$的一个子集$\bar{A}$的函数是$S$的$r$个元素的子集和$n-r$个元素的子集之间的双射。由于两个集合之间有双射，所以它们的元素个数相同。
  >
  >---
  > *Double counting proof*:
  >
  > - 根据定义，$S$的$r$个元素的子集的个数是$C(n,r)$。$S$的每一个子集$A$也可以通过指定不在$A$中的元素来描述，即在$\bar{A}$中的元素。由于$S$的$r$个元素的子集的补集有$n-r$个元素，所以$S$的$r$个元素的子集的个数也是$C(n,n-r)$。

## Section.4 Binomial Coefficients

**The Binomial Theorem**: Let $x$ and $y$ be varaibles, and let $n$ be a nonnegative integer. Then

$$(x+y)^n=\sum_{k=0}^n\binom{n}{k}x^ky^{n-k}$$

- [Corollaries] Let $n$ be a nonnegative integer. Then

$$\sum_{k=0}^n\binom{n}{k}=2^n~~~~,~~~~\sum_{k=0}^n(-1)^k\binom{n}{k}=0$$

**Pascal's Identity**: Let $n$ and $k$ be integers with $0\leq k\leq n$. Then

$$\binom{n+1}{k}=\binom{n}{k-1}+\binom{n}{k}$$

**Vandermonde's Identity**: Let $m,n$ and $r$ be nonnegative integers. Then

$$\binom{m+n}{r}=\sum_{k=0}^r\binom{m}{k}\binom{n}{r-k}$$

- 取定$m=r=n$,有
- $$\binom{2n}{n}=\sum_{k=0}^n\binom{n}{k}^2$$

**[Theorem]** Let $n$ and $r$ be nonnegative integers with $r\leq n$. Then

$$\binom{n+1}{r+1}= \sum_{j=r}^n\binom{j}{r}$$

- 左边可以看作包含$(r+1)$个"$1$"的长度为$(n+1)$的bit string的个数；
- 我们通过考虑最后一个1的位置来证明右边也是这样计数的，最后一个1的位置有$r$种可能，
    - 最后一个1的位置为$r+1$时，前面$r$个字符中有$r$个1，所以有$\binom{r}{r}$种可能；
    - 最后一个1的位置为$r+2$时，前面$r+1$个字符中有$r$个1，所以有$\binom{r+1}{r}$种可能；
    - ...
    - 最后一个1的位置为$n+1$时，前面$n$个字符中有$r$个1，所以有$\binom{n}{r}$种可能；
    - 得证。

## Section.5 Generalized Permutations and Combinations

### With Repetition

**r-permutation with repetition**:从$n$个元素中选取$r$个元素，允许重复，有$n^r$种选法。

**r-combination with repetition**:从$n$个元素中选取$r$个元素，允许重复，有$H_n^r=\binom{n+r-1}{r}$种选法。
> *Proof*:
>
> - 用$n-1$个竖线来标记$n$个不同的格子，第$i$个格子包含了第$i$个元素出现在组合中的次数个星号。例如，取$n=5,r=7$,其中的一种情况是$**|*|~|* |**~*$，表示第一个元素出现了$2$次，第二个元素出现了$1$次，第三个元素出现了$0$次，第四个元素出现了$1$次，第五个元素出现了$3$次。
>
> - 在$n-1$个竖线和$r$个星号中，有$r+n-1$个位置，其中$r$个位置是星号，$n-1$个位置是竖线，我们要选出$r$个位置来放星号，所以有$\binom{n+r-1}{r}$种选法。
>
> ---
> [Example] How many solutions are there to the equation
>
> $$x_1+x_2+x_3+x_4+x_5=20$$
>
> **(1)** in the nonnegative integers?
>> Solution:
>> 相当于从$20$个星号和$4$个竖线中选出$4$个竖线来放，所以有$\binom{20+4}{4}=\binom{24}{4}$种选法。
>>
>> $H_{5}^{20}=\binom{24}{20}$
>  
> **(2)** $x_i>1$
>> Solution:
>>
>> 全部减$2$，变成
>>
>> $$x_1'+x_2'+x_3'+x_4'+x_5'=10$$
>
> $H_{5}^{10}=\binom{14}{10}$
>
> **(3)** $x_1+x_2+x_3+x_4+x_5\leq20$
>> Solution:
>>
>> 添加一个新的变量$x_6$，使得$x_1+x_2+x_3+x_4+x_5+x_6=20$，其中$x_6\geq0$
>>
>> 所以有$H_{6}^{20}=\binom{25}{20}$种选法。

#### 整理一下

| Type | Repetition Allowed | Formula |
| :--: | :----------------: | :-----: |
| r-Permutation | No | $\frac{n!}{(n-r)!}$ |
| r-Permutation | Yes | $n^r$ |
| r-Combination | No | $\frac{n!}{r!(n-r)!}$ |
| r-Combination | Yes | $\binom{n+r-1}{r}$ |

### 接下来开始Indistinguish和Distinguish的地狱

**Permutations of Sets with Indistinguishable Objects**(集合中的元素不可区分的排列)

- The number of different permutations of $n$ objects, where there are $n_1$ indistinguishable objects of type $1$,...,and $n_k$ indistinguishable objects of type $k$, is
- $$\frac{n!}{n_1!n_2!\dots n_k!}$$

> [Example] How many different ways are there to permute the letters in the word MISSISSIPPI?
>
> Solution:
>
> 一共有$11$个字母，其中有$4$个I，$4$个S，$2$个P，所以有
>
> $$\frac{11!}{4!4!2!}$$
>
> 种不同的排列。

#### Distinguishable objects into distinguishable boxes(可区分的物体放入可区分的盒子)

- The number of ways to distribute $n$ distinguishableobjects into $k$ distinguishable boxes so that $n_i$ objects are place into box $i$, $i=1,2,...,k$, equals
- $$\frac{n!}{n_1!n_2!\dots n_k!}$$

> [Example] How many ways are there to distribute $10$ distinguishable balls into $3$ distinguishable boxes so that $4$ balls are placed in box $1$, $3$ balls are placed in box $2$, and $3$ balls are placed in box $3$?
>
> Solution:
>
> 一共有$10$个球，其中有$4$个球放入盒子$1$，$3$个球放入盒子$2$，$3$个球放入盒子$3$，所以有
>
> $$\frac{10!}{4!3!3!}$$
>
> 种不同的分配方法。
>
> ---
>
> [Example] How many ways are there to distribute hands of 5 cards to each of four players from the standard deck of 52 cards?
>
> Solution:
>
> 一共有$52$张牌，每个人发$5$张牌，所以有
>
> $$\frac{52!}{5!5!5!5!32!}$$
>
> 种不同的分配方法。

#### Indistinguishable objects into distinguishable boxes(不可区分的物体放入可区分的盒子)

就是r-combination with repetition，其中$n$是盒子的个数，$r$是物体的个数，有

$$\binom{n+r-1}{r}$$

种不同的分配方法。

> [Example] How many ways are there to distribute $10$ indistinguishable balls into $3$ distinguishable boxes?
>
> Solution:
>
> 一共有$10$个球，放入$3$个盒子，所以有
>
> $$\binom{10+3-1}{10}=\binom{12}{10}$$
>
> 种不同的分配方法。

#### Distinguishable objects into indistinguishable boxes(可区分的物体放入不可区分的盒子)

**Stirling numbers of the second kind**: 将$n$个可区分的物体放入$k$个不可区分的盒子中，且每个盒子至少有一个物体，其方法数记为$S(n,k)$。

- $S(0,0)=1$
- $S(n,k)=0$ if $k = 0 $ or $k > n$
- $S(n,1)=S(n,n)=1$
- $S(n,2)=2^{n-1}-1$

> *Proof*:
>
> - 先把一个物体放入其中一个盒子，此时盒子可区分了，剩下的$n-1$个物体放入$2$个盒子中，所以有$2^{n-1}$种方法，由于每个盒子至少有一个物体，所以有$2^{n-1}-1$种方法。

- $S(n,n-1)=\binom{n}{2}$

> *Proof*:
>
> - 相当于挑选两个物体放在一个盒子里，剩下的$n-2$个物体等额放在$n-2$个盒子里，所以有$\binom{n}{2}$种方法。

- $S(n,k)=S(n-1,k-1)+kS(n-1,k)$

> *Proof*:
>
> - 第$n$个物体放入其中一个盒子，有两种情况：
>
> 1. 前$n-1$个物体放入$k-1$个盒子中，第$n$个物体单独放入其中一个盒子，所以有$S(n-1,k-1)$种方法；
>
> 2. 前$n-1$个物体放入$k$个盒子中，第$n$个物体放入其中一个盒子，所以有$kS(n-1,k)$种方法。

递推可得：

$$S(n,k)=\frac{1}{k!}\sum_{i=0}^k(-1)^iC_k^i(k-i)^n$$

> 例如：
>
> 计算$S(4,3)$
>
> $$S(4,3)$$
>
> $$=\frac{1}{3!}\sum_{i=0}^3(-1)^iC_3^i(3-i)^4$$
>
> $$=\frac{1}{6}[(3-0)^4-3(3-1)^4+3(3-2)^4-(3-3)^4]=6$$
>
> 或者用递推公式：
>
> $$S(4,3)=S(3,2)+3S(3,3)=3+3=6$$
>
> ---
>
> 我们可画出一个第二类Stirling数的三角形：
>
> 下面是从$S(1,1)$到$S(6,6)$的三角形：
>
> $1$
>
> $1~~~~~~1$
>
> $1~~~~~~3~~~~~~1$
>
> $1~~~~~~7~~~~~~6~~~~~~1$
>
> $1~~~~~~15~~~~25~~~~10~~~~1$
>
> $1~~~~~~31~~~~90~~~~65~~~~15~~~~1$
>
> $1~~~~~~63~~~~301~~350~~140~~21~~~~1$
>
> 可以看到，第$i$行的第$j$个数$=$其上一行的前一个数$+j$倍的其上一行的正上方的数。

**应用**：

1、$n$个不同的球放入$m$个相同的盒子中，不允许盒子为空：

$$S(n,m)$$

正是第二类Stirling数的定义。

2、$n$个不同的球放入$m$个不同的盒子中，不允许盒子为空：

$$m!S(n,m)$$

盒子可区分，所以要乘上盒子的排列数。

3、$n$个不同的球放入$m$个相同的盒子中，允许盒子为空：

$$\sum_{k=0}^mS(n,k)$$

枚举非空盒子的个数。

4、$n$个不同的球放入$m$个不同的盒子中，允许盒子为空：

$$\sum_{k=0}^mP(m,k)*S(n,k)=m^n$$

枚举非空盒子的个数，然后乘上盒子的排列数。

> [Example] How many ways are there to distribute $5$ distinguishable balls into $3$ distinguishable boxes?
>
> Solution:
>
> 一共有$5$个不同的球，放入$3$个不同的盒子，所以有
>
> $$\sum_{k=0}^3P(3,k)*S(5,k)$$
>
> $=3*S(5,1)+6*S(5,2)+6*S(5,3)=3*1+6*15+6*25=243$种不同的分配方法。
>
> 也就是$3^5$种不同的分配方法。
>
> ---
> [Example] The number of onto functions from a set with $n$ elements to a set with $j$ elements
>
> Solution:
>
> 一共有$n$个元素，每个元素都要映射到$j$个元素中的一个，所以有
>
> $$j!S(n,j)= \sum_{i=0}^{j-1}(-1)^iC_{j}^{i}(j-i)^n$$
>
> 种不同的映射方法。
>
> ---
> [Example] How many ways are there to put four different employees into three indistinguishable offices, when each office can contain any number of employees?
>
> Solution:
>
> 一共有$4$个不同的员工，放入$3$个不同的办公室，所以有
>
> $$\sum_{k=1}^3S(4,k)=S(4,1)+S(4,2)+S(4,3)=1+7+6=14$$
>
> 种不同的分配方法。

#### Indistinguishable objects into indistinguishable boxes(不可区分的物体放入不可区分的盒子)

> [Example] How many ways are there to distribute $6$ indistinguishable balls into $4$ indistinguishable boxes?
>
> 枚举:
>
> $6,0,0,0;$
>
> $5,1,0,0;$
>
> $4,2,0,0;4,1,1,0;$
>
> $3,3,0,0;3,2,1,0;3,1,1,1;$
>
> $2,2,2,0;2,2,1,1$
>
> 九种。
