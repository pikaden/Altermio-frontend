import axios from "axios";
import { useEffect, useState } from "react";
import {
    Magnifier
} from "@vanyapr/react-image-magnifiers";
import ReactLoading from 'react-loading';

const ProductCarouselImage = (props) => {
    const [imageUrl, setImageUrl] = useState();

    const fetchImage = async () => {
        await axios.get(`http://localhost:3000/v1/images/${props.image}`)
            .then(res => {
                const imageRes = res.data.image.url;
                setImageUrl(imageRes);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchImage();
    }, [])

    return (
        imageUrl ?
            <div className="carousel__image__container">
                <Magnifier
                    className="carousel_image"
                    key={props.image}
                    imageSrc={imageUrl}
                    alt="item"
                />
            </div>
            :
            <ReactLoading type="balls" color='#FFE26E' height={100} width={100} className='m-auto' />
    )
}

export default ProductCarouselImage;