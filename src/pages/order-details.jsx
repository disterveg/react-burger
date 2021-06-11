import React from 'react';
import AppHeader from '../components/app-header/app-header';
import OrderInfo from '../components/order-info/order-info';

export function OrderDetailsPage() {
  return (
    <>
    <AppHeader />
    <main className="main pt-2">
      <div className="container">
        <OrderInfo />
      </div>
    </main>
    </>
  );
}