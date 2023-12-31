import { Link } from 'react-router-dom';
import ItemCarousel from './Carousel/ItemCarousel';
import Description from './Description/Description';
import Detail from './Detail/Detail';
import './Item.css';
import Related from './Related/Related';
import { Button } from '@mui/material';
import ShopPage from './ShopPage/ShopPage';

const Item = (props) => {
    return (
        <div className="item__container">
            <div className="detail__and__carousel__container">
                <ItemCarousel item={props.item} images={props.item.images} />
                <Detail item={props.item} />
            </div>
            <div className="item__description__container">
                <Description item={props.item} />
            </div>
            <div className="item__description__container">
                <ShopPage item={props.item} />
            </div>
            <div className="related__items__container">
                <Related item={props.item} />
            </div>
            <div className="show__more__action">
                <Link to={{
                    pathname: `/category/${props.item.category}`,
                    search: '?page=2&limit=10'
                }}>
                    <Button variant='outlined' sx={[{ width: '200px', height: '50px', borderRadius: '20px', fontWeight: '700', backgroundColor: '#FFE26E', borderColor: '#FFE26E', color: 'black' }, { '&:hover': { borderColor: '#FFE26E', backgroundColor: "none" } }]}>Show more</Button>
                </Link>
            </div>

        </div>
    );
}

export default Item;