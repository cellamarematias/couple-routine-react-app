import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function Navbar(user) {
  console.log(user.user)
  if (!user.user) {
    return <></>;
  }
  return (
    <div>
        <ul>
            <li>
                <NavLink className={({isActive}) => (isActive ? "active" : "") } end to="/tasks">Tareas</NavLink>     
            </li>
            <li>
                <NavLink className={({isActive}) => (isActive ? "active" : "") } to="/expenses">Gastos</NavLink>
            </li>
            <li>
                <NavLink className={({isActive}) => (isActive ? "active" : "") } to="/savings">Ahorros</NavLink>
            </li>
        </ul>
    </div>
  )
};
