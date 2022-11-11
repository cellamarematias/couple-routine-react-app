import React from "react";
import styles from "./modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, setShow, children, title, close, className }) => {
    return (
        <div className={className}>
            <div className={styles.darkBG} onClick={() => {
                setShow(false)
                setIsOpen(false)
            }} />
            <div className={styles.centered}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h5 className={styles.heading}>{title}</h5>
                    </div>
                    <button className={styles.closeBtn} onClick={() => {
                        setShow(false)
                        setIsOpen(false)
                    }}>
                        <RiCloseLine />
                    </button>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;