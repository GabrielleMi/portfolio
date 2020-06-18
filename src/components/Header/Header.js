import React, {useContext} from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import './Header.scss';
import Logo from "../Icons/Logo";
import LanguageContext from "../../contexts/LanguageContext";

const Header = ({links}) => {
    const {lang} = useContext(LanguageContext);
    const {changeLang} = useContext(LanguageContext);
    const langButtons = document.getElementsByClassName('lang-btn');

    const langClickHandler = (language) => {
        changeLang(language);

        Array.prototype.forEach.call(langButtons, function(btn) {
            btn.classList.toggle('active');
        });
    }

    return (
        <nav className="main-nav" id="main-nav">
            <div className="container">
                <ul>
                    <li className="main-nav_logo">
                        <Link className="active" smooth
                            to="#home">
                            <Logo width="50%" height="50%" />
                        </Link>
                    </li>
                    <li className="main-nav_links">
                        <ul>
                            {links.map((link, i) => (
                                <li key={i}>
                                    <Link smooth to={link.url}>{link?.name[lang]}</Link>
                                </li>
                            ))}
                        </ul>
                    </li>
                    <li className="main-nav_lang">
                        <ul>
                            <li className="lang-btn btn active" onClick={() => langClickHandler('fr')}><span className="btn-dash"></span> FR</li>
                            <li className="lang-btn btn" onClick={() => langClickHandler('en')}><span className="btn-dash"></span> EN</li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Header;