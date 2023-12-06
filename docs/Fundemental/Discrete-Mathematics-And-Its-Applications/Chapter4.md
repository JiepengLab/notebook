# Chapter 4 -The Number Theory and Cryptography

---

## Section 1 Divisibility and Modular Arithmetic

### 1.1 Division

- If $a$ and $b$ are integers with $a \neq 0$, then $a$ divides $b$ if there is an integer $c$ such that $b = ac$. We write $a | b$ and say that $a$ divides $b$.

### 1.2 Division Algorithm

- Let $a$ and $d$ be integers with $d > 0$. Then there exist unique integers $q$ and $r$ such that $a = dq + r$ and $0 \leqslant r < |d|$.

>- dividend = divisor * quotient + remainder  
>
>- 被除数   = 除数 * 商 + 余数
>
>- Functions: div and mod  
>
>- $q = a$ $div$ $d$
>
>- $r = a$ $mod$ $d$

### 1.3 Modular Arithmetic

- Let $a$ and $b$ be integers and let $m$ be a positive integer. We say that $a$ is congruent to $b$ modulo $m$ if $m$ divides $a - b$.
- We write $a \equiv b$ ($mod$ $m$) if a is congruent to b modulo m.

>- $a \equiv b$ ($mod$ $m$)  is a congruence
>- m is its modulus  

### 1.4 Properties of Congruence

- Let $a, b, c, d,$ and $m$ be integers with $m > 0$. If $a \equiv b (mod$ $m)$ and $c \equiv d (mod$ $m)$, then the following properties hold:

>- $a + c \equiv b + d (mod$ $m)$
>- $ac \equiv bd (mod$ $m)$

### 1.5 Arithmetic Modular m 模算术

- Let $Z_m$ be the set of nonnegative integers less than $m$:{0, 1, 2, ..., m - 1}

>- The operations $+_m$ is defined as $a +_m b = (a + b) mod$ $m$
>- The operations $*_m$ is defined as $a*_m b = (a * b) mod$ $m$
>
> 可以证明，在$Z_m$中，加法和乘法是封闭的。

## Section 2 Primes and Greatest Common Divisors

### 2.1 Trial Division

If $n$ is a composite integer, then $n$ has a prime divisor less than or equal to $\sqrt{n}$.

> Proof:
>
> - If $n$ is composite, then $n = ab$ for some integers $a$ and $b$, where $1 < a \leqslant b < n$.
> - If $a > \sqrt{n}$, then $b < \sqrt{n}$, and $b$ is a divisor of $n$.
> - If $a \leqslant\sqrt{n}$, then $a$ is a divisor of $n$.
> - In either case, $n$ has a divisor less than or equal to $\sqrt{n}$.
> - Therefore, if $n$ is composite, then $n$ has a prime divisor less than or equal to $\sqrt{n}$.

### 2.2 The Sieve of Eratosthenes

- The Sieve of Eratosthenes is a method for finding all primes less than or equal to a given integer $n$.

>- Example: Find all primes less than or equal to 100. We cross out all multiples of 2, 3, 5, and 7 that are less than or equal to 100. The remaining numbers are primes.

### 2.3 Infinitude of Primes

- There are infinitely many primes.

> Proof:
>
> - Suppose that there are only finitely many primes, say $p_1, p_2, ..., p_n$.
> - Let $P = p_1p_2...p_n + 1$.
> - Then $P$ is either prime or composite.
>
> > - If $P$ is prime, then $P$ is a prime that is not equal to any of the primes $p_1, p_2, ..., p_n$.
> > - If $P$ is composite, then $P$ has a prime divisor $p$. Since $p$ divides $P$ and $p$ divides $p_1p_2...p_n$, it follows that $p$ divides 1, which is a contradiction.
>
> - Therefore, there are infinitely many primes.

### 2.4 Mersenne primes

- A prime of the form $2^p - 1$, where $p$ is a prime, is called a Mersenne prime.

### 2.5 Distribution of Primes

- The number of primes not exceeding $n$ is approximately $n/ln(n)$.

### 2.6 Greatest Common Divisors & Least Common Multiples

- Let $a$ and $b$ be positive integers. Then $ab = gcd(a, b) * lcm(a, b)$.

- Euclidean Algorithm:

>- Let $a$ and $b$ be positive integers.
>
> Then $gcd(a, b) = gcd(b, a$ $mod$ $b)$.

