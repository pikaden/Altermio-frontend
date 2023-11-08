import { useState, useEffect } from 'react';
import './Description.css';
import axios from 'axios';

const Description = (props) => {
    const [categoryName, setCategoryName] = useState();

    const fetchCategory = async () => {
        // get category by id and return name
        await axios.get(`http://localhost:3000/v1/productLists/manage/${props.item.category}`)
            .then(res => {
                const category = res.data;
                setCategoryName(category.results.categoryName);
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchCategory();
    }, [categoryName])

    return (
        <div className="product__description__product">
            <div className="description__header__container">
                <div className="description__header__line"></div>
                <div className="description__header">Details</div>
            </div>
            <div className="description__detail__container">
                <div className="description__detail">
                    {/* <p>{props.item.description}</p> */}
                </div>
            </div>
            <div className="description__specifics__container">
                <div className="description__specifics">
                    <div className="description__header__line"></div>
                    <div className="description__highlights__header">Highlights</div>
                    <ul>
                        <li> State: {props.item.state} </li>
                        <li> Brand: {props.item.brand} </li>
                        <li> Category: {categoryName} </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Description;