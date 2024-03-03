"use strict";

var _hor_move_animation = require("./hor_move_animation.js");

window.addEventListener('DOMContentLoaded', function () {
  // slipperMove();
  // mobSlide();
  toDo();
}); // 筋斗云效果

var slipperMove = function slipperMove() {
  var slipper = document.getElementsByClassName('slipper')[0];
  var navs = document.getElementsByClassName('navs')[0].children;
  var current = 0;

  var _loop = function _loop(i) {
    var nav = navs[i];
    nav.addEventListener('mouseenter', function () {
      (0, _hor_move_animation.horMoveAnimation)(slipper, nav.offsetLeft);
    });
    nav.addEventListener('mouseleave', function () {
      (0, _hor_move_animation.horMoveAnimation)(slipper, current);
    });
    nav.addEventListener('click', function () {
      current = nav.offsetLeft;
      (0, _hor_move_animation.horMoveAnimation)(slipper, current);
    });
  };

  for (var i = 0; i < navs.length; i++) {
    _loop(i);
  }
}; // 手机端图片滚动


var mobSlide = function mobSlide() {
  var sliwrap = document.querySelector('.sliwrap');
  var dist = sliwrap.offsetWidth;
  var pics = sliwrap.querySelector('.pics');
  var pic_len = pics.children.length - 2;
  var indicators = document.querySelector('.indicators');
  var index = 0; // 动态添加指示符

  for (var i = 0; i < pic_len; i++) {
    var sli_span = document.createElement('span');
    indicators.appendChild(sli_span);
  }

  indicators.children[0].classList.add('indicator_active'); // 图片移动的距离

  var picMove = function picMove(m_index) {
    var disp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var plus = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var translateX = -dist * m_index + plus;

    if (disp == 0) {
      pics.style.transition = 'none';
    }

    if (disp == 1) {
      pics.style.transition = 'all .3s';
    }

    pics.style.transform = "translateX(".concat(translateX, "px)"); // isMoveStop = true;
  }; // 指示符的位置


  var indiShow = function indiShow(m_index) {
    indicators.querySelector('.indicator_active').classList.remove('indicator_active');

    if (m_index < pic_len) {
      m_index = m_index < 0 ? pic_len - 1 : m_index;
      indicators.children[m_index].classList.add('indicator_active');
    } else {
      indicators.children[0].classList.add('indicator_active');
    }
  }; // 图片和指示符的对应


  var moveDis = function moveDis() {
    index++;
    picMove(index);
    indiShow(index);
  };

  var timer = setInterval(moveDis, 2000); // 自动轮播
  // 无缝滚动

  pics.addEventListener('transitionend', function () {
    if (index >= pic_len) {
      index = 0;
    } else if (index < 0) {
      index = pic_len - 1;
    }

    picMove(index, 0);
  }); // 手指滑动轮播图
  // 触摸元素touchstart：获取手指初始坐标

  var startX = 0;
  var moveX = 0;
  var isMove = false;
  pics.addEventListener('touchstart', function (e) {
    startX = e.targetTouches[0].pageX;
    clearInterval(timer); // if (index >= pic_len || index <= -1) {
    //     pics.removeEventListener('touchmove', touchMove);
    // }
    // pics.addEventListener('touchmove', touchMove);
  }); // 手指移动图片

  var touchMove = function touchMove(e) {
    moveX = e.targetTouches[0].pageX - startX;

    if (Math.abs(moveX) >= dist) {
      if (moveX > 0) {
        moveX = dist;
      } else if (moveX < 0) {
        moveX = -dist;
      }
    }

    picMove(index, 0, moveX);
    isMove = true;
    e.preventDefault();
  };

  pics.addEventListener('touchmove', touchMove); // 手指离开，根据移动距离判断回弹上一张或下一张

  pics.addEventListener('touchend', function (e) {
    if (isMove) {
      if (Math.abs(moveX) > 50) {
        if (moveX > 0) {
          index--;
        } else {
          index++;
        }
      }

      picMove(index, 1);
      indiShow(index);
      isMove = false;
    } // clearInterval(timer);


    timer = setInterval(moveDis, 2000);
  });
}; // $(function () {
// pShowHide();
// pSlide();
// mComment();
// toDo();
// })


