export const GET_ORDERS_REQUEST: 'GET_ORDERS_REQUEST' = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS' = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILED: 'GET_ORDERS_FAILED' = 'GET_ORDERS_FAILED';

export interface IOrdersRequestAction {
  readonly type: typeof GET_ORDERS_REQUEST;
}

export interface IOrdersSuccessAction {
  readonly type: typeof GET_ORDERS_SUCCESS;
}

export interface IOrdersFailedAction {
  readonly type: typeof GET_ORDERS_FAILED;
}

export type TOrdersActions =
  | IOrdersRequestAction
  | IOrdersSuccessAction
  | IOrdersFailedAction;