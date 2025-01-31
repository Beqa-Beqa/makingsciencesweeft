export const splitArray = (arr: Array<any>, countToSplitTo: number) => {
    const elementCount = Math.ceil(arr.length / countToSplitTo);
    const newArray = [];

    for (let i = 0; i < countToSplitTo; i++) {
        let subArray = undefined;
        
        if (i === countToSplitTo - 1) {
            subArray = arr.slice(i * elementCount);
        } else {
            subArray = arr.slice(i * elementCount, (i + 1) * elementCount) ;
        }
        
        newArray.push(subArray);
    }

    return newArray;
}