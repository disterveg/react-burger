import { addOrderRequest, getOrderRequest } from '../../utils/api';

export const ADD_ORDER_REQUEST = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILED = 'ADD_ORDER_FAILED';
export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const CLOSE_POPUP = 'CLOSE_POPUP';

export function addOrder(data) {
  return function(dispatch) {
    dispatch({
      type: ADD_ORDER_REQUEST
    });
    addOrderRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: ADD_ORDER_SUCCESS,
          order: res.order
        });
      } else {
        dispatch({
          type: ADD_ORDER_FAILED
        });
      }
    }).catch(error => {
      dispatch({
        type: ADD_ORDER_FAILED
      });
    });
  };
}

export function getOrder(numberId) {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(numberId).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.orders
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    }).catch(error => {
      dispatch({
        type: GET_ORDER_FAILED
      });
    });
  };
}