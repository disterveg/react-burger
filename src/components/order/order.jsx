import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderImage from '../order-image/order-image';
import { statuses } from '../../utils/mapping';
import { formatDateTime } from '../../utils/dateTime';
import { Link, useLocation } from 'react-router-dom';
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
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
});

const Order = ({ order, showStatus, ingredients }) => {
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
    <div className={`${styles.order} mb-5`}>
      <div className={`${styles.header} mt-2 mb-6`}>
        <span className="ml-2 text_type_digits-default">
          #
          {order.number}
        </span>
        <span className="date text_type_main-default text_color_inactive mr-2">{formatDateTime(order.createdAt)}</span>
      </div>
      <Link
        to={{ 
          pathname: `${location.pathname}/${order.number}`, 
          state: { background: location }
        }}
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
             sliceIngredients.map((id, index) => {
                const key = ingredients.findIndex((item) => item._id === id);
                const ingredient = ingredients[key];
                price = price + ingredient.price;
                const selector = `ingredient${index}`;
               return (
                 <li className={styles[selector]} key={uuidv4()}>
                   <OrderImage url={ingredient.image} alt={ingredient.name} lastItem={sliceIngredients.length-1 === index ? overIngredients : null} />
                 </li>
               );
             })
          }
        </ul>
        <div className={`${styles.price} mt-5 mr-2`}>
          <p className="text text_type_digits-default mr-2">{price}</p>
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
