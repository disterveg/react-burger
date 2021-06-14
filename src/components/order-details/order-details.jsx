import React from 'react';
import PropTypes from 'prop-types';
import graphics from '../../images/graphics.svg';
import styles from './order-details.module.css';

const OrderDetails = ({ orderNumber }) => (
  <div className={`${styles.OrderDetails}`}>
    <p className={`${styles.id} text text_type_digits-large mt-2 mb-4`}>{orderNumber}</p>
    <p className={`${styles.text} text text_type_main-medium mt-4 mb-10`}>
      идентификатор заказа
    </p>
    <div className="icon mt-10 mb-8">
      <img src={graphics} className={styles.graphics} alt="graphics" />
    </div>
    <p className={`${styles.text} text text_type_main-default mt-8`}>
      Ваш заказ начали готовить
    </p>
    <p className={`${styles.text} text text_type_main-default mb-10 pb-10 text_color_inactive`}>
      Дождитесь готовности на орбитальной станции
    </p>
  </div>
);

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired,
};

export default OrderDetails;