- **(Bezout's Identity)**: If $a$ and $b$ are positive integers, then $gcd(a, b)$ is the smallest positive integer that can be written as $sa + tb$, where $s$ and $t$ are integers.

>- example: $gcd(48, 18) = 6 = (-1) *48 + 3*18$
>
>- 计算贝祖系数的方法：用欧拉公式列出一系列等式，然后从最后一个等式开始，依次代入前面的等式，直到得到$gcd(a, b)$的表达式。
>
>> - $48 = 2 * 18  + 12$
>> - $18 = 1 * 12 + 6$
>> - $12 = 2 * 6  + 0$
>> - $gcd(48, 18) = 6$
>>
>> > - $6 = 1*18 + (-1)* 12$
>> > - $6 = 1*18  + (-1)* (48 +(-2)* 18)$
>> > - $6 = (-1) *48 + 3*18$

- Lemma:

1. Let $a$ and $b$ and $c$ be positive integers. If $a|bc$ and $gcd(a, b) = 1$, then $a|c$.
2. Let $a$ and $b$ and $c$ be positive integers and $m$ be a positive integer. If $ac \equiv bc (mod$ $m)$ and $gcd(c, m) = 1$, then $a \equiv b (mod$ $m)$.

## Section 3 Solving Congruences

### 3.1 Linear Congruences 线性同余方程

 A linear congruence is an equation of the form $ax \equiv b (mod$ $m)$, where $a, b$, and $m$ are integers and $m > 0$.

- The linear congruence $ax \equiv b (mod$ $m)$ has a solution if and only if $gcd(a, m)$ divides $b$.
- **Inverse of an Integer Modulo:**
- An integer $a$ is said to have an inverse modulo $m$ if there exists an integer $\bar{a}$ such that $a\bar{a} \equiv 1 (mod$ $m)$.
- If $a$ and $m$ are relatively prime, then $a$ has an inverse modulo $m$.

> Finding Inverses:
>
> - Determine whether $a$ and $m$ are relatively prime.
> - Write $gcd(a, m) = sa + tm$ for some integers $s$ and $t$.
> - Then $\bar{a}$ is the integer $s$.

### 3.2 Chinese Remainder Theorem 中国剩余定理

Let $m_1, m_2, ..., m_k$ be positive integers that are pairwise relatively primes,
and let $a_1, a_2, ..., a_k$ be any integers. Then the system of linear congruences
$x \equiv a_1 (mod$ $m_1) $, $x \equiv a_2 (mod$ $m_2) $ ... $x \equiv a_k (mod$ $m_k) $
has a unique solution modulo $m_1m_2...m_k$.

To find the solution, we can use the following algorithm:

>- Let $M = m_1m_2...m_k$.
>- For $i = 1, 2, ..., k$, compute $M_i = M/m_i$.
>- For $i = 1, 2, ..., k$, compute $y_i$ such that $M_iy_i \equiv 1 (mod$ $m_i)$.
>- The solution is $x = a_1M_1y_1 + a_2M_2y_2 + ... + a_kM_ky_k (mod$ $M)$.
>
>---
> Example: Consider the 3 linear congruences:  $x \equiv 2 (mod$ $3)$, $x \equiv 3 (mod$ $5)$, $x \equiv 2 (mod$ $7)$.
>
> - $M = 3*5*7 = 105$.
> - $M_1 = 5*7 = 35$, $M_2 = 3*7 = 21$, $M_3 = 3*5 = 15$.
> - $35y_1 \equiv 1 (mod$ $3)$, $21y_2 \equiv 1 (mod$ $5)$, $15y_3 \equiv 1 (mod$ $7)$.
> - $y_1 = 2$, $y_2 = 1$, $y_3 = 1$.
> - $x = 2*35*2 + 3*21*1 + 2*15*1 = 233 \equiv 23(mod$ $105)$

Or use Back Substitution.

By the Chinese Remainder Theorem, we can represent a large integer $a$ as $(a $ $mod$ $m_1, a $ $mod$ $m_2, ..., a $ $mod$ $m_k)$, where $m_1, m_2, ..., m_k$ are pairwise relatively prime.

> Example: We set $m_1 = 3, m_2 = 4$, then $10 = (1, 2)$.

From this, we can get

>- $a + b$ as $(a $ $mod$ $m_1 + b $ $mod$ $m_1, a $ $mod$ $m_2 + b $ $mod$ $m_2, ..., a $ $mod$ $m_k + b $ $mod$ $m_k)$.
>- $a *b$ as $(a $ $mod$ $m_1* b$ $mod$ $m_1, a$ $mod$ $m_2 *b$ $mod$ $m_2, ..., a $ $mod$ $m_k* b $ $mod$ $m_k)$.
>
> the operators $+$ and $*$ are defined in **Arithmetic Modular m**

### 3.3 Fermat's Little Theorem

If $p$ is a prime and $a$ is an integer not divisible by $p$, then $a^{p-1} \equiv 1 (mod$ $p)$.
Furthermore, if $a$ is divisible by $p$, then $a^p \equiv a (mod$ $p)$.

> Example: $7^{222} (mod$ $11)$.
> From Fermat's Little Theorem, we have$7^{10} \equiv 1 (mod$ $11)$,
> So $7^{222} = 7^{10*22+2} \equiv 1^{22}*49 \equiv 49 \equiv 5(mod$ $11)$.

### 3.4 Pseudo-primes 伪素数

Let $n$ be a composite integer. If $a^{n-1} \equiv 1 (mod$ $n)$, then $n$ is called a pseudo-prime to the base $a$.

> Example: $341 = 11*31$ is a pseudoprime to the base $2$.

### 3.5 Carmichael Numbers 卡迈克尔数

A composite integer $n$ is called a Carmichael number if $a^{n-1} \equiv 1 (mod$ $n)$ for every integer $a$ that is relatively prime to $n$.

> Example: Proof $561 = 3*11*17$ is a Carmichael number.
>
> - $561 = 3*11*17$.
> - If $gcd(a, 561) = 1$, then $gcd(a, 3) = gcd(a, 11) = gcd(a, 17) = 1$.
> - Using Fermat's Little Theorem, we have
>   $a^{2} \equiv 1 (mod$ $3)$, $a^{10} \equiv 1 (mod$ $11)$, $a^{16} \equiv 1 (mod$ $17)$.
> - So $a^{560} \equiv 1 (mod$ $3)$, $a^{560} \equiv 1 (mod$ $11)$, $a^{560} \equiv 1 (mod$ $17)$.
> - Therefore, we have $a^{560} \equiv 1 (mod$ $561)$.
> - So $561$ is a Carmichael number.