function pShowHide() {
  var ind = 0;
  $('.pinf span').click(function () {
    ind = $(this).index();
    $('.pinf img').eq(ind).show().siblings().hide(); // $('.pinf img').eq(ind).siblings().hide();

    console.log(ind);
  });
}

function pSlide() {
  $('.pinf span').hover(function () {
    var ind = $(this).index();
    $('.pinf img').eq(ind).stop().show();
    $('.pinf img').eq(ind).siblings().stop().hide();
  });
}

function mComment() {
  $('.pub').on('click', function () {
    var cont = $('#m_textarea').val();
    var p = $('<p></p>');
    var onecont = $('<div><span>删除</span></div>').addClass('one_cont');
    if (!cont) return false;
    p.html(cont);
    onecont.prepend(p);
    $('.com_cont').prepend(onecont);
    $('#m_textarea').val('');
  });
  $(".com_cont").on("click", "span", function () {
    console.log(11);
    $(this).parent().slideUp(function () {
      $(this).remove();
    });
  });
}

var toDo = function toDo() {
  var dowhat = document.getElementsByClassName('dowhat')[0]; // 键入的表单元素

  var m_doing = document.querySelector('.m_doing'); // 建立的任务 元素

  var m_done = document.querySelector('.m_done'); // 按下回车键后所要执行的任务

  var showTask = function showTask(e) {
    if (e.key === 'Enter' && e.keyCode === 13) {
      var localdata = getLocalData();
      var typedata = getTypeData(dowhat);

      if (!typedata) {
        return false;
      }

      localdata.push({
        title: typedata,
        done: false
      });
      saveData(localdata);
      loadData();
      dowhat.value = '';
    }
  };

  dowhat.addEventListener('keydown', showTask);

  var manageTask = function manageTask(e) {
    // let m_rem = document.querySelector('.m_rem');
    var data = getLocalData();
    var what = null; // 找到父级并加以判断

    var findWhat = function findWhat(cname) {
      // let span = e.target;
      what = what != null ? what : e.target.parentNode;

      if (what.classList.contains(cname)) {
        var index = what.getAttribute('id');
        return index;
      } else {
        findWhat(toString(what.className));
      }
    }; // 删除任务


    if (e.target.classList.contains('m_rem')) {
      var index = findWhat('what');
      data.splice(index, 1);
      saveData(data);
      loadData();
    } // 选中完成的任务并添加到已完成列表


    if (e.target.classList.contains('don')) {
      var _index = findWhat('what'); // console.log(e.target.checked);


      data[_index].done = e.target.checked;
      saveData(data);
      loadData();
    }
  };

  m_doing.addEventListener('click', manageTask);
  m_done.addEventListener('click', manageTask); // 获取表单中的创建的任务内容

  var getTypeData = function getTypeData(ele) {
    var val = ele.value;
    if (val && val != '\s\t') return val;
  }; // 获取本地存储和用户新添加的数据


  var getLocalData = function getLocalData() {
    var data = localStorage.getItem('todolist'); // let data = localStorage.getData;

    if (data != null) {
      return JSON.parse(data);
    } else {
      return [];
    }
  }; // 本地存储数据


  var saveData = function saveData(data) {
    var m_data = JSON.stringify(data);
    localStorage.setItem('todolist', m_data);
  };

  var loadData = function loadData() {
    // let m_localdata = localdata;
    m_doing.innerHTML = '';
    m_done.innerHTML = '';
    var m_localdata = getLocalData(); // 判断空数组 []

    if (Array.prototype.isPrototypeOf(m_localdata) && m_localdata.length === 0) {
      m_doing.style.display = 'none';
      m_done.style.display = 'none';
      return false;
    } else {
      m_doing.style.display = 'block';
      m_done.style.display = 'block';
    }

    var check = '';
    m_localdata.forEach(function (val, i) {
      if (val.done == true) {
        check = 'checked';
      }

      var m_html = "<div class=\"what\" id='".concat(i, "'>\n            <input type=\"checkbox\" ").concat(check, " class=\"don\">\n            <p class=\"thing\">").concat(val.title, "</p>\n            <span class=\"icon-close-solid m_rem\"></span>\n            </div>");
      var frag = document.createRange().createContextualFragment(m_html);

      if (val.done == false) {
        m_doing.appendChild(frag);
      } else {
        m_done.appendChild(frag);
      }
    });
  };

  loadData();
};