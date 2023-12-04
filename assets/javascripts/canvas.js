
// 定义星星的颜色
const STAR_COLOR = '#fff';
const colours = ["#ff0000", "#ffff00", "#00ff00", "#4a86e8"];
// 定义星星的大小
const STAR_SIZE = 3;
// 定义星星的最小缩放比例
const STAR_MIN_SCALE = 0.2;
// 定义溢出阈值
const OVERFLOW_THRESHOLD = 50;
// 定义星星的数量
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
// 获取canvas元素
const canvas = document.querySelector('canvas');
// 获取canvas的绘图上下文
const context = canvas.getContext('2d');
// 定义缩放比例
let scale = 1; // device pixel ratio
// 定义宽度和高度
let width;
let height;
// 定义星星数组
let stars = [];
// 定义鼠标指针的位置
let pointerX;
let pointerY;
// 定义速度对象
let velocity = { x: 0, y: 0, tx: 0, ty: 0, z: 0.0009 };
// 定义触摸输入标志
let touchInput = false;
// 生成星星
generate();
// 调整大小
resize();
// 运行动画
step();
// 当窗口大小改变时，重新调整大小
window.onresize = resize;
// 当鼠标在canvas上移动时，更新鼠标指针位置
canvas.onmousemove = onMouseMove;
// 当触摸屏在canvas上移动时，更新鼠标指针位置
canvas.ontouchmove = onTouchMove;
// 当触摸屏离开canvas时，更新鼠标指针位置
canvas.ontouchend = onMouseLeave;
// 当鼠标离开文档时，更新鼠标指针位置
document.onmouseleave = onMouseLeave;
// 生成星星
function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: 0,
            y: 0,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
    }
}
// 将星星放置到随机位置
function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
    context.strokeStyle = colours[Math.floor(Math.random() * colours.length)];
}
// 回收星星并重新放置到新的位置
function recycleStar(star) {
    // 初始化方向为 'z'
    let direction = 'z';
    // 获取速度的绝对值
    let vx = Math.abs(velocity.x);
    let vy = Math.abs(velocity.y);
    // 如果速度的绝对值大于1，则根据速度的大小随机确定方向
    if (vx > 1 || vy > 1) {
        let axis;
        // 如果水平速度大于垂直速度，则根据水平速度的比例随机确定水平或垂直方向
        if (vx > vy) {
            axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
            axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }
        // 根据方向确定具体的移动方向
        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        } else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }
    // 随机设置星星的缩放比例
    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
    // 根据方向设置星星的位置
    if (direction === 'z') {
        // 如果方向为 'z'，则将星星放置在屏幕中心
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    } else if (direction === 'l') {
        // 如果方向为 'l'，则将星星放置在屏幕左侧
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 'r') {
        // 如果方向为 'r'，则将星星放置在屏幕右侧
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 't') {
        // 如果方向为 't'，则将星星放置在屏幕顶部
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
        // 如果方向为 'b'，则将星星放置在屏幕底部
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }
}
// 调整大小
function resize() {
    // 获取设备像素比例
    scale = window.devicePixelRatio || 1;
    // 设置画布的宽度和高度
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;
    canvas.width = width;
    canvas.height = height;
    // 将所有星星重新放置到屏幕上
    stars.forEach(placeStar);
}
// 动画的每一帧
function step() {
    // 清空画布
    context.clearRect(0, 0, width, height);
    // 更新星星的位置和速度
    update();
    // 绘制星星
    render();
    // 请求下一帧动画
    requestAnimationFrame(step);
}
// 更新星星的位置和速度
function update() {
    // 缓动速度
    velocity.tx *= 0.46;
    velocity.ty *= 0.46;
    // 更新速度
    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;
    // 遍历所有星星
    stars.forEach((star) => {
        // 根据速度和缩放比例更新星星的位置
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        // 根据速度和缩放比例更新星星的位置（使星星围绕屏幕中心旋转）
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        // 更新星星的缩放比例
        star.z += velocity.z;
        // 如果星星超出屏幕范围，则重新放置到屏幕上
        if (
            star.x < -OVERFLOW_THRESHOLD ||
            star.x > width + OVERFLOW_THRESHOLD ||
            star.y < -OVERFLOW_THRESHOLD ||
            star.y > height + OVERFLOW_THRESHOLD
        ) {
            recycleStar(star);
        }
    });
}
// 绘制星星
function render() {
    // 遍历所有星星
    stars.forEach((star) => {
        // 设置绘制星星的样式
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        // 绘制星星的路径
        context.beginPath();
        context.moveTo(star.x, star.y);
        // 计算星星的尾巴坐标
        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        // 如果尾巴坐标的绝对值小于0.1，则设置为0.5
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        // 绘制星星的尾巴
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });
}
// 移动鼠标指针
function movePointer(x, y) {
    // 如果之前有记录鼠标指针的位置，则计算鼠标指针的移动距离，并更新速度
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
        let ox = x - pointerX;
        let oy = y - pointerY;
        velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
        velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }
    // 更新鼠标指针的位置
    pointerX = x;
    pointerY = y;
}
// 当鼠标在canvas上移动时的事件处理函数
function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
}
// 当触摸屏在canvas上移动时的事件处理函数
function onTouchMove(event) {
    touchInput = true;
    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
    event.preventDefault();
}
// 当鼠标离开canvas时的事件处理函数
function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}