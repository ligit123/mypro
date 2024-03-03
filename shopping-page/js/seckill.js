window.addEventListener('DOMContentLoaded', function () {
    // 截止日期
    function getFinalTime(final_time) {
        return +new Date(final_time);
    }
    // 当前时间
    function getNowTime() {
        return +new Date();
    }
    // 不满两位数补0并返回
    function preZero(time) {
        if (time < 10) {
            return `0${time}`;
        }
        return time;
    }
    function Countdown(time) {
        let now_time = getNowTime(); // 返回现在的毫秒数
        let final_time = getFinalTime(time); // 返回输入的毫秒数
        if (final_time < now_time) {
            clearInterval(coundown);
            return '--时间不能是过去时--';
        }
        let left_time = (final_time - now_time) / 1000; // 剩余时间的秒数
        let day = parseInt(left_time / 60 / 60 / 24); // 天数
        let hour = preZero(Math.floor(left_time / 60 / 60 % 24)); // 时
        let min = preZero(Math.floor(left_time / 60 % 60 )); // 分
        let sec = preZero(Math.floor(left_time % 60 )); // 秒
        // 使用模板字符串进行连接
        let new_time = `<span>${day}日</span><i>:</i><span>${hour}</span><i>:</i><span>${min}</span><i>:</i><span>${sec}</span><i>`;
    
        return new_time;
    }
    // 获取页面元素并插入
    // function getEle(ele, final_time = null) {
    //     let left_time = document.querySelector(ele);
    //     if (final_time != null) {
    //         left_time.innerHTML = Countdown(final_time);
    //     }
    // }
    // 先调用一次，消除第一次等待时间
    // getEle('#sk_countdown .left_time');
    // setInterval(getEle, 1000, '#sk_countdown .left_time', '2021/10/28 24:00:00');
    const coundown = setInterval(() => {
        let left_time = document.querySelector('#sk_countdown .left_time');
        left_time.innerHTML = Countdown('2022/1/1 24:00:00');
    }, 1000);
});
