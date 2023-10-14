import './Description.css';

const Description = (props) => {
    return (
        <div className="product__description__product">
            <div className="description__header__container">
                <div className="description__header__line"></div>
                <div className="description__header">Details</div>
            </div>
            <div className="description__detail__container">
                <div className="description__detail">
                    <p>{props.item.description}</p>
                </div>
            </div>
            <div className="description__specifics__container">
                <div className="description__specifics">
                    <div className="description__header__line"></div>
                    <div className="description__highlights__header">Highlights</div>
                    <ul>
                        <li> State: {props.item.state} </li>
                        <li> Brand: {props.item.brand} </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Description;