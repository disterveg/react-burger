import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../hocs/modal/modal';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../services/actions/order';
import ShowError from '../show-error/show-error';
import { CLOSE_POPUP } from '../../services/actions/order'
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { ingredients, bun } = useSelector((state) => state.ingredientsConstructor);
  const { order, failed, showPopup } = useSelector((state) => state.orderCreated);
  const ingredientsValues = Object.values(ingredients);

  const ingredientsIds = ingredientsValues.map((item) => item._id);
  const bunIds = [bun._id, bun._id];

  const createOrder = async () => {
    const data = {
      ingredients: [...bunIds, ...ingredientsIds],
    };
    dispatch(addOrder(data));
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_POPUP });
  };

  let totalPrice = ingredientsValues.reduce((sum, current) => sum + current.price, 0);
  const isEmptyIngredients = Object.keys(ingredients).length === 0;
  const isEmptyBun = Object.keys(bun).length === 0;
  if (!isEmptyBun) {
    totalPrice += (bun.price * 2);
  }
  const buttonWrapStyle = {};
  if (isEmptyBun) {
    buttonWrapStyle.pointerEvents = 'none';
    buttonWrapStyle.opacity = 0.5;
  }

  return (
    <section className="col-50">
      <ConstructorList elements={ingredientsValues} bun={bun} />
      {
        !isEmptyIngredients || !isEmptyBun
          ? (
            <div className={`${styles.total} d-flex mt-10 mb-8 pl-4 pr-4`}>
              <p className={`${styles.price} text text_type_digits-large`}>
                {totalPrice}
                <CurrencyIcon />
              </p>
              <div style={buttonWrapStyle}>
                <Button type="primary" size="large" onClick={createOrder}>Оформить заказ</Button>
              </div>
            </div>
          )
          : null
      }
      { showPopup
        && (
          <Modal onClose={closeModal}>
            {
              failed ? ( <ShowError textError="Что-то пошло не так..." /> ) : ( <OrderDetails orderNumber={order.number} /> )
            }
          </Modal>
        )}
    </section>
  );
}

export default BurgerConstructor;
