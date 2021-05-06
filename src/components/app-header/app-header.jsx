import React from 'react';
import {Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <header className="mb-2">
      <nav className="pt-4 pb-4 bg-light">
        <div className="container d-flex flex-wrap">
          <ul className={styles.nav}>
            <li>
              <a href="#/" className={`${styles.link} text_type_main-default pl-6 pr-6 pb-4 pt-4`}>
              <BurgerIcon />
                Конструктор
              </a>
            </li>
            <li>
              <a href="#/" className={`${styles.link} text_type_main-default pl-6 pr-6 pb-4 pt-4`}>
                <ListIcon />
                Лента заказов
              </a>
            </li>
          </ul>
          <a className={`${styles.brand} d-flex`} href="/"><Logo /></a>
          <ul className={`${styles.nav} d-flex`}>
            <li>
                <a href="#/" className={`${styles.link} text_type_main-default pl-6 pr-6 pb-4 pt-4`}>
                  <ProfileIcon />
                  Личный кабинет
                </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default AppHeader;