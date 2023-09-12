# Mathematics for Deep Learning

## Broadcasting

$$\begin{aligned}
\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} + \begin{bmatrix} 1 & 2 & 3 \end{bmatrix} &= \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} + \begin{bmatrix} 1 & 2 & 3 \\ 1 & 2 & 3 \end{bmatrix} \\
\end{aligned}$$

$$\begin{aligned}
\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} + \begin{bmatrix} 1 \\ 2 \end{bmatrix} &= \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} + \begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \end{bmatrix} \\
\end{aligned}$$

## Hadamard product

$$\begin{aligned}
\begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \odot \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} &= \begin{bmatrix} 1 & 4 & 9 \\ 16 & 25 & 36 \end{bmatrix} \\
\end{aligned}$$

## Vector and Matrix Norms

The $L_p$ norm of a vector $x \in \mathbb{R}^n$ is defined as

$$\|x\|_p = \left(\sum_{i=1}^n |x_i|^p\right)^{1/p}$$

The $L_2$ norm is also called the **Euclidean norm**.

> $\|x\|_1 = \sum_{i=1}^n |x_i|$
> $\|x\|_2 = \sqrt{\sum_{i=1}^n x_i^2}$
> $\|x\|_\infty = \max_{i=1,\ldots,n} |x_i|$

**Frobenius norm** of a matrix $A \in \mathbb{R}^{m \times n}$ is defined as

$$\|A\|_F = \sqrt{\sum_{i=1}^m \sum_{j=1}^n a_{ij}^2}$$

## Eigen and Singular Value Decomposition

### Eigenvalue Decomposition(EVD)

Only be applied to square matrices

$$A = V \Lambda V^{-1}$$

> $V$ is a matrix whose columns are the eigenvectors of $A$.
> $\Lambda$ is a diagonal matrix whose diagonal entries are the eigenvalues of $A$.

Each **real symmetric** matrix $A \in \mathbb{R}^{n \times n}$ can be decomposed into

$$A = Q \Lambda Q^T$$

where $Q$ is an orthogonal matrix whose columns are the eigenvectors of $A$ and $\Lambda$ is a diagonal matrix whose diagonal entries are the eigenvalues of $A$.

### Singular Value Decomposition(SVD)

For non-square matrices we can use **singular value decomposition**

$$A = U D V^T$$

> $U$ and $V$ are orthogonal matrices.
> $D$ is a diagonal matrix whose diagonal entries are the singular values of $A$.
> $U$ and $V$ are the left and right singular vectors of $A$.

### Relationship between EVD and SVD

$$A = U D V^T$$

$$A^T A = V D^T U^T U D V^T = V D^T D V^T= V D^2 V^T$$

$$A A^T = U D V^T V D U^T = U D^T D U^T = U D^2 U^T$$

> The right singular vectors $V$ of $A$ are the eigenvectors of $A^T A$.
> The left singular vectors $U$ of $A$ are the eigenvectors of $A A^T$.
> The singular values of $A$ are the square roots of the eigenvalues of $A^T A$ or $A A^T$.

### Application: Principal Component Analysis (PCA)

> PCA is a technique for analyzing large high-dimensional datasets

## Probability

To do

## Information and Entropy

To satisfy all requirements, we define the self-information of an event $X = x$ as

$$I(x) = -\log P(x)$$ [unit:nat]

> **Self-information** is also interpreted as quantifying the level of “surprise”
> When using base-2 logarithms, units are called “bits” or “shannons”

## The Argmin and Argmax Operators

Let $\mathcal{X}$ be a set and $f: \mathcal{X} \rightarrow \mathbb{R}$ be a function. The **argmin** of $f$ is defined as

$$\arg \min_{x \in \mathcal{X}} f(x) = \{x \in \mathcal{X} | f(x) = \min_{x' \in \mathcal{X}} f(x')\}$$

The **argmax** of $f$ is defined as

$$\arg \max_{x \in \mathcal{X}} f(x) = \{x \in \mathcal{X} | f(x) = \max_{x' \in \mathcal{X}} f(x')\}$$
