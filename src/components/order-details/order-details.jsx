import React from 'react';
import { CheckMarkIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ReactComponent as YourSvg } from '../../images/graphics.svg';
import styles from './order-details.module.css';

const OrderDetails = (props) => {
  return (
    <div className={`${styles.OrderDetails}`}>
      <p className={`${styles.id} text text_type_digits-large mt-1 mb-2`}>034536</p>
      <p className={`${styles.text} text text_type_main-medium mt-2 mb-5`}>
        идентификатор заказа
      </p>
      <div className="icon mt-5 mb-4">
        <YourSvg />
      </div>
      <p className={`${styles.text} text text_type_main-default mt-4`}>
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.inactive} text text_type_main-default mb-5 pb-5`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;