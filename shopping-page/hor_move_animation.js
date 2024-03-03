
const horMoveAnimation = (eleObj, range, func = null) => {
    clearInterval(eleObj.timer); 
    eleObj.timer = setInterval(() => {
        let eleLeft = eleObj.offsetLeft ;
        let step = (range - eleLeft) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (eleLeft == range) {
            clearInterval( eleObj.timer);
            if (func) {
                func();
            }
        }
        eleObj.style.left = eleLeft + step + 'px';
    }, 15);
}
export { horMoveAnimation };