import React from 'react';
import AppHeader from '../components/app-header/app-header';
import OrderFeed from '../components/order-feed/order-feed';

export function FeedPage() {
  return (
    <>
      <AppHeader />
      <main className="main pt-2">
        <div className="container">
          <h1 className="page-title text_type_main-large">Лента заказов</h1> 
        <OrderFeed />
          </div>
      </main>
    </>
  );
};