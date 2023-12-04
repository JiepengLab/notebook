# Chapter 4 数值微分与积分 | Numerical Differentiation and Integration

## 4.1 数值微分 | Numerical Differentiation

### 最简单的方法

最简单的方法：用两个点，取$h>0$

Forward : $f'(x) = \frac{f(x+h) - f(x)}{h} + O(h)$

Backward : $f'(x) = \frac{f(x) - f(x-h)}{h} + O(h)$

![Alt text](images/image-53.png)