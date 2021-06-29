import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/orders';
import Order from '../order/order';
import Loader from '../loader/loader';
import ShowError from '../show-error/show-error';
import styles from './order-feed.module.css';

const OrderFeed = () => {
  const dispatch = useDispatch();
  const { request, failed, orders } = useSelector((state) => state.orders);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch],
  );

  return (
    <>
      { request ? (
        <Loader />
      ) : failed ? (
        <ShowError textError="Что-то пошло не так..." />
      )
        : orders.length > 0 && (
        <>
          <section className="col-50">
            <div className={`${styles.feed} custom-scrollbar pr-2 mr-5`}>
              <div className="row">
                {Object.values(orders).map((order) => (
                  <Order order={order} showStatus={false} key={order._id} />
                ))}
              </div>
            </div>
          </section>
          <section className={`${styles.info} col-50`}>
            <div className="pl-9">
              <div className="row mb-10">
                <div className="col-50">
                  <div className='col-wrapper'>
                    <h2 className="text text_type_main-medium mb-6">Готовы:</h2>
                    <ul className={`${styles.orders}`}>
                      {Object.values(orders).filter((order) => order.status === 'ready').map((order) => (
                        <li className={`${styles.done} text_type_digits-default mb-2`} key={order._id}>{order.number}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-50">
                  <div className='col-wrapper pl-7'>
                    <h2 className="text text_type_main-medium mb-6">В работе:</h2>
                    <ul className={`${styles.orders}`}>
                      {Object.values(orders).filter((order) => order.status === 'work').map((order) => (
                        <li className="text_type_digits-default mb-2" key={order._id}>{order.number}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="pt-9 mb-10">
                <h2 className="text_type_main-medium text">Выполнено за все время:</h2>
                <p className="text text_type_digits-large text-light">28 752</p>
              </div>
              <div className="pt-10">
                <h2 className="text_type_main-medium text">Выполнено за сегодня:</h2>
                <p className="text text_type_digits-large text-light">138</p>
              </div>
            </div>
          </section>
        </>
        )}
    </>
  );
};

export default OrderFeed;