import { Link } from 'react-router-dom';
import Form from '../Search-Bar/Form';
import './NavLinks.css'


const NavLinks = () => {
    return ( 
            <nav className="nav__bottom__container">
                <div className="bottom__container">
                    <div className="form__container">
                        <Form />
                    </div>
                </div>
            </nav>
     );
}
 
export default NavLinks;