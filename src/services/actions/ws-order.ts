import { TWebSocketData } from "./ws-feed";

export const WS_ORDER_CONNECTION_START: 'WS_ORDER_CONNECTION_START' = 'WS_ORDER_CONNECTION_START';
export const WS_ORDER_CONNECTION_STOP: 'WS_ORDER_CONNECTION_STOP' = 'WS_ORDER_CONNECTION_STOP';
export const WS_ORDER_CONNECTION_SUCCESS: 'WS_ORDER_CONNECTION_SUCCESS' = 'WS_ORDER_CONNECTION_SUCCESS';
export const WS_ORDER_CONNECTION_ERROR: 'WS_ORDER_CONNECTION_ERROR' = 'WS_ORDER_CONNECTION_ERROR';
export const WS_ORDER_CONNECTION_CLOSED: 'WS_ORDER_CONNECTION_CLOSED' = 'WS_ORDER_CONNECTION_CLOSED';
export const WS_ORDER_GET_MESSAGE: 'WS_ORDER_GET_MESSAGE' = 'WS_ORDER_GET_MESSAGE';

export interface IWSOrderConnectionAction {
  readonly type: typeof WS_ORDER_CONNECTION_START;
}

export interface IWSOrderStopAction {
  readonly type: typeof WS_ORDER_CONNECTION_STOP;
}

export interface IWSOrderSuccessAction {
  readonly type: typeof WS_ORDER_CONNECTION_SUCCESS;
}

export interface IWSOrderErrorAction {
  readonly type: typeof WS_ORDER_CONNECTION_ERROR;
}

export interface IWSOrderClosedAction {
  readonly type: typeof WS_ORDER_CONNECTION_CLOSED;
}

export interface IWSOrderGetMessageAction {
  readonly type: typeof WS_ORDER_GET_MESSAGE;
  payload: TWebSocketData
}

export type TWSOrderActions =
  | IWSOrderConnectionAction
  | IWSOrderStopAction
  | IWSOrderSuccessAction
  | IWSOrderErrorAction
  | IWSOrderClosedAction
  | IWSOrderGetMessageAction;