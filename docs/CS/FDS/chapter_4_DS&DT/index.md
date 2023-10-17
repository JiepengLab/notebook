# 数据结构与数据类型

我们先来区分一下三个概念：数据结构、基本数据类型、抽象数据类型（ADT/abstract data type）。

实际上，基本数据类型我们都是有了解的，比如C语言中的`int`, `float`等。

## 抽象数据类型

!!! quote "Wikipedia"
    In computer science, an abstract data type (ADT) is a mathematical model for data types, defined by its behavior (semantics) from the point of view of a user of the data, specifically in terms of possible values, possible operations on data of this type, and the behavior of these operations.

**抽象数据类型**，是对**基本数据类型**的抽象。在一个**抽象数据类型**中，我们不再关注每个元素具体是用什么类型的数据来存储，而关注各个元素之间的组织方式和操作。换句话说，就是基本数据类型提供了数据的“内容类型”，而抽象数据类型提供了数据的“组织方式”和“操作”。

## 数据结构

!!! quote "Wiki"
    The ADT defines the logical form of the data type. The data structure implements the physical form of the data type.

**数据结构**，是我们用编程语言实际实现**抽象数据类型**的方式。它定义了数据在计算机内存中的物理存储形式和操作方式。数据结构可以使用基本数据类型来实现，也可以使用其他数据结构来实现。

例如，对于ADT中的`Stack`，我们可以用数组或链表来实现，分别得到`Array Stack`和`Linked Stack`两种数据结构。这些数据结构都可以使用基本数据类型来存储数据，并提供栈的操作。

!!! note ""
    实际上，我们也可以用`Queue`来实现`Stack`.

所以，抽象数据类型是对数据的逻辑描述，数据结构是对数据的物理实现。抽象数据类型定义了数据的组织方式和操作，而数据结构定义了数据在计算机内存中的存储形式和操作方式。

本章，我们介绍数据结构分类（其实就是各个ADT）
、以及基本数据类型，对概念进行再次巩固。

!!! tip ""
    - [数据结构分类](./classification_of_data_structure.md)
    - [基本数据类型](./basic_data_type.md)