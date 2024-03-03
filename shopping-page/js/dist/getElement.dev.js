"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEle = void 0;

// 获取元素的封装函数 ele为元素，mode为获取元素的方式，p_ele是否是父元素获取（非document元素）
var getEle = function getEle(ele) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var p_ele = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (!ele) return false;
  var eleDom = null;
  p_ele = p_ele == null ? document.documentElement : p_ele;

  if (mode == 0) {
    eleDom = p_ele.getElementsByClassName(ele)[0];
  } else if (mode == 1) {
    eleDom = p_ele.getElementsByTagName(ele)[0];
  } else if (mode == 2) {
    eleDom = p_ele.getElementById(ele);
  }

  return eleDom;
};

exports.getEle = getEle;