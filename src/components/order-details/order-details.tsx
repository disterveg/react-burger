import React from 'react';
import graphics from '../../images/graphics.svg';
import { useAppSelector } from '../../services/hooks/hooks';
import Loader from '../loader/loader';
import styles from './order-details.module.css';

const OrderDetails = ({ orderNumber }: {orderNumber: number | null}) => {
  const request = useAppSelector((state) => state.order.request);

  const content = request ? (
    <Loader />
  ) : (
    <div className={`${styles.OrderDetails}`}>
      <p className={`${styles.id} text text_type_digits-large mt-3 mb-4`}>{orderNumber}</p>
      <p className={`${styles.text} text text_type_main-medium mt-4 mb-10`}>
        идентификатор заказа
      </p>
      <div className="icon mt-7 mb-8">
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

  return (
    <>
      {content}
    </>
  );
}

export default OrderDetails;
