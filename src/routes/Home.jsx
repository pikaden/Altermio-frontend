import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FeaturedItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";


const Home = () => {
    const [featuredItems, setFeaturedItems] = useState();
    const [featuredCategories, setFeaturedCategories] = useState([]);

    TabTitle("Home - Altermio");

    const fetchProductLists = async () => {
        await axios.get("http://localhost:3000/v1/productLists")
            .then(res => setFeaturedCategories(res.data))
            .catch(err => console.log(err))
    }

    const fetchProduct = async () => {
        await axios.get("http://localhost:3000/v1/products")
            .then(res => setFeaturedItems(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchProductLists();
        fetchProduct();
        window.scrollTo(0, 0)
    }, [])

    return (
        <Fragment>
            <Landing />
            <FeaturedCategories items={featuredCategories.slice(0, 3)} />
            <FeaturedItems items={featuredItems} />
        </Fragment>
    );
}

export default Home;