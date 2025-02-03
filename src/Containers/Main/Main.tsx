import { useContext, useEffect, useState } from 'react';
import { ImageModal, Loader, SearchField } from '../../Components';
import './main.css';
import { requestPhotos, requestPhotosBySearch } from '../../Utilities/api';
import { generalContext } from '../../Contexts/generalContextProvider';
import Masonry from 'react-masonry-css';
import { DATA_AMOUNT_PER_PAGE, DEFAULT_PAGE, INITIAL_SCROLL_OFFSET, PAGE_THRESHOLD, SEARCH_INTERVAL, SUBSEQUENT_SCROLL_OFFSET } from '../../Utilities/constants';
import { pushSearchValueInCache } from '../../Utilities/storage';
import _ from 'lodash';

const Main = () => {
    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [images, setImages] = useState<IResponseImage[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [searchValue, setSearchValue] = useState<string>('');

    const { loadScheduled, setLoadScheduled, scrollOffsetRef } = useContext(generalContext);

    useEffect(() => {
        if(scrollOffsetRef) scrollOffsetRef.current = INITIAL_SCROLL_OFFSET
    }, []);

    useEffect(() => {
        if (!loadScheduled || isFetching) return; 
        setPage(prev => prev + 1);
    }, [loadScheduled]);

    useEffect(() => {
        if (page >= PAGE_THRESHOLD && scrollOffsetRef && scrollOffsetRef.current !== SUBSEQUENT_SCROLL_OFFSET) scrollOffsetRef.current = SUBSEQUENT_SCROLL_OFFSET;

        if (isFetching) return;

        setIsFetching(true);

        const fetchData = async () => {
            const data = searchValue.length ? 
                await requestPhotosBySearch(page, DATA_AMOUNT_PER_PAGE, searchValue)
                : await requestPhotos(page, DATA_AMOUNT_PER_PAGE);

            setImages(prev => {
                const newImages = [...prev, ...data];
                return Array.from(new Map(newImages.map(img => [img.id, img])).values());
            });

            // Reset load scheduler
            setLoadScheduled(false);
            setIsFetching(false);
        }

        fetchData();
    }, [page]);

    const [imageInView, setImageInView] = useState<IResponseImage | null>(null);

    const handleSearch = async () => {
        setIsFetching(true);
        setPage(DEFAULT_PAGE);

        let data: IResponseImage[];

        if (searchValue.trim()) {
            data = await requestPhotosBySearch(DEFAULT_PAGE, DATA_AMOUNT_PER_PAGE, searchValue);
            pushSearchValueInCache(searchValue.trim());
        } else {
            data = await requestPhotos(DEFAULT_PAGE, DATA_AMOUNT_PER_PAGE);
        }

        setImages(data);
        setIsFetching(false);
    };

    const debouncedSearch = _.debounce(handleSearch, SEARCH_INTERVAL);

    useEffect(() => {
        debouncedSearch()

        return () => debouncedSearch.cancel();
    }, [searchValue]);

    const masonryBreakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    return (
        <>
            <div className='main-section'>
                <div style={{maxWidth: 400}}>
                    <SearchField
                        placeHolder='Search images...'
                        value={searchValue} 
                        setValue={setSearchValue} 
                    />
                </div>

                <Masonry
                    breakpointCols={masonryBreakpoints}
                    className='masonry-grid'
                    columnClassName='masonry-column'
                >
                    {
                        images.length ?         
                            images.map((image) => {
                                return <img
                                    key={image.id}
                                    onClick={() => setImageInView(image)}
                                    className='image' 
                                    src={image.urls.regular} 
                                    alt={image.alt_description} 
                                />
                            })
                        : null
                    }
                </Masonry>

                <Loader />
            </div>
            {
                imageInView ?
                    <ImageModal
                        closeImageAction={() => setImageInView(null)}
                        imageData={imageInView}
                    />
                : null
            }
        </>
    );
}
 
export default Main;