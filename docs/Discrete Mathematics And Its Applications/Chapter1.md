# Chapter.1-The Foundations: Logic and Proofs

## Section.1 Propositional Logic

A proposition is  a declarative sentence that is either true or false, but not both.
> *This statement is false.* is not a proposition.

Compound propositions are formed by combining existing propositions using logical connectives.
> *The sky is blue and the grass is green.* is a compound proposition.

### Logical connectives (logical operators)

1. *Negation (NOT)* : $\neg p$
2. *Conjunction (AND)* : $p \wedge q$
3. *Disjunction (OR)* : $p \vee q$
   > also called inclusive OR
4. *Exclusive OR (XOR)* : $p \oplus q$

|p|q|$p\oplus q$|
|:-:|:-:|:-:|
|T|T|F|
|T|F|T|
|F|T|T|
|F|F|F|

5. *Implication (if-then)* : $p \rightarrow q$

>$p$ is called the **hypothesis** (or antecedent or premise) and $q$ is called the **conclusion** (or consequent).

|p|q|$p \rightarrow q$|
|:-:|:-:|:-:|
|T|T|T|
|T|F|F|
|F|T|T|
|F|F|T|

> $p \rightarrow q$ $\Leftrightarrow$ $p$ is sufficient for $q$ $\Leftrightarrow$ $q$ is necessary for $p$ $\Leftrightarrow$ $p$ only if $q$ $\Leftrightarrow$ $q$ unless $\neg p$
>
> $$
p \rightarrow q  =
\begin{cases}\text{converse}\quad q\rightarrow p  \\
\text{comtrapositive}\quad \neg q\rightarrow \neg  p\\
\text{inverse}\quad \neg p\rightarrow \neg q
\end{cases}
> $$

6. *Biconditional (if and only if)* : $p \leftrightarrow q$
7. Sheffer stroke (NAND) : $p | q \equiv \neg (p \wedge q)$
8. Pierce arrow (NOR) : $p \downarrow q \equiv \neg (p \vee q)$

#### Precedence of logical operators

|Operator|Precedence|
|:-:|:-:|
|$\neg$|1|
|$\wedge$|2|
|$\vee$|3|
|$\rightarrow$|4|
|$\leftrightarrow$|5|

## Section.2 Applications of Propositional Logic

### Translating English to Propositional Logic

eg.1 You can access the Internet from campus only if you are a computer science major or you are not a freshman.
> Denote
>
> $p$ : You can access the Internet from campus,
>
> $q$ : you are a computer science major,
>
> $r$ : you are a freshman.
>
> $$p \rightarrow (q \vee \neg r)$$

### Consistent System Specifications

A system specification is a collection of statements about a system. A system specification is **consistent** if there is at least one way for the system to satisfy all the statements in the specification.

>eg.1
>
> “The diagnostic message is  stored in the buffer or it is retransmitted.”
>
> “The diagnostic message is not stored in the buffer.”
>
> “If the diagnostic message is stored in the buffer, then it is retransmitted.”
>
> Denote
>
> $p$ : The diagnostic message is stored in the buffer,
>
> $q$ : The diagnostic message is retransmitted.
>
> $$\begin{aligned}&p \vee q\\&\neg p\\&p \rightarrow q\end{aligned}$$
>
> When $p$ is false, $q$ is true, all three statements are true. So the specification is consistent.

## Section.3 Propositional Equivalences

**Tauntology** :永真式

**Contradiction** :永假式

**Contingency** :可满足式(既非永真式也非永假式)

### Key Logical Equivalences

Distribution laws:

$p \wedge (q \vee r) \equiv (p \wedge q) \vee (p \wedge r)$

$p \vee (q \wedge r) \equiv (p \vee q) \wedge (p \vee r)$

De Morgan's laws:

$\neg (p \wedge q) \equiv \neg p \vee \neg q$

$\neg (p \vee q) \equiv \neg p \wedge \neg q$

Absorption laws:

$p \vee (p \wedge q) \equiv p$

$p \wedge (p \vee q) \equiv p$

**Implication law**:

$p \rightarrow q \equiv \neg p \vee q$

Exportation law:

$(p \wedge q) \rightarrow r \equiv p \rightarrow (q \rightarrow r)$

Propositional Satisfiability Problem (PSP) : Given a propositional logic formula, is there a way to assign truth values to the variables so that the formula evaluates to true?(给定一个命题逻辑公式，是否有一种方法可以为变量分配真值，使得公式求值为真？)

### The Dual of a Compound Proposition

$\wedge$ and $\vee$ are duals of each other.

$\neg$ and $\neg$ are duals of each other.

$T$ and $F$ are duals of each other.

