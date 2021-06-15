import React from 'react';
import { Input, Button, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, Link } from 'react-router-dom';
import { setFormValue } from '../../services/actions/forgot';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { forgot } from '../../services/actions/forgot';
import Main from '../main/main';
import styles from '../form.module.css';

export function ForgotPasswordPage() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.forgot.form.email);
  const success = useSelector((state) => state.forgot.forgotSuccess);

  const onChange = (e) => {
    dispatch(setFormValue(e.target.name, e.target.value));
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(forgot({
      email,
    }));
  };

  if (success) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password',
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
            <Input onChange={onChange} value={email} name="email" placeholder="Укажите e-mail" />
          </div>
          <Button primary>
            Восстановить
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
