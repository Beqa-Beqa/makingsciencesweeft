import { SEARCHED_VALUES_LOCATION, IMAGES_LOCATION } from "./constants";

export const getSearchValuesFromCache = () => {
    return JSON.parse(window.localStorage.getItem(SEARCHED_VALUES_LOCATION) || '[]') as string[];
}

export const pushSearchValueInCache = (value: string) => {
    const currentValues: string[] = JSON.parse(window.localStorage.getItem(SEARCHED_VALUES_LOCATION) || '[]');
    const l_value = value.toLowerCase();

    if (!currentValues.includes(l_value)) {
        const newValues = JSON.stringify([...currentValues, l_value]);
        window.localStorage.setItem(SEARCHED_VALUES_LOCATION, newValues);
    }
}

// export const getImagesFromCache = (searchValue: string) => {
//     const cachedSearches: IImagesCacheStorage = JSON.parse(window.localStorage.getItem(IMAGES_LOCATION) || '{}');
//     return cachedSearches[searchValue] ? cachedSearches[searchValue] : [];
// }

// export const setImagesInCache = (searchValue: string, page: number, values: IResponseImage[]) => {
//     const cachedSearches: IImagesCacheStorage = JSON.parse(window.localStorage.getItem(IMAGES_LOCATION) || '{}');
//     let searchValueImages = cachedSearches[searchValue];

//     if (!searchValueImages) searchValueImages = [];

//     searchValueImages.push({
//         page, 
//         data: values
//     });

//     const updatedImagesCache = JSON.stringify({
//         ...cachedSearches,
//         [searchValue]: searchValueImages
//     });

//     window.localStorage.setItem(IMAGES_LOCATION, updatedImagesCache);
// }

// export const deleteImagesChunkInCache = (searchValue: string) => {
//     const cachedSearches: IImagesCacheStorage = JSON.parse(window.localStorage.getItem(IMAGES_LOCATION) || '{}');
//     const searchValueImages = cachedSearches[searchValue];

//     if (searchValueImages) searchValueImages.splice(0, 1);

//     const updatedImagesCache = JSON.stringify({
//         ...cachedSearches,
//         [searchValue]: searchValueImages
//     });

//     window.localStorage.setItem(IMAGES_LOCATION, updatedImagesCache);
// };