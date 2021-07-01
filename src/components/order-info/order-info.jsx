import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getIngredients } from '../../services/actions/ingredients';
import { getOrder } from '../../services/actions/order';
import Loader from '../loader/loader';
import ShowError from '../show-error/show-error';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderImage from '../order-image/order-image';
import { formatDateTime } from '../../utils/dateTime';
import { useParams } from 'react-router-dom';
import { statuses } from '../../utils/mapping';
import styles from './order-info.module.css';

const OrderInfo = ({showNumber, modal}) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  let { request, failed, order } = useSelector((state) => state.order);
  const { ingredients } = useSelector((state) => state.ingredients);
  order = order[0];

  useEffect(
    () => {
      dispatch(getOrder(id));
      dispatch(getIngredients());
    },
    [dispatch],
  );

  let statusStyle;
  if (order) {
    switch (order.status) {
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

  let allignClass = '';
  if (!modal) {
    allignClass = 'center';
  }
  let price = 0;

  const content = request ? (
    <Loader />
  ) : order && ingredients.length ? (
    <>
      {
        showNumber && <h1 className={`text text_type_digits-default mt-7 mb-10 ${allignClass}`}>#{order.number}</h1>
      }
      <p className="text text_type_main-medium mt-5">
        {order.name}
      </p>
      <p className={`${statusStyle} text text_type_main-default mt-2 mb-8`}>
        {statuses[order.status]}
      </p>
      <h2 className="text text_type_main-medium pt-8">
        Состав:
      </h2>
      <div className={`${styles.ingredients} custom-scrollbar mt-6 mb-6`}>
        {
          Object.values(order.ingredients).map((id) => {
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
                2 x
                {ingredient.price}
              </span>
              <CurrencyIcon />
            </span>
          )})
          }
      </div>
      <div className={`${styles.footer} pt-2`}>
        <p className="text text_type_main-default text_color_inactive">
          {formatDateTime(order.createdAt)}
        </p>
        <div className={`${styles.total}`}>
          <span className="text text_type_digits-default mr-2">{price}</span>
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
