import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

export default function Navbar(user) {
  if (!user.user) {
    return <></>;
  }
  return (
    <div className={styles.bottom}>
        <ul className={styles.navbar}>
            <li>
                <NavLink className={({isActive}) => (isActive ? styles.active : "") } end to="/tasks">Tareas</NavLink>     
            </li>
            <li>
                <NavLink className={({isActive}) => (isActive ? styles.active : "") } to="/expenses">Gastos</NavLink>
            </li>
            <li>
                <NavLink className={({isActive}) => (isActive ? styles.active : "") } to="/savings">Ahorros</NavLink>
            </li>
        </ul>
    </div>
  )
};
