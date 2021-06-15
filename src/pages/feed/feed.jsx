import React from 'react';
import OrderFeed from '../../components/order-feed/order-feed';
import Main from '../main/main';

export function FeedPage() {
  return (
    <Main>
      <div className="container">
        <h1 className="page-title text_type_main-large">Лента заказов</h1>
        <div className="row">
          <OrderFeed />
        </div>
      </div>
    </Main>
  );
}
