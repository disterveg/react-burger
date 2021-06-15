import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderImage from '../order-image/order-image';
import { statuses } from '../../utils/fakeApi';
import { Link } from 'react-router-dom';
import styles from './order.module.css';

const ingredientsPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
});

const orderPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateCreate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
});

const Order = ({ order, showStatus }) => {
  let statusStyle;
  if (Object.keys(order).length > 0) {
    switch (order.status) {
      case 'ready':
        statusStyle = styles.green;
        break;

      case 'cancel':
        statusStyle = styles.red;
        break;
      default:
        statusStyle = ''
    }
  }

  return (
    <div className={`${styles.order} mb-4`}>
      <div className={`${styles.header} mt-2 mb-6`}>
        <span className="ml-2 text_type_digits-default">
          #
          {order.number}
        </span>
        <span className="date text_type_main-default text_color_inactive">Сегодня, 16:20 i-GMT+3</span>
      </div>
      <Link
        to={{ pathname: `/feed/${order._id}` }}
        className={styles.link}
      >
        <p className="text text_type_main-medium ml-2 mb-6">
          {order.name}
        </p>
      </Link>
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
             Object.values(order.ingredients).map((ingredient, index) => {
               const selector = `ingredient${index}`;
               return (
                 <li className={styles[selector]} key={ingredient._id}>
                   <OrderImage url={ingredient.image} alt={ingredient.name} />
                 </li>
               );
             })
          }
        </ul>
        <div className={`${styles.price} mt-5`}>
          <p className="text text_type_digits-default mr-2">{order.price}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  );
};

Order.propTypes = {
  order: orderPropTypes.isRequired,
  showStatus: PropTypes.bool.isRequired,
};

export default Order;
