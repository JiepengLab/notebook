document.addEventListener('visibilitychange', function () {
    if (document.visibilityState == 'hidden') {
        normal_title = "骗你的啦！";
        document.title = '网页未响应...';
    } else document.title = normal_title;
});