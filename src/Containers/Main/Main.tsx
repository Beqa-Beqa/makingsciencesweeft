import { useEffect, useState } from 'react';
import { SearchField } from '../../Components';
import './main.css';
import { requestPhotos } from '../../Utilities/api';
import { splitArray } from '../../Utilities/general';

const Main = () => {
    const [images, setImages] = useState<IResponseImage[]>([]);
    const imagesSplitToThree = splitArray(images, 3);

    useEffect(() => {
        const fetchData = async () => {
            const page = 1;
            const perPage = 20;

            const data = await requestPhotos(page, perPage);
            setImages(data);
        }

        fetchData();
    }, []);

    const [searchValue, setSearchValue] = useState<string>('');

    return (
        <div className='main-section'>
            <div style={{maxWidth: 400}}>
                <SearchField
                    placeHolder='Search images...'
                    value={searchValue} 
                    setValue={setSearchValue} 
                />
            </div>

            <div className='images-container'>
                {
                    imagesSplitToThree.map((images: IResponseImage[], index) => {
                        return <div key={index} className='subcontainer'>
                            {
                                images.map((image) => {
                                    return <img
                                        key={image.id}
                                        className='image' 
                                        src={image.urls.regular} 
                                        alt={image.alt_description} 
                                    />
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>
    );
}
 
export default Main;