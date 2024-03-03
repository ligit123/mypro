"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.horMoveAnimation = void 0;

var horMoveAnimation = function horMoveAnimation(eleObj, range) {
  var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  clearInterval(eleObj.timer);
  eleObj.timer = setInterval(function () {
    var eleLeft = eleObj.offsetLeft;
    var step = (range - eleLeft) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);

    if (eleLeft == range) {
      clearInterval(eleObj.timer);

      if (func) {
        func();
      }
    }

    eleObj.style.left = eleLeft + step + 'px';
  }, 15);
};

exports.horMoveAnimation = horMoveAnimation;