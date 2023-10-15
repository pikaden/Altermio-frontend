import axios from "axios";
import { useEffect, useState } from "react";

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
        <div className="carousel__image__container">
            <img className="carousel__image" key={props.image} src={imageUrl} alt="item" />
        </div>
    )
}

export default ProductCarouselImage;