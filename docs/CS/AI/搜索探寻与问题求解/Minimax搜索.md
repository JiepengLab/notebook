# Minimax搜索

!!! note ""

    - 智能体不唯一，解决信息确定、全局可观察、轮流行动、输赢收益零和的博弈问题，求解这样问题的算法称为对抗搜索（adversarial search）或博弈搜索（game search）
    - 智能体会选择最大化自身利益、最小化对手利益的策略
    - 形式化描述：
        - 状态：状态 $s$ 包括当前游戏局面和当前行动的智能体，初始状态 $s_0$ 为游戏开始时的状态。$\mathrm{player}(s)$ 表示状态 $s$ 下行动的智能体
        - 动作：动作是指 $\mathrm{player}(s)$ 在当前局面下可以采取的操作 $a$，记动作集合为 $\mathrm{actions}(s)$
        - 状态转移：状态转移函数 $s' = \mathrm{result}(s, a)$ 表示在状态 $s$ 下采取动作 $a$ 后的下一个状态
        - 终局状态测试：终局状态测试函数 $\mathrm{terminal\_test}(s)$ 用于测试游戏是否在状态 $s$ 下结束
        - 终局得分：终局得分函数 $\mathrm{utility}(s, p)$ 表示在状态 $s$ 下玩家 $p$ 的得分
            - 对于二人零和博弈，只需要记录其中一人的终局得分即可

决策方法：

$$
\text{minimax}(s)=\left\{
	\begin{array}{ll}
	\text{utility}(s), & \text{if terminal\_test}(s) \\
	\max_{a\in\text{action}(s)}\text{minimax}(\text{result}(s,a)), & \text{if player}(s)=\text{MAX} \\
	\min_{a\in\text{action}(s)}\text{minimax}(\text{result}(s,a)), & \text{if player}(s)=\text{MIN}
	\end{array}
\right.
$$

- 最大最小搜索（minimax search）是求解对抗搜索问题的基本算法
- 该算法假设两名玩家在决策时总是理性地倾向于最大化自己的得分（最小化对方得分）
- 算法过程
    - 假设以最大化得分为目标的玩家为 MAX，以最小化得分为目标的玩家为 MIN
    - 某一层由 MAX 玩家行动，则其会选择得分最大的子树进行行动
    - 某一层由 MIN 玩家行动，则其会选择得分最小的子树进行行动
    - 递归地进行上述过程，直到达到终局状态
    - （子树的得分由所有它的子树的得分取最大或最小得到）

```
MinimaxDecision:(MAX行动)
	a* ← argmax_{a∈actions(s)}MinValue(result(s,a))
```

```
MaxValue:
	if terminal_test(s) then return utility(s)
	v ← -∞
	foreach a∈actions(s) do
		v ← max(v, MinValue(result(s,a)))
	end
```

```
MinValue:
	if terminal_test(s) then return utility(s)
	v ← +∞
	foreach a∈actions(s) do
		v ← min(v, MaxValue(result(s,a)))
	end
```

- 最大最小搜索的时间复杂度为 $O(b^m)$，空间复杂度为 $O(bm)$