>$S=(p \vee \neg q) \wedge r \vee T$ is the dual of $S^*=(p \wedge \neg q) \vee r \wedge F$

### Functionally Complete Collection of Logical Operators

$\{\neg, \wedge, \vee, \rightarrow, \leftrightarrow\},\{\neg, \wedge, \vee\},\{\neg, \wedge\},\{\neg, \vee\},\{|\},\{\downarrow\}$ are all functionally complete collections of logical operators.

### Disjunctive Normal Form and Conjunctive Normal Form

**Disjunctive normal form (DNF)** : A compound proposition is in DNF if it is a disjunction of conjunctions of literals.

$(A_1 \wedge B_1) \vee (A_2 \wedge B_2) \vee (A_3 \wedge B_3)$

**Conjunctive Normal Form(CNF)** : A compound proposition is in CNF if it is a conjunction of disjunctions of literals.

$(A_1 \vee B_1) \wedge (A_2 \vee B_2) \wedge (A_3 \vee B_3)$

**Full disjunctive normal form (FDNF)** : A compound proposition is in FDNF if it is a disjunction of conjunctions of literals in which every variable appears ***exactly once*** in each conjunction.

> $(p \wedge q) \vee (\neg p \wedge r) \vee (q \wedge r)$ is in DNF but not in FDNF.

用真值表：

|p|q|r|$(p \wedge q)$|$(\neg p \wedge r)$|$(q \wedge r)$|$(p \wedge q) \vee (\neg p \wedge r) \vee (q \wedge r)$|
|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
|T|T|T|T|F|T|T|
|T|T|F|T|F|F|T|
|T|F|T|F|F|F|F|
|T|F|F|F|F|F|F|
|F|T|T|F|T|T|T|
|F|T|F|F|F|F|F|
|F|F|T|F|T|F|T|
|F|F|F|F|F|F|F|

> 找到为真的行，$(p \wedge q \wedge r) \vee (p \wedge q \wedge \neg r) \vee (\neg p \wedge q \wedge r) \vee (\neg p \wedge \neg q \wedge r)$为FDNF
>
> 找到为假的行并取反，
>
> $$
> \begin{aligned}
> &\neg((p \wedge \neg q \wedge r) \vee (p \wedge \neg q \wedge \neg r) \vee (\neg p \wedge q \wedge \neg r) \vee (\neg p \wedge \neg q \wedge \neg r))\\
> =&(\neg p \vee q \vee > \neg r) \wedge (\neg p \vee q \vee r) \wedge (p \vee \neg q \vee r) \wedge (p \vee \neg q \vee \neg r)
> \end{aligned}
> $$
>
> 为FCNF

## Section.4 Predicates and Quantifiers

**Predicate(谓词)** : A predicate is a sentence that contains a finite number of variables and becomes a statement when specific values are substituted for the variables.

**Predicate logic(谓词逻辑)** : Predicate logic is a formal system that consists of a formal language with **predicates**, **variables**, and **quantifiers**, and a formal proof system.

**Propositional Functions(命题函数)** : A propositional function is a function whose range is the set $\{T, F\}$.

**precondition(前置条件)** :也就是输入

**postcondition(后置条件)** : 也就是输出

**Quantifiers(量词)** : $\forall,\exists,\exists!$
> $\exists!$ : one and only one. $\exists!xP(x) \equiv \exists x(P(x) \wedge \forall y(P(y) \rightarrow y=x))$

优先级：$\forall xP(x) \vee Q(x) ~\text{means}~ (\forall xP(x)) \vee Q(x)$

### Translatingfrom English to Logic

Every student in this class has taken a course in Java.
> Let $U$ be all people, $S(x)$ denote "$x$ is a student in this class", $J(x)$ denote "$x$ has taken a course in Java".
>
> $\forall x(S(x)\rightarrow J(x))$
>
> 但$\forall x(S(x)\wedge J(x))$不对，因为这成立的话意味着每个人都是这个班的学生，且学过Java。

Some student in this class has taken a course in Java.
> $\exists x(S(x)\wedge J(x))$
>
> 但$\exists x(S(x)\rightarrow J(x))$不对，因为这句话意味着每个人要么不是这个班的学生，要么是这个班的学生且学过Java。可以用$\exists x(\neg S(x)\vee J(x))$来理解

### Equivalences in Predicate Logic

$\neg \forall x P(x) \equiv \exists x \neg P(x)$

$\neg \exists x P(x) \equiv \forall x \neg P(x)$

$\forall x(P(x) \wedge Q(x)) \equiv \forall xP(x) \wedge \forall xQ(x)$

$\forall x(P(x) \vee Q(x)) \Leftarrow \forall xP(x) \vee \forall xQ(x)$

