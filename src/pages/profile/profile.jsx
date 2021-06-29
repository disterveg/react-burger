import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import LeftMenu from '../../components/left-menu/left-menu';
import { updateUserData } from '../../services/actions/auth';
import Main from '../main/main';
import styles from './profile.module.css';

export function ProfilePage() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [form, setValue] = useState({ name: user.name, email: user.email, password: '' });
  const failed = useSelector((state) => state.auth.updateUserFailed);
  const success = useSelector((state) => state.auth.updateUserSuccess);
  console.log(success);

  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserData({
      name: form.name,
      email: form.email,
    }));
  };

  const onFormCancel = (e) => {
    e.preventDefault();
    setValue({ name: user.name, email: user.email, password: '' });
  };

  return (
    <Main>
      <div className="container center mt-10 pt-10">
        <div className="row mt-6">
          <div className="col-33">
            <LeftMenu />
          </div>
          <div className="col-67">
            <form className={styles.form} onSubmit={onFormSubmit}>
              <div className={`${styles.field} mb-6`}>
                <Input 
                  onChange={onChange} 
                  placeholder="Имя" 
                  value={form.name} 
                  name="name" 
                  icon={'EditIcon'}
                  success={success}
                />
              </div>
              <div className={`${styles.field} mb-6`}>
                <Input 
                  onChange={onChange} 
                  placeholder="E-mail" 
                  value={form.email} 
                  name="email" 
                  type="email"
                  icon={'EditIcon'} 
                  errorText="Произошла ошибка"
                  error={failed}
                  success={success}
                />
              </div>
              <div className={`${styles.field} mb-6`}>
                <Input 
                  onChange={onChange} 
                  placeholder="Пароль" 
                  value={form.password} 
                  name="password" 
                  type="password" 
                  icon={'EditIcon'}
                  success={success}
                />
              </div>
              <div className={styles.buttons}>
                <Button type="secondary" onClick={onFormCancel}>
                  Отмена
                </Button>
                <Button primary>
                  Сохранить
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Main>
  );
}
