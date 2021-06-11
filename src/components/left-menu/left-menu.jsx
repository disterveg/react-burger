import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './left-menu.module.css';

const LeftMenu = () => {
  const activeStyle = {color: "#fff"};
  return (
    <div className={styles.leftmenu}>
      <ul className={`${styles.items} pb-8`}>
        <li>
          <NavLink 
            to='/profile' 
            className={`${styles.link} text_type_main-medium pl-6 pr-6 pb-4 pt-4`} 
            activeStyle={activeStyle}
            exact={true} 
          >
            Профиль
          </NavLink>
        </li>
        <li>
          <NavLink 
            to='/profile/orders' 
            className={`${styles.link} text_type_main-medium pl-6 pr-6 pb-4 pt-4`} 
            activeStyle={activeStyle}
            exact={true} 
          >
            История заказов
          </NavLink>
        </li>
        <li>
          <NavLink 
            to='/f' 
            className={`${styles.link} text_type_main-medium pl-6 pr-6 pb-4 pt-4`} 
            activeStyle={activeStyle}
            exact={true} 
          >
            Выход
          </NavLink>
        </li>
      </ul>
      <p className="text_type_main-default left text_color_inactive pl-6 pt-10">
        В этом разделе вы можете изменить свои персональные данные
      </p>  
    </div>
  );
}

export default LeftMenu;