$\exists x(P(x) \vee Q(x)) \equiv \exists xP(x) \vee \exists xQ(x)$

$\exists x(P(x) \wedge Q(x)) \Rightarrow \exists xP(x) \wedge \exists xQ(x)$

$\forall x(Q \rightarrow P(x)) \equiv Q \rightarrow \forall xP(x)$

$\exists x(Q \rightarrow P(x)) \equiv Q \rightarrow \exists xP(x)$

$\forall x(P(x) \rightarrow Q) \equiv \exists xP(x) \rightarrow Q$

$\exists x(P(x) \rightarrow Q) \equiv \forall xP(x) \rightarrow Q$

> $\forall x(P(x) \rightarrow Q) \equiv \forall x(\neg P(x) \vee Q) \equiv \forall x(\neg P(x)) \vee Q \equiv \neg (\exists x P(x)) \vee Q \equiv \exists xP(x) \rightarrow Q$
>
> $\exists x(P(x) \rightarrow Q) \equiv \exists x(\neg P(x) \vee Q) \equiv \exists x(\neg P(x)) \vee Q \equiv \neg (\forall x P(x)) \vee Q \equiv \forall xP(x) \rightarrow Q$

## Section.5 Nested Quantifiers(嵌套量词)

Translating Nested Quantifiers into English:

> $\forall x (C(x)\vee \exists y(C(y)\wedge F(x,y)))$
>
> where $C(x)$ is “$x$ has a computer,” and $F(x,y)$ is “$x$ and $y$ are friends,” and the domain for both $x$ and $y$ consists of all students in your school.
>
> 对所有学校里的学生，要么有电脑，要么有有电脑的朋友。
>
> ---
> “Everyone has exactly one best friend.”
>
> Let $B(x,y)$ denote “$x$ is the best friend of $y$.”
>
> $\forall x \exists y(B(x,y) \wedge \forall z(B(x,z) \rightarrow y=z))$

### Prenex Normal Forms(前束范式)

**Prenex normal form(前束范式)** : A formula is in prenex normal form if it is a string of quantifiers followed by a quantifier-free formula.(量词前束范式是指一个公式是由量词后跟一个无量词公式组成的字符串。)
> $\forall x \exists y(P(x,y) \rightarrow Q(x,y))$ is in prenex normal form.
>
> Convert a formula to prenex normal form:
>
> $\forall x((\exists y R(x,y)\land\forall y\neg S(x,y))\to\neg(\exists y M(x,y)\land P))$
>
> $\equiv \forall x (\neg(\exists y R(x,y)\land\forall y\neg S(x,y))\vee\neg(\exists y M(x,y)\land P))$
>
> $\equiv \forall x((\forall y\neg R(x,y)\lor\exists z S(x,z))\vee(\forall  u\neg M(x,u)\lor \neg P))$
>
> $\equiv \forall x\forall y\exists z\forall u(\neg R(x,y)\lor S(x,z)\vee\neg M(x,u)\lor \neg P)$

## Section.6 Rules of Inference

**Rule of inference(推理规则)** : A rule of inference is a valid argument form.

**Modus ponens** :

$p \rightarrow q$

$p$

————

$\therefore q$

**Modus tollens** :

$p \rightarrow q$

$\neg q$

————

$\therefore \neg p$

**Hypothetical syllogism** :

$p \rightarrow q$

$q \rightarrow r$

————

$\therefore p \rightarrow r$

**Disjunctive syllogism** :

$p \vee q$

$\neg p$

————

$\therefore q$

**Addition** :

$p$

————

$\therefore p \vee q$

**Simplification** :

$p \wedge q$

————

$\therefore p$

**Conjunction** :

$p$

$q$

————

$\therefore p \wedge q$

**Resolution** :

$p \vee q$

$\neg p \vee r$

————

$\therefore q \vee r$

---

> $$
Fallacies = \begin{cases}\text{The Fallacy of affirming the conclusion }\quad ((A \rightarrow B)\wedge B)\rightarrow A  \\
\text{The Fallacy of denying the hypothesis  }\quad ((A \rightarrow B)\wedge \neg A)\rightarrow \neg B\\
\end{cases}
> $$

---

**Universal instantiation(UI)** :

$\forall xP(x)$

————

$\therefore P(c)$

**Universal generalization(UG)**:

$P(c)$ for an arbitrary $c$

————

$\therefore \forall xP(x)$

**Existential instantiation(EI)**:

$\exists xP(x)$

————

$\therefore P(c)$ for some constant $c$

**Existential generalization(EG)**:

$P(c)$ for some constant $c$

————

$\therefore \exists xP(x)$
