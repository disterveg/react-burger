import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { getIngredients } from '../../services/actions/ingredients';
import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_STOP } from '../../services/actions/ws-feed';
import Order from '../order/order';
import Loader from '../loader/loader';
import ShowError from '../show-error/show-error';
import { IOrder, IIngredient, RootState } from '../../services/types/data';
import styles from './order-feed.module.css';

const OrderFeed = () => {
  const dispatch = useDispatch();
  const { ingredients }: {ingredients: Array<IIngredient>} = useSelector((state: RootState) => state.ingredients);
  const { failed }: {failed: boolean} = useSelector((state: RootState) => state.orders);
  const request: boolean = useSelector((state: any) => state.feed.wsConnected);
  const orders: Array<IOrder> = useSelector((state: any) => state.feed.orders);
  const total: number = useSelector((state: any) => state.feed.total);
  const totalToday: number = useSelector((state: any) => state.feed.totalToday);
  const ordersValues: Array<IOrder> = Object.values(orders);

  useEffect(
    () => {
      dispatch(getIngredients());
      dispatch({ type: WS_FEED_CONNECTION_START });
      return () => {
        dispatch({ type: WS_FEED_CONNECTION_STOP });
      }
    },
    [dispatch],
  );

  function chunks(arr: Array<IOrder>, size: number) {
    if (!Array.isArray(arr)) {
      throw new TypeError('Input should be Array');
    }
  
    if (typeof size !== 'number') {
      throw new TypeError('Size should be a Number');
    }
  
    var result = [];
    for (var i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, size + i));
    }
  
    return result;
  };

  const rowsDone = chunks(ordersValues.filter((order) => order.status === 'done'), 10);
  const rowsPending = chunks(ordersValues.filter((order) => order.status === 'pending'), 10);

  return (
    <>
      { !request ? (
        <Loader />
      ) : failed ? (
        <ShowError textError="Что-то пошло не так..." />
      )
        : orders.length > 0 && (
        <>
          <section className="col-50">
            <div className={`${styles.feed} custom-scrollbar pr-2 mr-5`}>
              <div className="row">
                {ordersValues.map((order) => (
                  <Order order={order} showStatus={false} key={uuidv4()} ingredients={ingredients} />
                ))}
              </div>
            </div>
          </section>
          <section className={`${styles.info} col-50`}>
            <div className="pl-9">
              <div className="row mb-10">
                <div className="col-50">
                  <div className={`${styles.col} col-wrapper`}>
                    <h2 className={`${styles.title} text text_type_main-medium mb-6`}>Готовы:</h2>
                      {
                      rowsDone.map((row) => (
                        <ul className={`${styles.orders}`} key={uuidv4()}>
                        {
                          row.map((col) => (
                            <li className={`${styles.done} text_type_digits-default mb-2`} key={uuidv4()}>{col.number}</li>
                          ))
                        }
                        </ul>
                      ))
                      }
                  </div>
                </div>
                <div className="col-50">
                  <div className={`${styles.col} col-wrapper pl-7`}>
                    <h2 className={`${styles.title} text text_type_main-medium mb-6`}>В работе:</h2>
                    {
                      rowsPending.map((row) => (
                        <ul className={`${styles.orders}`} key={uuidv4()}>
                        {
                          row.map((col) => (
                            <li className={`${styles.done} text_type_digits-default mb-2`} key={uuidv4()}>{col.number}</li>
                          ))
                        }
                        </ul>
                      ))
                      }
                  </div>
                </div>
              </div>
              <div className="pt-9 mb-10">
                <h2 className="text_type_main-medium text">Выполнено за все время:</h2>
                <p className="text text_type_digits-large text-light">{total}</p>
              </div>
              <div className="pt-10">
                <h2 className="text_type_main-medium text">Выполнено за сегодня:</h2>
                <p className="text text_type_digits-large text-light">{totalToday}</p>
              </div>
            </div>
          </section>
        </>
        )}
    </>
  );
};

export default OrderFeed;