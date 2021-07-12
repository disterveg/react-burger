import React, { useState, useCallback, SyntheticEvent } from 'react';
import {
  Input, Button, Logo,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, Link } from 'react-router-dom';
import { resetPasswordRequest } from '../../utils/api';
import { getCookie } from '../../utils/cookie';
import Main from '../main/main';
import styles from '../form.module.css';

export function ResetPasswordPage() {
  const [form, setValue] = useState({ password: '', token: '' });
  const [resetSentSucceess, setSuccess] = useState(false);
  const [error, setError] = useState({ state: false, text: '' });

  const onChange = (e: SyntheticEvent) => {
    let target = e.target as unknown as HTMLInputElement;
    const { name, value } = target;
    setValue({ ...form, [name]: value });
  };

  const onFormSubmit = useCallback(
    e => {
      e.preventDefault();
      resetPasswordRequest(form).then(res => {
        if (res && res.success) {
          setSuccess(true);
        } else {
          setError({ state: true, text: res.message });
        }
      })
      .catch(err => {
        setError({ state: true, text: err });
      });
    },
    [form]
  );

  if (resetSentSucceess || !getCookie('resetEmail')) {
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
            <Input 
              placeholder="Введите новый пароль" 
              onChange={onChange} 
              value={form.password} 
              name="password" 
              type="password" 
            />
          </div>
          <div className={`${styles.field} mb-5`}>
            <Input 
              placeholder="Введите код из письма" 
              onChange={onChange} 
              value={form.token} 
              name="token" 
              errorText={error.text} 
              error={error.state} 
            />
          </div>
          <Button>
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
