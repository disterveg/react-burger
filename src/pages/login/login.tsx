import React, { SyntheticEvent, useState } from 'react';
import {
  Input, PasswordInput, Button, Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect } from 'react-router-dom';
import { signIn } from '../../services/actions/auth';
import { useDispatch } from 'react-redux';
import Main from '../main/main';
import { isObjectEmpty } from '../../utils';
import styles from '../form.module.css';
import { useAppSelector } from '../../services/hooks/hooks';

export function LoginPage() {
  const [form, setValue] = useState({ email: '', password: '' });
  const { email, password}  = form;
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const failed = useAppSelector((state) => state.auth.loginFailed);
  const errorText = useAppSelector((state) => state.auth.loginErrorText);

  const onChange = (e: SyntheticEvent) => {
    let target = e.target as unknown as HTMLInputElement;
    const { name, value } = target;
    setValue({ ...form, [name]: value });
  };

  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(signIn({
      email,
      password,
    }));
  };

  if (!isObjectEmpty(user)) {
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
        <div className='wrapper mt-10 pt-4'>
          <Logo />
          <h1 className="text_type_main-medium mt-10 pt-8 mb-6">
            Вход
          </h1>
          <form className={styles.form} onSubmit={onFormSubmit}>
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
              Войти
            </Button>
          </form>
          <p className="text_type_main-default text_color_inactive pt-10 mt-10">
            Вы — новый пользователь? <Link to="/register" className={styles.link}>Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль? <Link to="/forgot-password" className={styles.link}>Восстановить пароль</Link>
          </p>
        </div>
      </div>
    </Main>
  );
}
