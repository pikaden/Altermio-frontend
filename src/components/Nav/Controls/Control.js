import './Control.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SellIcon from '@mui/icons-material/Sell';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Badge from '@mui/material/Badge';
import { Link } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import { useContext } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import  Button  from '@mui/material/Button';
import FadeMenu from './FadeMenu';
import NotificationMenu from './NotificationMenu';
import PostProductHeader from './PostProductHeader';

const Control = () => {
    const wishItems = useContext(WishItemsContext)

    return ( 
        <div className="control__bar__container">
            <div className="controls__container">
                <div className="control">
                    <FadeMenu />
                </div>
                {/* <div className="control">
                    <NotificationMenu />
                </div> */}
                {/* <div className="control">
                    <Link to="/wishlist">
                        <Badge badgeContent={wishItems.items.length} color="error">
                            <FavoriteBorderIcon color="black" sx={{ width: '35px'}}/>
                        </Badge>
                    </Link>
                </div> */}
                <div className="control">
                    <Cart />
                </div>
                <div className="control">
                    <PostProductHeader />
                </div>
                
            </div>
        </div>
     );
}
 
export default Control;