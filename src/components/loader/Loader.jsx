import React from 'react';
import loader from '../../../public/loader.gif';
import styles from './loader.module.css';

export default function Loader() {
    return (
        <div className={styles.loader}>
            <img src={loader} />
        </div>
    )
}
