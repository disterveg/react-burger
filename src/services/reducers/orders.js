import {
  GET_ORDERS_REQUEST,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILED
} from '../actions/orders';

const initialState = {
  orders: [],
  request: false,
  failed: false,
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS_REQUEST: {
      return {
        ...state,
        request: true
      };
    }
    case GET_ORDERS_SUCCESS: {
      return { ...state, failed: false, orders: action.orders, request: false };
    }
    case GET_ORDERS_FAILED: {
      return { ...state, failed: true, request: false };
    }
    default: {
      return state;
    }
  }
};
