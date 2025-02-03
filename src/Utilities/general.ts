export const throttle = (func: Function, delay: number) => {
    let lastCall = 0;

    return function(...args: Array<any>) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
}