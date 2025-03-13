# [LAB 1 OpenCV 的安装和使用](http://www.cad.zju.edu.cn/home/gfzhang/course/computational-photography/2024/lab1-hellocv/hellocv.html)

我一开始是使用 VS2017，后面感觉还是不如 VSCode 顺手，所以就转到了 VSCode 上面。

OpenCV用的还是在课程网站上下载的3.4.5版本，配置环境主要参考了[VScode搭建Opencv（C++开发环境）](https://blog.csdn.net/qq_45022687/article/details/120241068)这篇文章，辅以[如何优雅地在你的Vscode上使用opencv（C++接口，Windows篇，实则踩坑经历）](https://zhuanlan.zhihu.com/p/402378383)。

``` cpp
#include <opencv2/opencv.hpp>
using namespace cv;

int main(int argc, char* argv[]) {
    Mat image = imread("opencv-logo.png"); // 载入名为 "opencv-logo.png" 的图片
    namedWindow("hello"); // 创建一个标题为 "hello" 的窗口
    imshow("hello", image); // 在窗口 "hello" 中显示图片
    waitKey(0); // 等待用户按下键盘
    destroyWindow("hello"); // 销毁窗口 "hello"
    return 0;
}
```

## Task 1

修改 Hello, OpenCV 的程序，使用 image.at<...>(...) 访问图像中的像素。

1. 图像的通道数是多少？每个通道是什么类型？

在OpenCV中，图像的通道数通常是3，代表红色、绿色和蓝色，每个通道的类型是无符号字符（unsigned char），即 `CV_8UC3`。

`CV_32FC3` 代表每个通道是一个32位浮点数，`CV_64FC3` 代表每个通道是一个64位浮点数。

2. at<...> 的尖括号里要使用什么类型？

提示：Vec3b

在使用 `image.at<…>(…)` 访问图像中的像素时，如果图像是多通道的，你需要使用 `Vec3b` 类型。这表示每个像素由3个无符号字符组成，分别对应蓝色、绿色和红色通道。例如，对于一个三通道的图像，你可以使用 `image.at<Vec3b>(y, x)` 来访问像素 (x, y)。

!!! note "[【OpenCV】关于Vec3b类型的含义与使用](https://blog.csdn.net/newcong0123/article/details/110650047)"

    `Vec3b` 可以看作是 `vector<uchar, 3>`，即一个`uchar`类型、长度为`3`的`vector`向量。

    简单来说，`Vec3b`就是一个`uchar`类型的数组，长度为 `3`。

    ``` cpp
    Mat mat = imread("test.jpg");

    //(row, col)即所需要定位点的坐标
    mat.at<Vec3b>(row, col)[0] = 255;　　//修改点 (row, col) 的 B 通道数据
    mat.at<Vec3b>(row, col)[1] = 255;　　//修改点 (row, col) 的 G 通道数据
    mat.at<Vec3b>(row, col)[2] = 255;　　//修改点 (row, col) 的 R 通道数据
    ```

    !!! note "抓拍"

        ``` cpp
        #include "opencv2/core.hpp"
        #include "opencv2/imgproc.hpp"
        #include "opencv2/highgui.hpp"
        #include <iostream>

        using namespace cv;
        using namespace std;

        int main()
        {
            VideoCapture capture;
            capture.open(0);  //读入默认摄像头
            if (!capture.isOpened()) {
                cout << "video not open.\n";
                return -1;
            }

            Mat frame;
            capture >> frame;  //读一帧
            if (frame.empty()) {
                cout << "get frame error.\n";
                return -1;
            }

            //遍历该图像每一个像素，并输出 BGR 值
            for (int i = 0; i < frame.rows; i++) {
                for (int j = 0; j < frame.cols; j++) {
                    Vec3b bgr = frame.at<Vec3b>(i, j);
                    printf("b = %d, g = %d, r = %d\n", bgr[0], bgr[1], bgr[2]);
                }
            }

            return 0;
        }
        ```

所以，修改程序如下：

``` cpp
#include <opencv2/opencv.hpp>
using namespace cv;

int main(int argc, char *argv[])
{
	Mat image = imread("opencv-logo.png"); // 载入名为 "opencv-logo.png" 的图片

	for (int i = 0; i < image.rows; i++)
	{
		for (int j = 0; j < image.cols; j++)
		{
			Vec3b bgr = image.at<Vec3b>(i, j);
			printf("b = %d, g = %d, r = %d\n", bgr[0], bgr[1], bgr[2]);
		}
	}

	namedWindow("hello");	// 创建一个标题为 "hello" 的窗口
	imshow("hello", image); // 在窗口 "hello" 中显示图片
	waitKey(0);				// 等待用户按下键盘
	destroyWindow("hello"); // 销毁窗口 "hello"
	return 0;
}
```

## Task 2

遍历 image 的每个像素，将图像的白色部分修改为黑色。

图像的长宽要怎么获得?图像的长和宽与矩阵的行数列数是什么关系？

在OpenCV中，图像的长和宽分别对应矩阵的行数和列数。可以使用 `image.rows` 和 `image.cols` 来获取图像的长和宽。

``` cpp
#include <opencv2/opencv.hpp>
using namespace cv;

int main(int argc, char *argv[])
{
	Mat image = imread("opencv-logo.png"); // 载入名为 "opencv-logo.png" 的图片

	for (int i = 0; i < image.rows; i++)
	{
		for (int j = 0; j < image.cols; j++)
		{
			if (image.at<Vec3b>(i, j)[0] == 255 && image.at<Vec3b>(i, j)[1] == 255 && image.at<Vec3b>(i, j)[2] == 255)
			{
				image.at<Vec3b>(i, j)[0] = 0;
				image.at<Vec3b>(i, j)[1] = 0;
				image.at<Vec3b>(i, j)[2] = 0;
			}
		}
	}

	namedWindow("hello");	// 创建一个标题为 "hello" 的窗口
	imshow("hello", image); // 在窗口 "hello" 中显示图片
	waitKey(0);				// 等待用户按下键盘
	destroyWindow("hello"); // 销毁窗口 "hello"
	return 0;
}
```

一幅640x480图片可以按照如下方式构造：

``` cpp
Mat img(480, 640, CV_8UC3);
```

注意长和宽在构造函数中出现的顺序。

## Task 3

修改程序，将 image 反色。
尝试不遍历像素，直接用 Mat 的基本运算（减法）完成这个任务。

提示：Vec3b(255, 255, 255) - image

``` cpp
#include <opencv2/opencv.hpp>
using namespace cv;

int main(int argc, char *argv[])
{
	Mat image = imread("opencv-logo.png");								// 载入名为 "opencv-logo.png" 的图片
	Mat white = Mat(image.size(), image.type(), Scalar(255, 255, 255)); // 创建一个大小与 image 相同的白色图片

	image = white - image; // 将白色图片减去原图片，得到的结果是原图片的反色

	namedWindow("hello");	// 创建一个标题为 "hello" 的窗口
	imshow("hello", image); // 在窗口 "hello" 中显示图片
	waitKey(0);				// 等待用户按下键盘
	destroyWindow("hello"); // 销毁窗口 "hello"
	return 0;
}
```

## Task 4

构造下面的 32×32 矩阵 M ，计算它的逆 $M^{-1}$。

$$
M = \begin{bmatrix}
2 &-1 & 0 & \cdots & 0 \\
-1 & 2 & -1 & \cdots & 0 \\
0 & -1 & 2 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & \cdots & 2
\end{bmatrix}
$$



尝试将 $M ^{−1}$显示成一个灰度图，每个元素对应一个像素的亮度，最大值为白色，最小值为黑色。

将结果给助教检查。

``` cpp
#include <opencv2/opencv.hpp>
using namespace cv;

int main(int argc, char *argv[])
{
	Mat image = Mat(32, 32, CV_32FC1);
	image.setTo(0.0f);
	image.at<float>(0, 0) = 2.0f;
	for (int i = 1; i < 32; i++)
	{
		image.at<float>(i, i) = 2.0f;
		image.at<float>(i - 1, i) = -1.0f;
		image.at<float>(i, i - 1) = -1.0f;
	}

	Mat image_inv = image.inv();
	Mat result;
	normalize(image_inv, result, 1.0, 0.0, CV_MINMAX); // 重新映射，使最小值为黑，最大值为白
	imshow("image_inv_normalized", result);
	waitKey(0);
}
```