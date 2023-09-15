document.addEventListener('visibilitychange', function () {
    if (document.visibilityState == 'hidden') {
        normal_title = "(≧∀≦)♪你回来啦！";
        document.title = '!!!∑(ﾟДﾟノ)ノ网页未响应...';
    } else document.title = normal_title;
});