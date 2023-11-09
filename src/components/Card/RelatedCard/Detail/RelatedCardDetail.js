import { Link } from "react-router-dom"

const RelatedCardDetail = (props) => {
    return (
        <div className="related__product__card__detail">
            <div className="related__product__name">
                {/* <Link to={`/item/${props.item.category}/${props.item._id}`}> */}
                <Link to={`/item/${props.item.id}`}>
                    {props.item.name}
                </Link>
            </div>
            <div className="related__product__description">
                {/* <span>{props.item.description}</span> */}
            </div>
            <div className="related__product__price">
                <span>${props.item.price}</span>
            </div>
        </div>
    )
}

export default RelatedCardDetail;