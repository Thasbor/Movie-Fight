// delay on input search on api
const debounce = (func, delay) => {
    let timeoutId;
    return (...arg) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...arg);},
            delay
        )

    };
};