import React from 'react';
import {
  Input, Button, Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, Link } from 'react-router-dom';
import { setFormValue } from '../../services/actions/reset';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { reset } from '../../services/actions/reset';
import Main from '../main/main';
import styles from '../form.module.css';

export function ResetPasswordPage() {
  const dispatch = useDispatch();
  const password = useSelector((state) => state.reset.form.password);
  const token = useSelector((state) => state.reset.form.token);
  const success = useSelector((state) => state.reset.resetSuccess);

  const onChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(reset({
      password,
      token,
    }));
  };

  if (success) {
    return (
      <Redirect
        to={{
          pathname: '/login',
        }}
      />
    );
  }

  return (
    <Main>
      <div className="container center mt-10 pt-8">
        <Logo />
        <h1 className="text_type_main-medium mt-10 pt-10 mb-6">
          Восстановление пароля
        </h1>
        <form className={styles.form} onSubmit={onFormSubmit}>
          <div className={`${styles.field} mb-5`}>
            <Input placeholder="Введите новый пароль" onChange={onChange} value={password} name="password" type="password" />
            <span className={styles.selector}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#F2F2F3"><path d="M12 4C14.0683 4 16.0293 4.71758 17.7366 6.04606C19.4439 7.36485 20.8976 9.29455 21.9415 11.7091C22.0195 11.8933 22.0195 12.1067 21.9415 12.2812C19.8537 17.1103 16.1366 20 12 20H11.9902C7.86341 20 4.14634 17.1103 2.05854 12.2812C1.98049 12.1067 1.98049 11.8933 2.05854 11.7091C4.14634 6.88 7.86341 4 11.9902 4H12ZM12 8.12121C9.8439 8.12121 8.09756 9.85697 8.09756 12C8.09756 14.1333 9.8439 15.8691 12 15.8691C14.1463 15.8691 15.8927 14.1333 15.8927 12C15.8927 9.85697 14.1463 8.12121 12 8.12121ZM12.0012 9.57362C13.3378 9.57362 14.4304 10.6597 14.4304 11.9979C14.4304 13.3264 13.3378 14.4124 12.0012 14.4124C10.6548 14.4124 9.56215 13.3264 9.56215 11.9979C9.56215 11.833 9.58166 11.6779 9.61093 11.5227H9.65971C10.7426 11.5227 11.6207 10.6694 11.6597 9.60272C11.767 9.58332 11.8841 9.57362 12.0012 9.57362Z" /></svg></span>
          </div>
          <div className={`${styles.field} mb-5`}>
            <Input placeholder="Введите код из письма" onChange={onChange} value={token} name="token" />
          </div>
          <Button primary>
            Сохранить
          </Button>
        </form>
        <p className="text_type_main-default text_color_inactive pt-10 mt-10">
          Вспомнили пароль?
          {' '}
          <Link to="/login" className={styles.link}>Войти</Link>
        </p>
      </div>
    </Main>
  );
}
