// window.onload=function(){
//     Pfocus();
// }
// window.addEventListener('load', Pfocus);
window.addEventListener('DOMContentLoaded', Pfocus);

function Pfocus() {
    document.addEventListener("keyup", press_s); // 按键抬起时的事件监听
    function press_s(e) {
        let search = document.getElementsByClassName("main_search")[0];
        if (e.keyCode == 115 || e.keyCode == 83) {
            search.focus();
        }
    }
}