import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import ConstructorList from '../constructor-list/constructor-list';
import data from '../../utils/data';
import './burger-constructor.css';

function BurgerConstructor() {
    return (
      <section className="col-50">
        <ConstructorList elements={data} />
        <div className="total d-flex mt-5 mb-5 pl-2 pr-2">
          <div className="total-price">
            <p className="text text_type_digits-large">610 <CurrencyIcon /></p>
          </div>
          <Button type="primary" size="large">
            Оформить заказ
          </Button>
        </div>
        </section>
    );
  }
  
  export default BurgerConstructor;