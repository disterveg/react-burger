import React, { useEffect } from 'react';
import OrderInfo from '../../components/order-info/order-info';
import Main from '../main/main';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/ingredients';

export function OrderDetailsPage() {
  const dispatch = useDispatch();

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