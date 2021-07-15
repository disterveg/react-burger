import React, { useEffect } from 'react';
import LeftMenu from '../../components/left-menu/left-menu';
import Loader from '../../components/loader/loader';
import ShowError from '../../components/show-error/show-error';
import Order from '../../components/order/order';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';
import { WS_ORDER_CONNECTION_START, WS_ORDER_CONNECTION_STOP } from '../../services/actions/ws-order';
import Main from '../main/main';
import { IIngredient } from '../../services/types/data';
import styles from './profile-orders.module.css';
import { useAppSelector } from '../../services/hooks/hooks';

export function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const { ingredients }: { ingredients: IIngredient[] } = useAppSelector((state) => state.ingredients);
  const request = useAppSelector((state) => state.orders.wsConnected);
  const orders = useAppSelector((state) => state.orders.orders);

  useEffect(
    () => {
      dispatch(getIngredients());
      dispatch({ type: WS_ORDER_CONNECTION_START });
      return () => {
        dispatch({ type: WS_ORDER_CONNECTION_STOP });
      }
    },
    [dispatch],
  );

  let content;
  if (!request) {
    content = ( <Loader /> );
  } else if (orders && orders.length) {
    content = (
      <>
        <div className="col-33 mt-10 pt-10">
          <LeftMenu />
        </div>
        <div className="col-67">
          <div className={`${styles.feed} custom-scrollbar pr-2`}>
            <div className="row">
              {
                Object.values(orders).map((order) => (
                  <Order order={order} showStatus key={order._id} ingredients={ingredients} />
                ))
              }
            </div>
          </div>
        </div>
      </>
    );
  } else {
    content = ( <ShowError textError="Что-то пошло не так..." />) ;
  }

  return (
    <Main>
      <div className="container center mt-6">
        <div className="row">
          {content}
        </div>
      </div>
    </Main>
  );
}
