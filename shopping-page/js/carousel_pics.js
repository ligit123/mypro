import { getEle } from './getElement.js'; // 获取元素的封装函数
import { horMoveAnimation } from './hor_move_animation.js';
window.addEventListener('load',function() {
    let banner = getEle('banner', 0);
    // 左右点击按钮
    let prevBtn = getEle('lbtn_wrap', 0, banner); 
    let nextBtn = getEle('rbtn_wrap', 0, banner);
    
    let carousel_pics = getEle('carousel_pics', 0, banner); // 获取包含图片的元素
    let all_pics = carousel_pics.children;
    let slider_indicators = getEle('slider_indicators', 0); // 获取小圆点
    let pic_w = getEle('li', 1, carousel_pics).offsetWidth; // 获取每张图片的宽度
    let sliEles = null;
    let num = 0;
    let flag = true;

    const addClass = (obj, cname) => {
        obj.classList.add(cname);
        return false;
    }
    const removeClass = (obj, cname) => {
        obj.classList.remove(cname);
        return false;
    }
    // 遍历出每张图片，并实现移动和播放图片效果
    for (let i = 0; i < all_pics.length; i++) {
        // 根据图片个数创建并添加小圆点元素
        let sli_span = document.createElement('span');
        slider_indicators.appendChild(sli_span);
        sliEles = slider_indicators.children; // 小圆点的集合
        sliEles[i].setAttribute('index', i); // 给小圆点元素设置自定义属性，记录其下标值
        sliEles[0].classList.add('indicator_active'); // 页面加载首张图第一个小圆点为激活状态
        // 鼠标移入小圆点，显示对应图片
        const indHover = () => {
            for (let i = 0; i < sliEles.length; i++) {
                // if (sliEles[i].indexOf('indicator_active' != -1)) {
                // if (sliEles[i].classList.contains('indicator_active')) {
                    // sliEles[i].classList.remove('indicator_active');
                removeClass(sliEles[i], 'indicator_active');
                // }
            }
            // 随着激活不同小圆点滚动到对应的图片
            // sliEles[i].classList.add('indicator_active');
            addClass(sliEles[i], 'indicator_active');
            let index = sliEles[i].getAttribute('index');
            num = index;
            // 调用函数，图片滑动效果
            horMoveAnimation(carousel_pics, -(pic_w * index));
        }
        sli_span.addEventListener('mouseenter', indHover);
    }
    // 克隆第一张图片，为实现无缝滚动
    let first_pic = all_pics[0].cloneNode(true);
    carousel_pics.appendChild(first_pic);
    let pic_num = all_pics.length - 1;

    const nextPic = () => {
        if (flag) {
            flag = false;
            // console.log('next: ' + num);
            // 当图片走到最后一张的时候，直接让整个图片框复位成 left: 0，然后再 num++，此时右移一张图片的距离，就形成了无缝滚动
            if (num == pic_num) {
                num = 0;
                carousel_pics.style.left = 0;
                // console.log(999);
            }
            num++; // num++让点击按钮时这个数字永远为加1的状态，也就是点击按钮为下一张图片
            horMoveAnimation(carousel_pics, -(pic_w * num), ()=> {
                flag = true;
            });
            // console.log('大大大： ' + num);
            if (sliEles[num]) sliEles[num].classList.add('indicator_active');
            if (num == pic_num) {
                sliEles[0].classList.add('indicator_active');
            }
            sliEles[num-1].classList.remove('indicator_active');
        }
    }
    const prevPic = () => {
        if (flag) {
            flag = false;
            // console.log('prev: ' + num);
            if (num == 0) {
                num = pic_num;
                carousel_pics.style.left = `${-num * pic_w}px`;
            }
            num--;
            // console.log('哈哈: ' + num);
            horMoveAnimation(carousel_pics, -(pic_w * num), () => {
                flag = true;
            });
    
            sliEles[num].classList.add('indicator_active');
            if (num == pic_num-1) {
                sliEles[0].classList.remove('indicator_active');
            }
            if (sliEles[num+1]) sliEles[num+1].classList.remove('indicator_active');
        }
    }
    nextBtn.addEventListener('click', nextPic);
    prevBtn.addEventListener('click', prevPic);

    let clickTimer =  setInterval(() => {
        nextBtn.click();
    }, 3000);

    carousel_pics.addEventListener('mouseenter', () => {
        clearInterval(clickTimer);
        clickTimer = null;
    });
    carousel_pics.addEventListener('mouseleave', () => {
        clickTimer =  setInterval(() => {
            nextBtn.click();
        }, 3000);
    });
})

