import React, { useState } from 'react';
import { Input, EmailInput, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import LeftMenu from '../../components/left-menu/left-menu';
import Main from '../main/main';
import styles from './profile.module.css';

export function ProfilePage() {
  const [form, setValue] = useState({ name: '', email: '', password: '' });

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Main>
      <div className="container center">
        <div className="row">
          <div className="col-33">
            <LeftMenu />
          </div>
          <div className="col-67">
            <form className={styles.form}>
              <div className={`${styles.field} mb-5`}>
                <Input onChange={onChange} placeholder="Имя" value={form.name} name="name" />
              </div>
              <div className={`${styles.field} mb-5`}>
                <EmailInput onChange={onChange} value={form.email} name="email" />
              </div>
              <div className={`${styles.field} mb-5`}>
                <PasswordInput onChange={onChange} value={form.password} name="password" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
}
