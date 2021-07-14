import React, { SyntheticEvent, useState } from 'react';
import {
  Input, PasswordInput, Button, Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../services/actions/registration';
import { useDispatch } from 'react-redux';
import Main from '../main/main';
import styles from '../form.module.css';
import { useAppSelector } from '../../services/hooks/hooks';

export function RegisterPage() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });
  const { name, email, password} = form;
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.registration.user);
  const failed = useAppSelector((state) => state.registration.registrationFailed);
  const errorText = useAppSelector((state) => state.registration.registrationErrorText);

  const onChange = (e: SyntheticEvent) => {
    let target = e.target as unknown as HTMLInputElement;
    const { name, value } = target;
    setValue({ ...form, [name]: value });
  };

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({
      name,
      password,
      email,
    }));
  };

  if (user) {
    return (
      <Redirect
        to={{
          pathname: '/'
        }}
      />
    );
  }

  return (
    <Main>
      <div className="container center mt-10 pt-10">
        <div className='wrapper mt-8'>
          <Logo />
          <h1 className="text_type_main-medium mt-10 pt-8 mb-6">
            Регистрация
          </h1>
          <form className={styles.form} onSubmit={onFormSubmit}>
            <div className={`${styles.field} mb-6`}>
              <Input 
                onChange={onChange} 
                placeholder="Имя" 
                value={name} 
                name="name"
              />
            </div>
            <div className={`${styles.field} mb-6`}>
              <Input 
                onChange={onChange} 
                placeholder="E-mail" 
                value={email} 
                name="email" 
                type="email"
                errorText={errorText} 
                error={failed} 
              />
            </div>
            <div className={`${styles.field} mb-6`}>
              <PasswordInput 
                onChange={onChange} 
                value={password} 
                name="password" 
              />
            </div>
            <Button>
              Зарегистрироваться
            </Button>
          </form>
          <p className="text_type_main-default text_color_inactive pt-10 mt-10">
            Уже зарегистрированы?
            {' '}
            <Link to="/login" className={styles.link}>Войти</Link>
          </p>
        </div>
      </div>
    </Main>
  );
}
