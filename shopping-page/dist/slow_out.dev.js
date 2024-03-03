"use strict";

var _hor_move_animation = require("./hor_move_animation.js");

window.addEventListener('DOMContentLoaded', function () {
  var test = document.getElementsByClassName('test')[0];
  var aaa = document.getElementById('aaa');
  var hhh = document.getElementById('hhh');
  aaa.addEventListener('click', function () {
    (0, _hor_move_animation.horMoveAnimation)(test, 600);
  });
  hhh.addEventListener('click', function () {
    (0, _hor_move_animation.horMoveAnimation)(test, 800);
  });
});