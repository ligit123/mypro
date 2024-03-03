// 获取元素的封装函数 ele为元素，mode为获取元素的方式，p_ele是否是父元素获取（非document元素）
const getEle= (ele, mode = 0, p_ele = null) => {
    if (!ele) return false;
    let eleDom = null;
    p_ele = p_ele == null ? document.documentElement : p_ele;
    if (mode == 0) {
        eleDom = p_ele.getElementsByClassName(ele)[0];
    } else if (mode == 1) {
        eleDom = p_ele.getElementsByTagName(ele)[0];
    } else if (mode == 2) {
        eleDom = p_ele.getElementById(ele);
    }
    return eleDom;
}
export { getEle };