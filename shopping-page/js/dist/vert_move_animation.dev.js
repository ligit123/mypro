"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.vertMoveAnimation = void 0;

var vertMoveAnimation = function vertMoveAnimation(eleObj, range) {
  var func = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  console.log(window);
  clearInterval(eleObj.timer);
  eleObj.timer = setInterval(function () {
    var eleY = eleObj.pageYOffset;
    var step = (range - eleY) / 10;
    step = step > 0 ? Math.ceil(step) : Math.floor(step);

    if (eleY == range) {
      clearInterval(eleObj.timer); // if (func) {
      //     func();
      // }

      func && func();
    }

    eleObj.scrollTo(0, eleY + step);
  }, 15);
};

exports.vertMoveAnimation = vertMoveAnimation;