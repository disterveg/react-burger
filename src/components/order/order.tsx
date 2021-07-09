import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderImage from '../order-image/order-image';
import { statuses } from '../../utils/mapping';
import { formatDateTime } from '../../utils/dateTime';
import { Link, useLocation } from 'react-router-dom';
import { IOrder, IIngredient } from '../../services/types/data';
import styles from './order.module.css';

const Order = ({ order, showStatus, ingredients }: {order: IOrder, showStatus: boolean, ingredients: Array<IIngredient>}) => {
  const location = useLocation();
  let price = 0;
  let statusStyle;
  if (Object.keys(order).length > 0) {
    switch (order.status) {
      case 'done':
        statusStyle = styles.green;
        break;

      case 'pending':
        statusStyle = styles.yellow;
        break;
      default:
        statusStyle = ''
    }
  }

  const sliceIngredients = Object.values(order.ingredients).slice(0,6);
  const overIngredients = Object.values(order.ingredients).slice(6).length;

  return (
    <Link
      to={{ 
        pathname: `${location.pathname}/${order.number}`, 
        state: { background: location }
      }}
      className={styles.link}
    >
      <div className={`${styles.order} mb-5`}>
        <div className={`${styles.header} mt-2 mb-6`}>
          <span className="ml-2 text_type_digits-default">
            #
            {order.number}
          </span>
          <span className="date text_type_main-default text_color_inactive mr-2">{formatDateTime(order.createdAt)}</span>
        </div>
          <p className="text text_type_main-medium ml-2 mb-6">
            {order.name}
          </p>
        {
          showStatus
            ? (
              <p className={`${styles.status} ${statusStyle} text text_type_main-default mb-2 ml-2`}>
                {statuses[order.status]}
              </p>
            )
            : null
        }
        <div className={`${styles.footer} ml-2`}>
          <ul className={`${styles.ingredients}`}>
            {
              sliceIngredients.map((id, index) => {
                  const key = ingredients.findIndex((item) => item._id === id);
                  const ingredient = ingredients[key];
                  price = price + ingredient.price;
                  const selector = `ingredient${index}`;
                return (
                  <li className={styles[selector]} key={uuidv4()}>
                    <OrderImage 
                      url={ingredient.image} 
                      alt={ingredient.name} 
                      lastItem={sliceIngredients.length-1 === index ? overIngredients : null}
                    />
                  </li>
                );
              })
            }
          </ul>
          <div className={`${styles.price} mt-5 mr-2`}>
            <p className="text text_type_digits-default mr-2">{price}</p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Order;
