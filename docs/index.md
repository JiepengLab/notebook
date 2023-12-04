<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JJP</title>
    <style>
        canvas {
            position: fixed;
            width: 100%;
            height: 100%;
            right: 0%;
            bottom: 0%;
            z-index: -1;
        }
    </style>
</head>

<html>

    <canvas></canvas>

</html>
<script src="./assets/javascripts/canvas.js"></script>
</html>

# 👋欢迎

欢迎来到JiepengLab！我是浙江大学22级混合班的学生，主修计算机科学与技术，辅修竺可桢学院工程教育高级班。我会时不时更新一些目前正在学习的笔记！

!!! note ""
    你知道吗？在电脑端，长按能放一个巨~大的烟花噢🎇🎇🎇！

 <div class="experience" ></div>

<!DOCTYPE html>
<html lang="en">

<head>
    <style>
        .img{
            width: 50px;
            height: 50px;
            position: absolute;
            background-image: url('./images/chase.gif');
            background-size: cover;
        }
    </style>
</head>

<body>
    <div class="img"></div>
</body>
    <script src="./assets/javascripts/chase.js">
    </script>
</html>

页面总数：{{pages}} 总字数：{{words}} 网站运行时间：
<script> function updateTime() { var date = new Date(); var now = date.getTime(); var startDate = new Date("2023/09/12 00:00:00"); var start = startDate.getTime(); var diff = now - start; var y, d, h, m; y = Math.floor(diff / (365 * 24 * 3600 * 1000)); diff -= y * 365 * 24 * 3600 * 1000; d = Math.floor(diff / (24 * 3600 * 1000)); h = Math.floor(diff / (3600 * 1000) % 24); m = Math.floor(diff / (60 * 1000) % 60); if (y == 0) { document.getElementById("web-time").innerHTML = d + " 天 " + h + " 小时 " + m + " 分钟"; } else { document.getElementById("web-time").innerHTML = y + " 年 " + d + " 天 " + h + " 小时 " + m + " 分钟"; } setTimeout(updateTime, 1000 * 60); } updateTime(); function toggle_statistics() { var statistics = document.getElementById("statistics"); if (statistics.style.opacity == 0) { statistics.style.opacity = 1; } else { statistics.style.opacity = 0; } } </script>

<SCRIPT language=JavaScript>
var caution = false
function setCookie(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "")
    if (!caution || (name + "=" + escape(value)).length <= 4000)
        document.cookie = curCookie
    else
        if (confirm("Cookie exceeds 4KB and will be cut!"))
            document.cookie = curCookie
}
function getCookie(name) {
    var prefix = name + "="
    var cookieStartIndex = document.cookie.indexOf(prefix)
    if (cookieStartIndex == -1)
        return null
    var cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length)
    if (cookieEndIndex == -1)
        cookieEndIndex = document.cookie.length
    return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex))
}
function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
        document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT"
    }
}
function fixDate(date) {
    var base = new Date(0)
    var skew = base.getTime()
    if (skew > 0)
        date.setTime(date.getTime() - skew)
}
var now = new Date()
fixDate(now)
now.setTime(now.getTime() + 365 * 24 * 60 * 60 * 1000)
var visits = getCookie("counter")
if (!visits)
    visits = 1
else
    visits = parseInt(visits) + 1
setCookie("counter", visits, now)
document.write("欢迎光临本站，您是第" + visits + "位访问者！")
</SCRIPT>