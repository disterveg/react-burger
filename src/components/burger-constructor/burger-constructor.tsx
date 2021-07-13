import React, { useEffect } from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ConstructorList from '../constructor-list/constructor-list';
import Modal from '../hocs/modal/modal';
import { useHistory } from 'react-router-dom';
import OrderDetails from '../order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../services/actions/order';
import ShowError from '../show-error/show-error';
import { CLOSE_POPUP } from '../../services/actions/order';
import { isObjectEmpty } from '../../utils';
import { getCookie } from '../../utils/cookie';
import { loadUserData } from '../../services/actions/auth';
import { IIngredient, IOrder, RootState } from '../../services/types/data'
import styles from './burger-constructor.module.css';

function BurgerConstructor() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const { ingredients, bun }: { ingredients: Array<IIngredient>, bun: IIngredient } = useSelector((state: any) => state.ingredientsConstructor);
  const { order, failed, showPopup }: { order: IOrder, failed: boolean, showPopup: boolean} = useSelector((state: any) => state.order);
  const ingredientsValues: Array<IIngredient> = Object.values(ingredients);
  const hasToken = !!localStorage.getItem('refreshToken') && getCookie('accessToken');

  const ingredientsIds = ingredientsValues.map((item: IIngredient):string => item._id);
  const bunIds = [bun._id, bun._id];

  useEffect(
    () => {
      if (hasToken) {
        dispatch(loadUserData());
      }
    },
    [dispatch, hasToken]
  );

  const createOrder = async () => {
    if (isObjectEmpty(user)) {
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

  let totalPrice = ingredientsValues.reduce((sum, current) => sum + current.price, 0);
  const isEmptyIngredients = Object.keys(ingredients).length === 0;
  const isEmptyBun = Object.keys(bun).length === 0;
  if (!isEmptyBun) {
    totalPrice += (bun.price * 2);
  }
  const buttonWrapStyle: React.CSSProperties = {};
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
              failed ? ( <ShowError textError="Что-то пошло не так..." /> ) : ( <OrderDetails orderNumber={order.number} /> )
            }
          </Modal>
        )}
    </section>
  );
}

export default BurgerConstructor;
