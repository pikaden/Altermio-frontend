import Control from '../Controls/Control';
import DrawerNav from '../DrawerNav/DrawerNav';
import NavBrand from '../Nav-Brand/Navbrand';
import Form from '../Search-Bar/Form';
import { Link } from 'react-router-dom';
import './Container.css'

const Navtop = () => {
    return ( 
            <div className="nav__top__container">
                <div className="top__container">
                    <NavBrand />
                    <nav className="nav__bottom__container">
                        <div className="bottom__container">
                            <ul className="nav">
                                <li className='nav-link'><Link to="/">Home</Link></li> 
                                <li className='nav-link'><Link to="/shop">Shop</Link> </li>
                                <li className='nav-link'><Link to="/contact">Contact</Link></li> 
                                <li className='nav-link'><Link to="/about">About us</Link></li>
                                <li className='nav-link'><Link to="/chats">Chat</Link></li>
                            </ul>
                        </div>
                    </nav>
                    {/* <div className="form__container">
                        <Form />
                    </div> */}
                    <div className="control__bar">
                        <Control />
                    </div>
                    <div className="drawer">
                        <DrawerNav />
                    </div>
                </div>
            </div>
     );
}
 
export default Navtop;