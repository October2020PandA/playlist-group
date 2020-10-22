import React from 'react';
import styles from '../modules/Header.module.css';

const Header = () => {
    return(
        <div className={`container-fluid`}>
            <h1 className={`d-flex justify-content-left pt-5 pb-1 ml-5 ${styles.em}`}>Playlistr</h1>
        </div>
    );
};

export default Header;