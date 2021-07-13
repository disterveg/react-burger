import {
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_STOP,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
  TWSFeedActions
} from '../actions/ws-feed';
import { IOrder } from '../../services/types/data';

type TWsFeedState = {
  wsConnected: boolean,
  orders: Array<IOrder>,
  total: number,
  totalToday: number
} 

const initialState: TWsFeedState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsFeedReducer = (
  state: TWsFeedState = initialState,
  action: TWSFeedActions
) => {
  switch (action.type) {
    case WS_FEED_CONNECTION_START:
      return {
        ...state,
        wsConnected: false
      };
    case WS_FEED_CONNECTION_STOP:
      return {
        ...state,
        wsConnected: false
      };
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_FEED_GET_MESSAGE:
      return { 
        ...state, 
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
};
