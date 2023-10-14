import axios from "axios";
import { useState, useEffect } from "react";

const RelatedCardImage = (props) => {
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
        <div className="related__product__image">
            {/* <img src={`https://shema-backend.vercel.app/public/${props.item.category}/${props.item.image[0].filename}`} alt="item" className="product__img" /> */}
            <img className="carousel__image" key={props.image} src={imageUrl} alt="item" />
        </div>
    )
}

export default RelatedCardImage;