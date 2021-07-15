import React, { useEffect } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../hocs/modal/modal';
import { useHistory } from 'react-router-dom';
import OrderDetails from '../order-details/order-details';
import { useDispatch } from 'react-redux';
import { addOrder } from '../../services/actions/order';
import ShowError from '../show-error/show-error';
import { CLOSE_POPUP } from '../../services/actions/order';
import { getCookie } from '../../utils/cookie';
import { loadUserData } from '../../services/actions/auth';
import styles from './burger-constructor.module.css';
import { useAppSelector } from '../../services/hooks/hooks';

function BurgerConstructor() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { ingredients, bun } = useAppSelector((state) => state.ingredientsConstructor);
  const { order, failed, showPopup } = useAppSelector((state) => state.order);
  const ingredientsValues = Object.values(ingredients);
  const hasToken = !!localStorage.getItem('refreshToken') && getCookie('accessToken');
  const ingredientsIds = ingredientsValues.map((item):string => item._id);

  useEffect(
    () => {
      if (hasToken) {
        dispatch(loadUserData());
      }
    },
    [dispatch, hasToken]
  );

  const createOrder = async () => {
    if (!user) {
      history.replace('/login');
      return;
    }
    
    const data = {
      ingredients: [...bunIds, ...ingredientsIds],
    };
    dispatch(addOrder(data));
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_POPUP });
  };
  
  const bunIds = [bun ? bun._id : '', bun ? bun._id : '']; 

  let totalPrice = ingredientsValues.reduce((sum, current) => sum + current.price, 0);
  const isEmptyIngredients = Object.keys(ingredients).length === 0;
  if (bun) {
    totalPrice += (bun.price * 2);
  }
  const buttonWrapStyle: React.CSSProperties = {};
  if (!bun) {
    buttonWrapStyle.pointerEvents = 'none';
    buttonWrapStyle.opacity = 0.5;
  }

  return (
    <section className="col-50">
      <ConstructorList elements={ingredientsValues} bun={bun} />
      {
        !isEmptyIngredients || bun
          ? (
            <div className={`${styles.total} d-flex mt-10 mb-8 pl-4 pr-4`}>
              <p className={`${styles.price} text text_type_digits-large`}>
                {totalPrice}
                <CurrencyIcon type={'primary'} />
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
              failed ? ( <ShowError textError="Что-то пошло не так..." /> ) : ( <OrderDetails orderNumber={order ? order.number : null} /> )
            }
          </Modal>
        )}
    </section>
  );
}

export default BurgerConstructor;