import './Footer.css'
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer>
            <div className="footer__container">
                <div className="footer__items__container">
                    <div className="footer__help__container">
                        <div className="footer__help__header">
                            <h1>Page</h1>
                        </div>
                        <ul className="fotter__help__links">
                            <li className="help__link">
                                <Link to="/"> Home</Link>
                            </li>
                            <li className="help__link">
                                <Link to="/shop">Shop</Link>
                            </li>
                            <li className="help__link">
                                <Link to="/contact">Contact</Link>
                            </li>
                            <li className="help__link">
                                <Link to="/about">About us</Link>
                            </li>
                        </ul>
                    </div>
                    {/* <div className="footer__help__container">
                        <div className="footer__help__header">
                            <h1>Categories</h1>
                        </div>
                        <ul className="fotter__help__links">
                            <li className="help__link">
                                <a href="/">Category 1</a>
                            </li>
                            <li className="help__link">
                                <a href="/">Category 2</a>
                            </li>
                            <li className="help__link">
                                <a href="/">Category 3</a>
                            </li>
                            <li className="help__link">
                                <a href="/">Category 4</a>
                            </li>
                            <li className="help__link">
                                <a href="/">Category 5</a>
                            </li>
                        </ul>
                    </div> */}
                    <div className="footer__contact__container">
                        <div className="footer__contact__header">
                            <h1>Contact Us</h1>
                        </div>
                        <ul className="footer__contacts">
                            <li className="footer__contact">
                                <LocalPhoneIcon /> <span>+123 4567 890</span>
                            </li>
                            <li className="footer__contact">
                                <EmailIcon />
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=altermio2023@gmail.com" target="_blank">altermio2023@gmail.com</a>
                            </li>
                            <li className="footer__contact">
                                <LocationOnIcon /> <span>Viet Nam</span>
                            </li>
                        </ul>
                    </div>
                    <div className="footer__social__link__container">
                        <div className="footer__social__link__header">
                            <h1>Stay Connected</h1>
                        </div>
                        <ul className="footer__social__links">
                            <li className="social__link">
                                <TwitterIcon />
                            </li>
                            <li className="social__link">
                                <InstagramIcon />
                            </li>
                            <li className="social__link">
                                <YouTubeIcon />
                            </li>
                            <li className="social__link">
                                <TelegramIcon />
                            </li>
                            <li className="social__link">
                                <PinterestIcon />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="fotter__copyright__container">
                    <ul className='nav'>
                        <li className="footer__copyright">©2023 Altermio Ltd. |</li>
                        <li className="footer__terms__condition"> | Terms & Condition |</li>
                        <li className="footer__privacy__policy">| Privacy Policy</li>
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;