import { useEffect, useState, useContext } from 'react';
import { generalContext } from '../../Contexts/generalContextProvider';
import { getSearchValuesFromCache } from '../../Utilities/storage';
import { DEFAULT_PAGE, DATA_AMOUNT_PER_PAGE, SUBSEQUENT_SCROLL_OFFSET, PAGE_THRESHOLD, INITIAL_SCROLL_OFFSET } from '../../Utilities/constants';
import { requestPhotosBySearch } from '../../Utilities/api';
import { ImageModal, Loader } from '../../Components';
import Masonry from 'react-masonry-css';
import './historyPage.css';

const HistoryPage = () => {
    const previousSearchs = getSearchValuesFromCache();

    const [page, setPage] = useState<number>(DEFAULT_PAGE);
    const [search, setSearch] = useState<string>('');
    const [images, setImages] = useState<IResponseImage[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const [imageInView, setImageInView] = useState<IResponseImage | null>(null);

    const { loadScheduled, setLoadScheduled, scrollOffsetRef } = useContext(generalContext);
    
    useEffect(() => {
        if (scrollOffsetRef) scrollOffsetRef.current = INITIAL_SCROLL_OFFSET;
    }, []);

    useEffect(() => {
        if (!loadScheduled || isFetching) return; 
        setPage(prev => prev + 1);
    }, [loadScheduled]);

    const handleSearch = async () => {
        setIsFetching(true);
        setPage(DEFAULT_PAGE);

        const data = await requestPhotosBySearch(DEFAULT_PAGE, DATA_AMOUNT_PER_PAGE, search);

        setImages(data);
        setIsFetching(false);
    };

    useEffect(() => {
        if (search.trim()) handleSearch();
    }, [search]);

    useEffect(() => {
        if (page >= PAGE_THRESHOLD && scrollOffsetRef && scrollOffsetRef.current !== SUBSEQUENT_SCROLL_OFFSET) scrollOffsetRef.current = SUBSEQUENT_SCROLL_OFFSET;

        if (isFetching) return;

        setIsFetching(true);

        const fetchData = async () => {
            const data = await requestPhotosBySearch(page, DATA_AMOUNT_PER_PAGE, search);

            setImages(prev => {
                const newImages = [...prev, ...data];
                return Array.from(new Map(newImages.map(img => [img.id, img])).values());
            });

            // Reset load scheduler
            setLoadScheduled(false);
            setIsFetching(false);
        }

        search && fetchData();
    }, [page]);

    const masonryBreakpoints = {
        default: 3,
        1100: 2,
        700: 1
    }

    if (!previousSearchs.length) {
        return (
            <div className='empty-search-container'>
                <h2 id='empty-search-text'>You don't have any searches!</h2>
            </div>
        );
    }

    return (
        <>
            <div className='history-section'>
                <h2 style={{color: 'var(--dark-lighter)', fontWeight: 500}}>Repeat the search</h2>
                <div className='history-section-buttons-container'>
                    {
                        previousSearchs.map((searchValue) => {
                            return (
                                <button
                                    className={`history-search-button ${search === searchValue && 'active'}`}
                                    key={searchValue}
                                    onClick={() => search !== searchValue && setSearch(searchValue)}
                                >
                                    {searchValue}
                                </button>
                            );
                        })
                    }
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

                {search ? <Loader /> : null}
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
 
export default HistoryPage;