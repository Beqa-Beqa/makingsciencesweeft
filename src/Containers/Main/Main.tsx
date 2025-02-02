import { useContext, useEffect, useState } from 'react';
import { ImageModal, Loader, SearchField } from '../../Components';
import './main.css';
import { requestPhotos } from '../../Utilities/api';
import { generalContext } from '../../Contexts/generalContextProvider';
import Masonry from 'react-masonry-css';

const Main = () => {
    const [page, setPage] = useState<number>(1);
    const [images, setImages] = useState<IResponseImage[]>([]);
    const [isFetching, setIsFetching] = useState<boolean>(false);

    const { loadScheduled, setLoadScheduled } = useContext(generalContext);

    useEffect(() => {
        if (!loadScheduled || isFetching) return; 
        setPage(prev => prev + 1);
    }, [loadScheduled]);

    useEffect(() => {
        if (isFetching) return;

        setIsFetching(true);

        const fetchData = async () => {
            const perPage = 20;
            const data = await requestPhotos(page, perPage);
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

    // useEffect(() => console.log(page), [page]);

    const [searchValue, setSearchValue] = useState<string>('');
    const [imageInView, setImageInView] = useState<IResponseImage | null>(null);

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