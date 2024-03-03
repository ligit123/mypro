import { horMoveAnimation } from './hor_move_animation.js';
window.addEventListener('DOMContentLoaded', function() {
    // slipperMove();
    // mobSlide();
    toDo();
})
// 筋斗云效果
const slipperMove = () => {
    let slipper = document.getElementsByClassName('slipper')[0];
    let navs = document.getElementsByClassName('navs')[0].children;
    let current = 0;
    for (let i = 0; i < navs.length; i++) {
        const nav = navs[i];
        nav.addEventListener('mouseenter', () => {
            horMoveAnimation(slipper, nav.offsetLeft);
        });
        nav.addEventListener('mouseleave', () => {
            horMoveAnimation(slipper, current);
        });
        nav.addEventListener('click', () => {
            current = nav.offsetLeft;
            horMoveAnimation(slipper, current);
        });
    }
}
// 手机端图片滚动
const mobSlide = () => {
    let sliwrap = document.querySelector('.sliwrap');
    let dist = sliwrap.offsetWidth;
    let pics = sliwrap.querySelector('.pics');

    let pic_len = pics.children.length - 2;
    let indicators = document.querySelector('.indicators');

    let index = 0;
    // 动态添加指示符
    for (let i = 0; i < pic_len; i++) {
        let sli_span = document.createElement('span');
        indicators.appendChild(sli_span);
    }
    indicators.children[0].classList.add('indicator_active');
    // 图片移动的距离
    const picMove = (m_index, disp = 1, plus = 0) => {
        let translateX = -dist * m_index + plus;
        if (disp == 0) {
            pics.style.transition = 'none';
        }
        if (disp == 1) {
            pics.style.transition = 'all .3s';
        }
        pics.style.transform = `translateX(${translateX}px)`;
        // isMoveStop = true;
    }
    // 指示符的位置
    const indiShow = (m_index) => {
        indicators.querySelector('.indicator_active').classList.remove('indicator_active');
        if (m_index < pic_len) {
            m_index = m_index < 0 ? pic_len - 1 : m_index;
            indicators.children[m_index].classList.add('indicator_active');
        } else {
            indicators.children[0].classList.add('indicator_active');
        }
    }
    // 图片和指示符的对应
    const moveDis = () => {
        index++;
        picMove(index);
        indiShow(index);
    }
    let timer = setInterval(moveDis, 2000); // 自动轮播
    // 无缝滚动
    pics.addEventListener('transitionend', () => {
        if(index >= pic_len) {
            index = 0;
        } else if (index < 0) {
            index = pic_len - 1;
        }
        picMove(index, 0);
    })
    // 手指滑动轮播图
    // 触摸元素touchstart：获取手指初始坐标
    let startX = 0;
    let moveX = 0;
    let isMove = false;
    pics.addEventListener('touchstart', (e) => {
        startX = e.targetTouches[0].pageX;
        clearInterval(timer);
        // if (index >= pic_len || index <= -1) {
        //     pics.removeEventListener('touchmove', touchMove);
        // }
        // pics.addEventListener('touchmove', touchMove);
    })
    // 手指移动图片
    const touchMove = (e) => {
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
    }
    pics.addEventListener('touchmove', touchMove);
    // 手指离开，根据移动距离判断回弹上一张或下一张
    pics.addEventListener('touchend', (e) => {
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
        }
        // clearInterval(timer);
        timer = setInterval(moveDis, 2000);
    })
}

// $(function () {
    // pShowHide();
    // pSlide();
    // mComment();
    // toDo();
// })
function pShowHide() {
    let ind = 0;
    $('.pinf span').click(function () {
        ind = $(this).index();
        $('.pinf img').eq(ind).show().siblings().hide();
        // $('.pinf img').eq(ind).siblings().hide();
        console.log(ind);
    })
}

function pSlide() {
    $('.pinf span').hover(function () {
        let ind = $(this).index();
        $('.pinf img').eq(ind).stop().show();
        $('.pinf img').eq(ind).siblings().stop().hide();
    })
}

function mComment() {
    $('.pub').on('click', function () {
        let cont = $('#m_textarea').val();
        let p = $('<p></p>');
        let onecont = $('<div><span>删除</span></div>').addClass('one_cont');
        if (!cont) return false;
        p.html(cont);
        onecont.prepend(p);
        $('.com_cont').prepend(onecont);
        $('#m_textarea').val('');
    })
    $(".com_cont").on("click", "span", function() {
        console.log(11);
        $(this).parent().slideUp(function() {
            $(this).remove();
        });
    })
}

const toDo = () => {
    let dowhat = document.getElementsByClassName('dowhat')[0]; // 键入的表单元素
    let m_doing = document.querySelector('.m_doing'); // 建立的任务 元素
    let m_done = document.querySelector('.m_done');
    // 按下回车键后所要执行的任务
    const showTask = (e) => {
        if (e.key === 'Enter' && e.keyCode === 13) {
            let localdata = getLocalData();
            let typedata = getTypeData(dowhat);
            if (!typedata) {
                return false;
            }
            localdata.push({title:typedata, done: false})
            saveData(localdata);
            loadData();
            dowhat.value = '';
        }
    }
    dowhat.addEventListener('keydown', showTask);
    const manageTask = (e) => {
        // let m_rem = document.querySelector('.m_rem');
        let data = getLocalData();
        let what = null;
        // 找到父级并加以判断
        const findWhat = (cname) => {
            // let span = e.target;
            what = what != null ? what:e.target.parentNode;
            if (what.classList.contains(cname)) {
                let index = what.getAttribute('id');
                return index;
            } else {
                findWhat(toString(what.className));
            }
        }
        // 删除任务
        if (e.target.classList.contains('m_rem')) {
            let index = findWhat('what');
            data.splice(index, 1);
            saveData(data);
            loadData();
        }
        // 选中完成的任务并添加到已完成列表
        if (e.target.classList.contains('don')) {
            let index = findWhat('what');
            // console.log(e.target.checked);
            data[index].done = e.target.checked;
            saveData(data);
            loadData();
        }
    }
    m_doing.addEventListener('click', manageTask);
    m_done.addEventListener('click', manageTask);

    // 获取表单中的创建的任务内容
    const getTypeData = (ele) => {
        let val = ele.value;
        if (val && val != '\s\t') return val;
    }
    // 获取本地存储和用户新添加的数据
    const getLocalData = () => {
        let data = localStorage.getItem('todolist');
        // let data = localStorage.getData;
        if (data != null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    // 本地存储数据
    const saveData = (data) => {
        let m_data = JSON.stringify(data);
        localStorage.setItem('todolist', m_data);
    }   
    const loadData = () => {
        // let m_localdata = localdata;
        m_doing.innerHTML = '';
        m_done.innerHTML = '';
        let m_localdata = getLocalData();
        // 判断空数组 []
        if (Array.prototype.isPrototypeOf(m_localdata) && m_localdata.length === 0) {
            m_doing.style.display = 'none';
            m_done.style.display = 'none';
            return false;
        } else {
            m_doing.style.display = 'block';
            m_done.style.display = 'block';
        }
        let check = '';
        m_localdata.forEach((val, i) => {
            if (val.done == true) {
                check = 'checked';
            }
            let m_html = `<div class="what" id='${i}'>
            <input type="checkbox" ${check} class="don">
            <p class="thing">${val.title}</p>
            <span class="icon-close-solid m_rem"></span>
            </div>`;
            let frag = document.createRange().createContextualFragment(m_html);
            if (val.done == false) {
                m_doing.appendChild(frag);
            } else {
                m_done.appendChild(frag);
            }
        });
    }
    loadData();
}

