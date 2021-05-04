import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ConstructorList from '../constructor-list/constructor-list';
import styles from './burger-constructor.module.css';

function BurgerConstructor(ingredientData) {
  return (
    <section className="col-50">
      <ConstructorList elements={Object.values(ingredientData)} />
      <div className={`${styles.total} d-flex mt-5 mb-5 pl-2 pr-2`}>
        <p className={`${styles.price} text text_type_digits-large`}>610 <CurrencyIcon /></p>
        <Button type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
  
  export default BurgerConstructor;