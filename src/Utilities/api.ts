const baseApiUrl = 'https://api.unsplash.com/';
const accessKey = 'I0cliNgQP6YFsafZeQlhDkXREFoKeGd376Y1HSpM3Pg';

const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept-Version': 'v1',
    'Authorization': `Client-ID ${accessKey}`
}

export const requestPhotos = async (page: number, perPage: number) => {
    try {
        const url = `${baseApiUrl}/photos?page=${page}&per_page=${perPage}`;

        const result = await fetch(url, {
            method: 'GET',
            headers: baseHeaders,
            cache: 'no-cache'
        });

        const data: IResponseImage[] = await result.json();
        return data;
    } catch (err) {
        console.error((err as Error).message);
        return [];
    }
}

export const requestPhotoById = async (id: string) => {
    try {
        const url = `${baseApiUrl}/photos/${id}/statistics?quantity=1`;
        
        const result = await fetch(url, {
            method: 'GET',
            headers: baseHeaders
        });
        
        const data: IImageStatistics = await result.json();
        return data;

    } catch (err) {
        console.error((err as Error).message);
        return null;
    }
}

export const requestPhotosBySearch = async (page: number, perPage: number, search: string) => {
    try {

        const url = `${baseApiUrl}/search/photos?query=${search.trim()}&page=${page}&per_page=${perPage}`;
        
        const result = await fetch(url, {
            method: 'GET',
            headers: baseHeaders,
        });
        
        const data: {
            results: IResponseImage[],
            total: number,
            total_pages: number
        } = await result.json();
        
        return data.results;
    } catch (err) {
        console.error((err as Error).message);
        return [];
    }
}