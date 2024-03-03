import { getEle } from './getElement.js';
window.addEventListener('load', function() {
    Enlarge();
});

function Enlarge() {
    // getEle（a, b, c）,a是元素的类名或tag名或id，b是模式{0是类选择，1是tag选择，2是id选择}, c是[如果有父元素-可选]
    let preview = getEle('preview', 0);
    let y_box = getEle('y_box', 0);
    let big_pic_wrap = getEle('big_pic', 0);
    // let the_small_pic = preview.getElementsByTagName('img')[0];
    let the_big_pic = getEle('img', 1, big_pic_wrap);
    
    function showBox() {
        y_box.style.display = 'block';
        big_pic_wrap.style.display = 'block';
        // 获取黄色透明盒子和父盒子的宽高
        let ybox_w = y_box.offsetWidth;
        let ybox_h = y_box.offsetHeight;
        let pbox_w = preview.offsetWidth;
        let pbox_h = preview.offsetHeight;
        // 获取黄色透明盒子的宽和高的 一半
        let ybox_half_w = (ybox_w / 2);
        let ybox_half_h = (ybox_h / 2);
        // 获取黄色透明盒子边界在父盒子范围内所能移动下最大距离
        let limitX = pbox_w - ybox_w;
        let limitY = pbox_h - ybox_h;
        function yboxMove(e) {
            // 获取鼠标在盒子内或图片上的坐标
            let mouseX = e.pageX - preview.offsetLeft;
            let mouseY = e.pageY - preview.offsetTop;
            // 鼠标的坐标减去盒子的一半宽和高，使鼠标在黄色透明盒子居中
            let yboxX = mouseX - ybox_half_w;
            let yboxY = mouseY - ybox_half_h;

            // 限制黄色透明盒子在父盒子中的的左右边界
            if (yboxX <= 0) {
                yboxX = 0;
            } else if (yboxX >= limitX) {
                yboxX = limitX
            }
            // 限制黄色透明盒子在父盒子中的的上下边界
            if (yboxY <= 0) {
                yboxY = 0;
            } else if (yboxY >= limitY) {
                yboxY = limitY
            }
            // 大图片所能移动的最大距离
            let big_pic_X = the_big_pic.offsetWidth - big_pic_wrap.offsetWidth;
            let big_pic_Y = the_big_pic.offsetHeight - big_pic_wrap.offsetHeight;
            // 根据 黄透盒移动距离 / 黄透盒移动的最大距离 = 大图片移动距离 / 大图片移动的最大距离 求出大图片所该移动的距离
            let the_big_pic_X = yboxX * big_pic_X / limitX;
            let the_big_pic_Y = yboxY * big_pic_Y / limitY;

            y_box.style.cssText += `left: ${yboxX}px;top: ${yboxY}px;`;
            the_big_pic.style.cssText += `left:${-the_big_pic_X}px;top:${-the_big_pic_Y}px`;
        }
        preview.addEventListener('mousemove', yboxMove);
    }
    function hideBox() {
        y_box.style.display = 'none';
        big_pic_wrap.style.display = 'none';
    }
    preview.addEventListener('mouseenter', showBox);
    preview.addEventListener('mouseleave', hideBox);
}
