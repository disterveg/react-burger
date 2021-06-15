import React, { useEffect } from 'react';
import LeftMenu from '../../components/left-menu/left-menu';
import Loader from '../../components/loader/loader';
import ShowError from '../../components/show-error/show-error';
import Order from '../../components/order/order';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/orders';
import Main from '../main/main';
import styles from './profile-orders.module.css';

export function ProfileOrdersPage() {
  const dispatch = useDispatch();
  const { request, failed, orders } = useSelector((state) => state.orders);

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch],
  );

  let content;
  if (request) {
    content = ( <Loader /> );
  } else if (failed) {
    content = ( <ShowError textError="Что-то пошло не так..." /> );
  } else if (orders && orders.length) {
    content = (
      <>
        <div className="col-33">
          <LeftMenu />
        </div>
        <div className="col-67">
          <div className={`${styles.feed} custom-scrollbar pr-2 mr-5`}>
            <div className="row">
              {
                Object.values(orders).map((order) => (
                  <Order order={order} showStatus key={order._id} />
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
      <div className="container center">
        <div className="row">
          {content}
        </div>
      </div>
    </Main>
  );
}
