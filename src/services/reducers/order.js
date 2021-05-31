import {
  ADD_ORDER_REQUEST,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAILED,
  CLOSE_POPUP
} from '../actions/order';

const initialState = {
  order: {},
  request: false,
  failed: false,
  showPopup: false,
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ORDER_REQUEST: {
      return { ...state, request: true };
    }
    case ADD_ORDER_SUCCESS: {
      return { ...state, failed: false, order: action.order, request: false, showPopup: true };
    }
    case ADD_ORDER_FAILED: {
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
