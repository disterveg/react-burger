import React, { useState, useCallback } from 'react';
import { Input, Button, Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Redirect, Link } from 'react-router-dom';
import { forgotPasswordRequest } from '../../utils/api';
import Main from '../main/main';
import { setCookie } from '../../utils/cookie';
import styles from '../form.module.css';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [resetSentSucceess, setSuccess] = useState(false);
  const [error, setError] = useState({ state: false, text: '' });

  const onFormSubmit = useCallback(
    e => {
      e.preventDefault();
      forgotPasswordRequest({email}).then(res => {
        if (res && res.success) {
          setCookie('resetEmail', 'sent');
          setSuccess(true);
        } else {
          setError({ state: true, text: res.message });
        }
      })
      .catch(err => {
        setError({ state: true, text: err });
      });
    },
    [email]
  );

  if (resetSentSucceess) {
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
      <div className="container center mt-10 pt-10">
        <div className='wrapper mt-10 pt-10'>
          <p className='mt-10'>
            <Logo />
          </p>
          <h1 className="text_type_main-medium mt-10 pt-8 mb-6">
            Восстановление пароля
          </h1>
          <form className={styles.form} onSubmit={onFormSubmit}>
            <div className={`${styles.field} mb-6`}>
              <Input 
                onChange={e => setEmail(e.target.value)} 
                value={email} 
                name="email" 
                type="email"
                placeholder="Укажите e-mail"
                errorText={error.text} 
                error={error.state}  
              />
            </div>
            <Button>
              Восстановить
            </Button>
          </form>
          <p className="text_type_main-default text_color_inactive pt-10 mt-10">
            Вспомнили пароль?
            {' '}
            <Link to="/login" className={styles.link}>Войти</Link>
          </p>
        </div>
      </div>
    </Main>
  );
}
