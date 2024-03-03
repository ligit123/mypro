import { horMoveAnimation } from "./hor_move_animation.js";
window.addEventListener('DOMContentLoaded', function() {
    let test = document.getElementsByClassName('test')[0];
    let aaa = document.getElementById('aaa');
    let hhh = document.getElementById('hhh');
    aaa.addEventListener('click', () => {
        horMoveAnimation(test, 600);
    })
    hhh.addEventListener('click', () => {
        horMoveAnimation(test, 800);
    })
});