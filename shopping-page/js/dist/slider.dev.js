"use strict";

var _vert_move_animation = require("./vert_move_animation.js");

//slidebar 效果
var slide_bar = document.getElementsByClassName('slide_bar')[0];
var sec1 = document.getElementsByClassName('sec1')[0];
var slide_wrap = document.getElementsByClassName('m_app')[0];
var back_top = document.getElementsByClassName('back_top')[0];
var slidebar_w = slide_bar.offsetWidth + 5;
var sec1Top = sec1.offsetTop; // let isScrollTop = sec1Top + slide_wrap.offsetTop;

var slide_wrap_w = slide_wrap.offsetWidth + 5; // let slidebar_eles = slide_bar.children;

var slidebar_css = {
  _position: 'position',
  _top: 'top',
  _right: 'right',
  _transform: 'transform',
  _marginLeft: "margin-left"
};
var _position = slidebar_css._position,
    _top = slidebar_css._top,
    _right = slidebar_css._right,
    _transform = slidebar_css._transform,
    _marginLeft = slidebar_css._marginLeft;
slide_bar.style.cssText += "".concat(_right, ": ").concat(-slidebar_w, "px; ").concat(_top, ": ").concat(sec1Top, "px");

function fixSlidebar() {
  var scroll_Y = window.pageYOffset - slide_wrap.offsetTop;

  if (scroll_Y >= sec1Top) {
    // slide_bar.style.position = 'sticky';
    slide_bar.style.cssText = "".concat(_transform, ": translateY(30px); ").concat(_position, ":fixed; ").concat(_top, ": 0; ").concat(_marginLeft, ": ").concat(slide_wrap_w, "px");
  } else {
    slide_bar.style.cssText = "".concat(_position, ":absolute; right: -").concat(slidebar_w, "px; ").concat(_top, ": ").concat(sec1Top, "px");
  } // for (const i of sec1_eles) {
  //     let i_bro = i.nextElementSibling || i;
  //     console.log(i_bro.offsetTop);
  //     console.log('aaaaa:   ' + i.offsetTop);
  //     if (scroll_Y >= i.offsetTop) {
  //         console.log(111);
  //     }
  // }

}

var goTop = function goTop() {
  (0, _vert_move_animation.vertMoveAnimation)(window, 0);
};

fixSlidebar();
document.addEventListener('scroll', fixSlidebar);
back_top.addEventListener('click', goTop);