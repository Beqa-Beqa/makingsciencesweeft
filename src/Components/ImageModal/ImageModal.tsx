import { useEffect, useState } from 'react';
import './imageModal.css';
import { requestPhotoById } from '../../Utilities/api';
import { IoMdClose } from "react-icons/io";

const ImageModal = (props: {
    imageData: IResponseImage,
    closeImageAction: () => void
}) => {
    const [imageStatistics, setImageStatistics] = useState<IImageStatistics | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const statistics: IImageStatistics | null = await requestPhotoById(props.imageData.id);
            setImageStatistics(statistics);
        }

        fetchData();
    }, []);

    const redirectToAuthorPage = () => {
        const a = document.createElement('a');
        a.href = `https://unsplash.com/@${props.imageData.user.username}`;
        a.target = '_blank';
        a.click();
    }

    return (
        <div onClick={props.closeImageAction} className='modal-image-container'>
            <IoMdClose id='close-button' />

            <div onClick={(e) => e.stopPropagation()} className='inner-modal'>
                <div onClick={redirectToAuthorPage} className='author-info-container'>
                    <img 
                        className='author-image' 
                        src={props.imageData.user.profile_image.small}
                        alt="author" 
                    />
                    <div className='author-info'>
                        <span style={{marginBottom: '.15rem'}}>
                            <strong>{props.imageData.user.first_name} {props.imageData.user.last_name}</strong>
                        </span>
                        {
                            props.imageData.user.for_hire ? 
                            <span style={{fontSize: 12.5, color: 'var(--accent-color)'}}>
                                Available for hire
                            </span>
                            : null
                        }
                    </div>
                </div>
                <div className='image-full-container'>
                    <img
                        className='image-full'
                        src={props.imageData.urls.regular}
                        alt={props.imageData.alt_description} 
                    />
                </div>
                <div className='image-details-container'>
                    <div className='image-detail-info'>
                        <span>Views</span>
                        <span>
                            <strong>
                                {
                                    imageStatistics ?
                                        imageStatistics.views.total
                                    : '--' 
                                }
                            </strong>
                        </span>
                    </div>
                    <div className='image-detail-info'>
                        <span>Downloads</span>
                        <span>
                            <strong>
                                {
                                    imageStatistics ?
                                        imageStatistics.downloads.total
                                    : '--'
                                }
                            </strong>
                        </span>
                    </div>
                    <div className='image-detail-info'>
                        <span>Likes</span>
                        <span>
                            <strong>
                                {
                                    imageStatistics ?
                                        imageStatistics.likes.total
                                    : '--'
                                }
                            </strong>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ImageModal;