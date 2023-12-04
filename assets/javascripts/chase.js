let img = document.querySelector('.img')
// 定义小图片的旋转角度
let deg = 0
// 定义小图片位于网页左侧的位置
let imgx = 0
// 定义小图片位于网页顶部的位置
let imgy = 0
// 定义小图片x轴的位置
let imgl = 0
// 定义小图片y轴的位置
let imgt = 0
// 定义小图片翻转的角度
let y = 0
// 定义一个计数器
let index = 0

window.addEventListener('mousemove', function (xyz) {
    imgx = window.scrollX + xyz.x - img.offsetLeft - img.clientWidth / 2 + 40
    imgy = window.scrollY + xyz.y - img.offsetTop - img.clientHeight / 2
    img.style.left = window.scrollX + imgl + "px"
    img.style.top = window.scrollY + imgt + "px"
    // 套入公式，定义图片的旋转角度
    deg = 360 * Math.atan(imgy / imgx) / (2 * Math.PI)
    // 每当鼠标移动的时候重置index
    index = 0
    // 定义当前鼠标的位置
    let x = event.clientX
    // 当鼠标的x轴大于图片的时候，提普安就要对着鼠标，所以需要将图片翻转过来
    // 否则就不用翻转
    if (img.offsetLeft < x) {
        y = -180
    } else {
        y = 0
    }
})
setInterval(() => {
    // 设置小图片的旋转和翻转
    img.style.transform = "rotateZ(" + deg + "deg) rotateY(" + y + "deg)"
    index++
    // 在这里设置小图片的位置和速度，并判断小图片到达鼠标位置时停止移动
    if (index < 50) {
        imgl += imgx / 50
        imgt += imgy / 50
    }
    img.style.left = imgl + "px"
    img.style.top = imgt + "px"
}, 10)