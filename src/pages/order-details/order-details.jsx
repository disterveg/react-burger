import React, { useEffect } from 'react';
import OrderInfo from '../../components/order-info/order-info';
import Main from '../main/main';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/actions/orders';

export function OrderDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { request, failed, orders } = useSelector((state) => state.orders);
  const index = Object.values(orders).findIndex((order) => order._id === id);
  const order = orders[index];

  useEffect(
    () => {
      dispatch(getIngredients());
    },
    [dispatch],
  );

  return (
    <Main>
      <div className="container pt-10 mt-10">
        <OrderInfo showNumber />
      </div>
    </Main>
  );
}