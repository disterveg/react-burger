import React from 'react';
import { EmailInput, PasswordInput, Button, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AppHeader from '../components/app-header/app-header';
import { setFormValue } from '../services/actions/auth';
import { useDispatch } from 'react-redux';
import { useSelector, useReducer } from 'react-redux';
import { signIn } from '../services/actions/auth';
import styles from './form.module.css';

export function LoginPage() {
  const dispatch = useDispatch();
  const email = useSelector(state => state.auth.form.email);
  const password = useSelector(state => state.auth.form.password);

  const onChange = e => {
    dispatch(setFormValue(e.target.name, e.target.value))
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({
      email,
      password
    }))
  }

  return (
    <>
      <AppHeader />
      <main className="main pt-10 mt-10">
        <div className="container center mt-10 pt-8">
        <Logo />
          <h1 className="text_type_main-medium mt-10 pt-10 mb-6">
            Вход
          </h1>
          <form className={styles.form} style={{margin: '0 auto', width: '482'}}>
            <div className={`${styles.field} mb-5`}>
              <EmailInput onChange={onChange} value={email} name='email' />
            </div>
            <div className={`${styles.field} mb-5`}>
              <PasswordInput onChange={onChange} value={password} name='password' />
            </div>
            <Button onClick={onFormSubmit} primary={true}>
              Войти
            </Button>
          </form>
          <p className="text_type_main-default text_color_inactive pt-10 mt-10">
            Вы — новый пользователь? <Link to='/register' className={styles.link}>Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль? <Link to='/forgot-password' className={styles.link}>Восстановить пароль</Link>
          </p>
        </div>
      </main>
    </>
  );
}