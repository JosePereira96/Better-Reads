import React, { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp} from '@fortawesome/free-solid-svg-icons';

//import './index.css';

const ScrollToTop = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
    
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };



    return (
        <div className="top-to-btm">
            <FontAwesomeIcon icon={faArrowUp} onClick={goToTop} />
        </div>
    );
};



export default ScrollToTop;