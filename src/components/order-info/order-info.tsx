import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getIngredients } from '../../services/actions/ingredients';
import { getOrder } from '../../services/actions/order';
import Loader from '../loader/loader';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderImage from '../order-image/order-image';
import { formatDateTime } from '../../utils/dateTime';
import { useParams } from 'react-router-dom';
import { statuses } from '../../utils/mapping';
import { IIngredient, IOrder } from '../../services/types/data';
import styles from './order-info.module.css';
import { useAppSelector } from '../../services/hooks/hooks';

const OrderInfo = ({showNumber, modal, profile}: {showNumber: boolean, modal?: boolean, profile?: boolean}) => {
  const dispatch = useDispatch();
  const { id } = useParams<{id: string}>();
  const { request, orders } = useAppSelector((state) => state.order);
  const { ingredients }: {ingredients: Array<IIngredient>} = useAppSelector((state) => state.ingredients);
  const feedOrders: Array<IOrder> = useAppSelector((state) => state.feed.orders);
  const profileOrders: Array<IOrder> = useAppSelector((state) => state.orders.orders);
  

  useEffect(
    () => {
      if (!modal) {
        dispatch(getOrder(id));
      }
      if (!ingredients.length) {
        dispatch(getIngredients());
      }
    },
    [dispatch, id, ingredients.length, modal],
  );

  let currentOrder = orders[0];
  if (modal && !profile) {
    currentOrder = feedOrders.filter((item) => item.number === parseInt(id))[0];
  } else {
    currentOrder = profileOrders.filter((item) => item.number === parseInt(id))[0];
  }

  let statusStyle;
  if (currentOrder) {
    switch (currentOrder.status) {
      case 'done':
        statusStyle = styles.green;
        break;

      case 'pending':
        statusStyle = styles.yellow;
        break;
      default:
        statusStyle = '';
    }
  }

  let allignClass = styles.modalNumber;
  if (!modal) {
    allignClass = 'center';
  }
  let price = 0;

  const content = request ? (
    <Loader />
  ) : currentOrder && ingredients.length ? (
    <>
      {
        showNumber && <h1 className={`text text_type_digits-default mt-7 mb-10 ${allignClass}`}>#{currentOrder.number}</h1>
      }
      <p className="text text_type_main-medium mt-5">
        {currentOrder.name}
      </p>
      <p className={`${statusStyle} text text_type_main-default mt-2 mb-8`}>
        {statuses[currentOrder.status]}
      </p>
      <h2 className="text text_type_main-medium pt-8">
        Состав:
      </h2>
      <div className={`${styles.ingredients} custom-scrollbar mt-6 mb-6`}>
        {
          Object.values(currentOrder.ingredients).map((id) => {
            const key = ingredients.findIndex((item) => item._id === id);
            const ingredient = ingredients[key];
            price = price + ingredient.price;
            return (
            <span className={`${styles.row} mb-4`} key={uuidv4()}>
              <OrderImage url={ingredient.image} alt={ingredient.name} />
              <span className={`${styles.name} text text_type_main-default ml-4`}>
                {ingredient.name}
              </span>
              <span className={`${styles.price} text text_type_digits-default mr-2`}>
                {ingredient.price}
              </span>
              <CurrencyIcon type='primary' />
            </span>
          )})
          }
      </div>
      <div className={`${styles.footer} pt-2`}>
        <p className="text text_type_main-default text_color_inactive">
          {formatDateTime(currentOrder.createdAt)}
        </p>
        <div className={`${styles.total}`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
          <CurrencyIcon type='primary' />
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
