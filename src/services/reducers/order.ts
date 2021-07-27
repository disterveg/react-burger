import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_POPUP,
  TOrderActions
} from '../actions/order';
import { IOrder } from '../types/data'; 

type TOrderState = {
  order: IOrder | null,
  orders: IOrder[],
  request: boolean,
  failed: boolean,
  showPopup: boolean
} 

const initialState: TOrderState = {
  order: null,
  orders: [],
  request: false,
  failed: false,
  showPopup: false,
};

export const orderReducer = (
  state: TOrderState = initialState,
  action: TOrderActions
): TOrderState => {
  switch (action.type) {
    case ADD_ORDER_REQUEST: {
      return { ...state, request: true, showPopup: true, order: null };
    }
    case ADD_ORDER_SUCCESS: {
      return { ...state, failed: false, order: action.order, request: false };
    }
    case ADD_ORDER_FAILED: {
      return { ...state, failed: true, request: false, showPopup: true, order: null };
    }
    case GET_ORDER_REQUEST: {
      return { ...state, request: true };
    }
    case GET_ORDER_SUCCESS: {
      return { ...state, failed: false, orders: action.orders, request: false };
    }
    case GET_ORDER_FAILED: {
      return { ...state, failed: true, request: false, showPopup: true };
    }
    case CLOSE_POPUP: {
      return { ...state, showPopup: false };
    }
    default: {
      return state;
    }
  }
};
