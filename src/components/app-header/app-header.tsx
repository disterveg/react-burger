import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Logo, BurgerIcon, ListIcon, ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className="mb-2">
      <nav className="pt-4 pb-4 bg-light">
        <div className="container d-flex flex-wrap">
          <ul className={styles.nav}>
            <li>
              <NavLink
                to="/"
                className={`${styles.link} text_type_main-default pr-6 pb-4 pt-4`}
                activeClassName={styles.active}
                exact
              >
                <BurgerIcon type={'primary'} />
                Конструктор
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/feed"
                className={`${styles.link} text_type_main-default pl-6 pr-6 pb-4 pt-4`}
                activeClassName={styles.active}
              >
                <ListIcon type={'primary'} />
                Лента заказов
              </NavLink>
            </li>
          </ul>
          <NavLink
            to="/" 
            className={`${styles.brand} d-flex`} 
          >
            <Logo />
          </NavLink>
          <ul className={`${styles.nav} ${styles.end}`}>
            <li>
              <NavLink
                to="/profile"
                className={`${styles.link} text_type_main-default pl-6 pb-4 pt-4`}
                activeClassName={styles.active}
              >
                <ProfileIcon type={'primary'} />
                Личный кабинет
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;
