import React, { useState, useContext } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../hocs/modal/modal';
import OrderDetails from '../order-details/order-details';
import { DataContext } from '../../services/productsContext';
import ShowError from '../show-error/show-error';
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const {ingredients} = useContext(DataContext);
  const [state, setState] = useState({ 
    orderNumber: 0,
    bun: {},
    hasError: false,
    visible: false
  });

  const ingredientsIds = Object.values(ingredients.selectedIngredients).map(item => item._id);
  const bunIds = [ingredients.selectedBun._id, ingredients.selectedBun._id];

  const createOrder = async () => {
    const url = 'https://norma.nomoreparties.space/api/orders';
    const data = { 
      "ingredients": [...bunIds, ...ingredientsIds]
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

  let totalPrice = Object.values(ingredients.selectedIngredients).reduce((sum, current) => sum + current.price, 0);
  const isEmptyIngredients = Object.keys(ingredients.selectedIngredients).length === 0;
  const isEmptyBun = Object.keys(ingredients.selectedBun).length === 0;
  if (!isEmptyBun) {
    totalPrice = totalPrice + (ingredients.selectedBun.price * 2)
  }

  return (
    <section className="col-50">
      {state.visible && modal}
      {
        (!isEmptyIngredients || !isEmptyBun) &&
          <>
            <ConstructorList elements={Object.values(ingredients.selectedIngredients)} bun={ingredients.selectedBun} />
            <div className={`${styles.total} d-flex mt-10 mb-8 pl-4 pr-4`}>
            <p className={`${styles.price} text text_type_digits-large`}>{totalPrice} <CurrencyIcon /></p>
            {
              !isEmptyBun &&
                <Button type="primary" size="large" onClick={createOrder}>
                  Оформить заказ
                </Button>
            }
            </div>
          </>
      }
    </section>
  );
}
  
export default BurgerConstructor;