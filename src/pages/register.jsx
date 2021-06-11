import React from 'react';
import { Input, EmailInput, PasswordInput, Button, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import AppHeader from '../components/app-header/app-header';
import { setFormValue } from '../services/actions/registration';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { register } from '../services/actions/registration';
import styles from './form.module.css';

export function RegisterPage() {
  const dispatch = useDispatch();
  const name = useSelector(state => state.registration.form.name);
  const password = useSelector(state => state.registration.form.password);
  const email = useSelector(state => state.registration.form.email);

  const onChange = e => {
    dispatch(setFormValue(e.target.name, e.target.value))
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(register({
      name,
      password,
      email
    }))
  }

  return (
    <>
      <AppHeader />
      <main className="main pt-10 mt-10">
        <div className="container center mt-10 pt-8">
        <Logo />
          <h1 className="text_type_main-medium mt-10 pt-10 mb-6">
            Регистрация
          </h1>
          <form className={styles.form} style={{margin: '0 auto', width: '482'}}>
            <div className={`${styles.field} mb-5`}>
              <Input onChange={onChange} placeholder='Имя' value={name} name='name' />
            </div>
            <div className={`${styles.field} mb-5`}>
              <EmailInput onChange={onChange} value={email} name='email' />
            </div>
            <div className={`${styles.field} mb-5`}>
              <PasswordInput onChange={onChange} value={password} name='password' />
            </div>
            <Button onClick={onFormSubmit} primary={true}>
              Зарегистрироваться
            </Button>
          </form>
          <p className="text_type_main-default text_color_inactive pt-10 mt-10">
            Уже зарегистрированы? <Link to='/login' className={styles.link}>Войти</Link>
          </p>
        </div>
      </main>
    </>
  );
}