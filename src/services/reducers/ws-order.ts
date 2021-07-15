import {
  WS_ORDER_CONNECTION_START,
  WS_ORDER_CONNECTION_STOP,
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_GET_MESSAGE,
  TWSOrderActions
} from '../actions/ws-order';
import { IOrder } from '../../services/types/data';

type TWsOrderState = {
  wsConnected: boolean,
  orders: Array<IOrder>,
  total: number,
  totalToday: number
} 

const initialState: TWsOrderState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0
};

export const wsOrderReducer = (
  state: TWsOrderState = initialState,
  action: TWSOrderActions
) => {
  switch (action.type) {
    case WS_ORDER_CONNECTION_START:
      return {
        ...state,
        wsConnected: false
      };
    case WS_ORDER_CONNECTION_STOP:
      return {
        ...state,
        wsConnected: false
      };
    case WS_ORDER_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_ORDER_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_ORDER_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_ORDER_GET_MESSAGE:
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
