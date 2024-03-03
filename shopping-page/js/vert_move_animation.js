
const vertMoveAnimation = (eleObj, range, func = null) => {
    console.log(window);
    clearInterval(eleObj.timer); 
    eleObj.timer = setInterval(() => {
        let eleY = eleObj.pageYOffset;
        let step = (range - eleY) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (eleY == range) {
            clearInterval( eleObj.timer);
            // if (func) {
            //     func();
            // }
            func && func();
        }
        eleObj.scrollTo(0, eleY + step);
    }, 15);
}
export { vertMoveAnimation };