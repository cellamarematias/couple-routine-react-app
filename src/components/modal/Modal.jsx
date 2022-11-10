import React from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, children, title, close }) => {
    return (
        <div className={styles.modalCenter}>
            <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>{title}</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
                        <RiCloseLine />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;