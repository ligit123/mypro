import { vertMoveAnimation } from './vert_move_animation.js';
//slidebar 效果
let slide_bar = document.getElementsByClassName('slide_bar')[0];
let sec1 = document.getElementsByClassName('sec1')[0];
let slide_wrap = document.getElementsByClassName('m_app')[0];
let back_top = document.getElementsByClassName('back_top')[0];

let slidebar_w = slide_bar.offsetWidth + 5;
let sec1Top = sec1.offsetTop;
// let isScrollTop = sec1Top + slide_wrap.offsetTop;
let slide_wrap_w = slide_wrap.offsetWidth + 5;
// let slidebar_eles = slide_bar.children;

const slidebar_css = {
    _position: 'position',
    _top:'top',
    _right:'right',
    _transform:'transform',
    _marginLeft: "margin-left"
}
const {
    _position,
    _top,
    _right,
    _transform,
    _marginLeft } = slidebar_css;

slide_bar.style.cssText += `${_right}: ${-slidebar_w}px; ${_top}: ${sec1Top}px`;

function fixSlidebar() {
    let scroll_Y = window.pageYOffset - slide_wrap.offsetTop;
    if (scroll_Y >= sec1Top) {
        // slide_bar.style.position = 'sticky';
        slide_bar.style.cssText = `${_transform}: translateY(30px); ${_position}:fixed; ${_top}: 0; ${_marginLeft}: ${slide_wrap_w}px`;
    } else {
        slide_bar.style.cssText = `${_position}:absolute; right: -${slidebar_w}px; ${_top}: ${sec1Top}px`;
    }
    // for (const i of sec1_eles) {
    //     let i_bro = i.nextElementSibling || i;
    //     console.log(i_bro.offsetTop);
    //     console.log('aaaaa:   ' + i.offsetTop);
    //     if (scroll_Y >= i.offsetTop) {
    //         console.log(111);
    //     }
    // }
}
const goTop = () => {
    vertMoveAnimation(window, 0);
}
fixSlidebar();
document.addEventListener('scroll', fixSlidebar);
back_top.addEventListener('click', goTop);
