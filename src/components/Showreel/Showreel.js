import React, {useContext} from 'react';
import LanguageContext from "../../contexts/LanguageContext";
import './Showreel.scss';

const Showreel = (props) => {
    const {lang} = useContext(LanguageContext);
    const hiddenClass = 'hidden';
    let isHidden = true;

    const toggleShowreel = () => {
        const showreelContainer = document.getElementById('showreel');
        showreelContainer.classList.toggle(hiddenClass);
    }

    return (
        <>
            <button type='button' id='showreel-btn' onClick={() => toggleShowreel()} className='btn-square showreel-btn'>SHOWREEL</button>
            <div id='showreel' className='showreel hidden' onClick={() => toggleShowreel()}>
                <div className="close-container">
                    <div>
                        <div className="leftright"></div>
                        <div className="rightleft"></div>
                    </div>
                </div>
                <iframe
                    id='showreel-video'
                    title='showreel'
                    className="is-hosted is-landscape is-resizable showreel-video"
                    src="https://youtube.com/embed/0Gk2Q3y62-M?autoplay=1"
                    data-video-popup-url="https://youtube.com/embed/0Gk2Q3y62-M?autoplay=1"
                    frameBorder="0" webkitallowfullscreen="true" mozallowfullscreen="true" allowFullScreen={true}
                    allow="autoplay" >
                </iframe>
            </div>
        </>
    );
};

export default Showreel;