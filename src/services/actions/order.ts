import { addOrderRequest, getOrderRequest } from '../../utils/api';
import { AppDispatch, AppThunk, IOrder } from '../types/data';

export const ADD_ORDER_REQUEST: 'ADD_ORDER_REQUEST' = 'ADD_ORDER_REQUEST';
export const ADD_ORDER_SUCCESS: 'ADD_ORDER_SUCCESS' = 'ADD_ORDER_SUCCESS';
export const ADD_ORDER_FAILED: 'ADD_ORDER_FAILED' = 'ADD_ORDER_FAILED';
export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';
export const CLOSE_POPUP: 'CLOSE_POPUP' = 'CLOSE_POPUP';

export interface IAddOrderRequestAction {
  readonly type: typeof ADD_ORDER_REQUEST;
}

export interface IAddOrderSuccessAction {
  readonly type: typeof ADD_ORDER_SUCCESS;
  order: IOrder
}

export interface IAddOrderFailedAction {
  readonly type: typeof ADD_ORDER_FAILED;
}

export interface IGetRequestAction {
  readonly type: typeof GET_ORDER_REQUEST;
}

export interface IGetSuccessAction {
  readonly type: typeof GET_ORDER_SUCCESS;
  orders: IOrder[]
}

export interface IGetFailedAction {
  readonly type: typeof GET_ORDER_FAILED;
}

export interface IClosePopup {
  readonly type: typeof CLOSE_POPUP;
}

export type TOrderActions =
  | IAddOrderRequestAction
  | IAddOrderSuccessAction
  | IAddOrderFailedAction
  | IGetRequestAction
  | IGetSuccessAction
  | IGetFailedAction
  | IClosePopup;

export const addOrder: AppThunk = (data) => {
  return function(dispatch: AppDispatch) {
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

export const getOrder: AppThunk = (numberId) => {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(numberId).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          orders: res.orders
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