import React from 'react';
import './ScrollLine.scss';

const ScrollLine = (props) => {

    return (
        <div className="scroll" id="scroll-bar">
            <div className="scroll-line">
                <div id="scroll" className="scroll-line_active">
                </div>
            </div>
            <span className="scroll-text">SCROLL</span>
        </div>
    );
}

export default ScrollLine;