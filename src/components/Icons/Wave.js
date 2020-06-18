import React from 'react';

const Wave = ({
                  style = {},
                  fill = '#1A1A1A',
                  width = '100%',
                  className = 'wave_svg',
                  height = '100%',
                  viewBox = '0 0 2500 120',
              }) => (
    <svg
        id="svg-water"
        className={className}
         version="1.1"
         xmlns="http://www.w3.org/2000/svg"
         xmlnsXlink="http://www.w3.org/1999/xlink"
         x="0px" y="0px"
         width="2500px"
         height="120px"
         viewBox={viewBox}
         enableBackground="new 0 0 2500 120"
         xmlSpace="preserve">
        <defs>
            <pattern id="water" width=".25" height="1.1" patternContentUnits="objectBoundingBox">
                <path fill={fill} d="M0.25,1H0c0,0,0-0.659,0-0.916c0.083-0.303,0.158,0.334,0.25,0C0.25,0.327,0.25,1,0.25,1z"/>
            </pattern>
        </defs>

        <rect className="water-fill" mask="url(#text-mask)" fill="url(#water)" x="-400" y="0" width="4000" height="220"/>

    </svg>
);

export default Wave;