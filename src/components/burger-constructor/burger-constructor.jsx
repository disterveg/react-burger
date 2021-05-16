import React, { useState, useContext, useEffect } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../hocs/modal/modal';
import OrderDetails from '../order-details/order-details';
import { DataContext } from '../../services/productsContext';
import ShowError from '../show-error/show-error';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const ingredientData = useContext(DataContext);
  const [state, setState] = useState({ 
    orderNumber: 0,
    bun: {},
    hasError: false,
    visible: false
  });

  useEffect(() => {
    const index = ingredientData.findIndex(word => word.type === 'bun');
    const bun = ingredientData.splice(index, 1)[0];
    setState({ 
      ...state,
      bun: bun,
    })
  }, [ingredientData]) // eslint-disable-line react-hooks/exhaustive-deps 

  const ids = Object.values(ingredientData).map(item => item._id);

  const createOrder = async () => {
    const url = 'https://norma.nomoreparties.space/api/orders';
    const data = { 
      "ingredients": ids
    };

    try {
      const response = await fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Ответ сети был не ok.');
      }
      const json = await response.json();
      setState({ 
        ...state,
        orderNumber: json.order.number,
        hasError: false,
        visible: true
      })
    } catch (error) {
      setState({ 
        ...state,
        hasError: true,
        visible: true
      })
    }
  }
  
  const closeModal = () => {
    setState({ 
      ...state,
      visible: false
    })
  }

  const modal = (
    <Modal onClose={closeModal}>
      {
        state.hasError ?
        <ShowError textError='Что-то пошло не так...' /> :
        <OrderDetails orderNumber={state.orderNumber} />
      }
    </Modal>
  );

  const totalPrice = Object.values(ingredientData).reduce((sum, current) => sum + current.price, 0) + (state.bun.price * 2);

  return (
    <section className="col-50">
      {state.visible && modal}
      {
        Object.keys(state.bun).length !== 0 &&
          <ConstructorList elements={Object.values(ingredientData)} bun={state.bun} />
      }
      
      <div className={`${styles.total} d-flex mt-10 mb-8 pl-4 pr-4`}>
        <p className={`${styles.price} text text_type_digits-large`}>{totalPrice} <CurrencyIcon /></p>
        <Button type="primary" size="large" onClick={createOrder}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
  
export default BurgerConstructor;