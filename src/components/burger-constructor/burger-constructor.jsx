import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../hocs/modal/modal';
import OrderDetails from '../order-details/order-details';
import styles from './burger-constructor.module.css';

function BurgerConstructor({ingredientData}) {
  const [visible, setVisible] = useState(false)

  const openModal = () => {
      setVisible(true)
  }
  
  const closeModal = () => {
      setVisible(false)
  }

  const modal = (
    <Modal onClose={closeModal}>
      <OrderDetails />
    </Modal>
  );

  useEffect(() => {
    const closeByEsc = (e) => {
      if(e.keyCode === 27) {
        closeModal()
      }
    }

    window.addEventListener('keydown', closeByEsc)
    return () => window.removeEventListener('keydown', closeByEsc)
  }, []);

  return (
    <section className="col-50">
      {visible && modal}
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

BurgerConstructor.propTypes = {
  ingredientData: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
};
  
export default BurgerConstructor;