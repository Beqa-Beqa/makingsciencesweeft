import { SEARCHED_VALUES_LOCATION, SEARCHED_IMAGES_LOCATION } from "./constants";

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

export const getImagesFromCache = (searchValue: string) => {
    const cachedSearches: Record<string, IResponseImage[]> = JSON.parse(window.localStorage.getItem(SEARCHED_IMAGES_LOCATION) || '{}');
    return cachedSearches[searchValue] ? cachedSearches[searchValue] : [];
}

export const setImagesInCache = (searchValue: string, values: IResponseImage[]) => {
    const cachedSearches: Record<string, IResponseImage[]> = JSON.parse(window.localStorage.getItem(SEARCHED_IMAGES_LOCATION) || '{}');
    let newValues: IResponseImage[] = [];

    if (cachedSearches[searchValue]) newValues = newValues.concat(cachedSearches[searchValue]);
    newValues = newValues.concat(values);

    const updatedImagesCache = JSON.stringify({
        ...cachedSearches,
        [searchValue]: newValues
    });

    window.localStorage.setItem(SEARCHED_IMAGES_LOCATION, updatedImagesCache);
}