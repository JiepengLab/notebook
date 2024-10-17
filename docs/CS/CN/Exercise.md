# Exercise 2

## Q1

Q. Television channels are 9 MHz wide. How many bits/sec can be sent if 8-level digital signals are used? Assume a noiseless channel.
A. ____Mbps

在无噪声信道中，使用 2 电平数字信号（也就是每次传输 1 个比特）的情况下，我们可以使用 **奈奎斯特定理** 来计算最大数据速率。根据奈奎斯特公式，最大数据速率为：

\[
C = 2 \times B \times \log_2(V)
\]

其中：
- \(C\) 是信道容量（即最大数据速率，单位：bps）。
- \(B\) 是信道带宽（单位：Hz），在这个例子中是 \(15 MHz = 15 \times 10^6 Hz\)。
- \(V\) 是信号的电平数。对于 2 电平数字信号，\(V = 2\)。

因此公式为：

\[
C = 2 \times 15 \times 10^6 \times 1 = 30 \times 10^6 \, \text{bps}
\]

将 bps 转换为 Mbps：

\[
C = 30 \, \text{Mbps}
\]

因此，使用 2 电平数字信号的情况下，这个 15 MHz 的电视信道可以传输 **30 Mbps** 的数据。

## Q2

Q. If a binary signal is sent over a 3-kHz channel whose signal-to-noise ratio is 22 dB, what is the maximum achievable data rate?
A. ____kbps