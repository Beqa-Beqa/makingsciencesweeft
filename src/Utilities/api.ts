const baseApiUrl = 'https://api.unsplash.com/';
const accessKey = 'I0cliNgQP6YFsafZeQlhDkXREFoKeGd376Y1HSpM3Pg';
// const secretKey = 'eobP_Y3nDabuBCf8S2ngPQlh8icMbOtI3Smf1MlbRqw'

const baseHeaders = {
    'Content-Type': 'application/json',
    'Accept-Version': 'v1',
    'Authorization': `Client-ID ${accessKey}`
}

export const requestPhotos = async (page: number, perPage: number) => {
    const url = `${baseApiUrl}/photos?page=${page}&per_page=${perPage}`;

    const result = await fetch(url, {
        method: 'GET',
        headers: baseHeaders,
    });

    const data: IResponseImage[] = await result.json();
    return data;
}