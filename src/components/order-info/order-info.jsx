import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/orders';
import Loader from '../loader/loader';
import ShowError from '../show-error/show-error';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderImage from '../order-image/order-image';
import { useParams } from 'react-router-dom';
import { statuses } from '../../utils/fakeApi';
import styles from './order-info.module.css';

const OrderInfo = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { request, failed, orders } = useSelector((state) => state.orders);
  const index = Object.values(orders).findIndex((order) => order._id === id);
  const order = orders[index];

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch],
  );

  let statusStyle;
  if (orders && orders.length) {
    switch (order.status) {
      case 'ready':
        statusStyle = styles.green;
        break;

      case 'cancel':
        statusStyle = styles.red;
        break;
      default:
        statusStyle = '';
    }
  }

  const content = request ? (
    <Loader />
  ) : orders && orders.length ? (
    <>
      <p className="text text_type_main-medium mt-2">
        {order.name}
      </p>
      <p className={`${statusStyle} text text_type_main-default mt-2 mb-10`}>
        {statuses[order.status]}
      </p>
      <h2 className="text text_type_main-medium pt-8">
        Состав:
      </h2>
      <div className={`${styles.ingredients} custom-scrollbar mt-6 mb-6`}>
        {
          Object.values(order.ingredients).map((ingredient) => (
            <span className={`${styles.row} mb-4`} key={ingredient._id}>
              <OrderImage url={ingredient.image} alt={ingredient.name} />
              <span className={`${styles.name} text text_type_main-default ml-4`}>
                {ingredient.name}
              </span>
              <span className={`${styles.price} text text_type_digits-default mr-2`}>
                2 x
                {ingredient.price}
              </span>
              <CurrencyIcon />
            </span>
          ))
        }
      </div>
      <div className={`${styles.footer} pt-2`}>
        <p className="text text_type_main-default text_color_inactive">
          Вчера, 13:50 i-GMT+3
        </p>
        <div className={`${styles.total}`}>
          <span className="text text_type_digits-default mr-2">{order.price}</span>
          <CurrencyIcon />
        </div>
      </div>
    </>
  ) : null;

  return (
    <div className={styles.details}>
      {content}
    </div>
  );
};

export default OrderInfo;
