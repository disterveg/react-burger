import React, {useState, useEffect} from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

function BurgerConstructor(ingredientData) {
  const [state, setState] = useState({
    visible: false
  });

  const openModal = () => {
    setState({ 
      ...state,
      visible: true
    })
  }

  const closeModal = () => {
    setState({ 
      ...state,
      visible: false
    })
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  );

  useEffect(() => {
    const close = (e) => {
      if(e.keyCode === 27){
        closeModal()
      }
    }

    window.addEventListener('keydown', close)
    return () => window.removeEventListener('keydown', close)
  }, []);

  return (
    <section className="col-50">
      {state.visible && modal}
      <ConstructorList elements={Object.values(ingredientData)} />
      <div className={`${styles.total} d-flex mt-10 mb-8 pl-4 pr-4`}>
        <p className={`${styles.price} text text_type_digits-large`}>610 <CurrencyIcon /></p>
        <Button type="primary" size="large" onClick={openModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
  
  export default BurgerConstructor;