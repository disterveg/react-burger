import React from 'react';
import OrderInfo from '../../components/order-info/order-info';
import Main from '../main/main';

export function OrderDetailsPage() {
  return (
    <Main>
      <div className="container">
        <OrderInfo />
      </div>
    </Main>
  );
}