import { IOrder } from "../types/data";

export const WS_FEED_CONNECTION_START: 'WS_FEED_CONNECTION_START' = 'WS_FEED_CONNECTION_START';
export const WS_FEED_CONNECTION_STOP: 'WS_FEED_CONNECTION_STOP' = 'WS_FEED_CONNECTION_STOP';
export const WS_FEED_CONNECTION_SUCCESS: 'WS_FEED_CONNECTION_SUCCESS' = 'WS_FEED_CONNECTION_SUCCESS';
export const WS_FEED_CONNECTION_ERROR: 'WS_FEED_CONNECTION_ERROR' = 'WS_FEED_CONNECTION_ERROR';
export const WS_FEED_CONNECTION_CLOSED: 'WS_FEED_CONNECTION_CLOSED' = 'WS_FEED_CONNECTION_CLOSED';
export const WS_FEED_GET_MESSAGE: 'WS_FEED_GET_MESSAGE' = 'WS_FEED_GET_MESSAGE';
export const WS_FEED_SEND_MESSAGE: 'WS_FEED_SEND_MESSAGE' = 'WS_FEED_SEND_MESSAGE';
export const WS_FEED_USER_NAME_UPDATE: 'WS_FEED_USER_NAME_UPDATE' = 'WS_FEED_USER_NAME_UPDATE';

export type TWebSocketData = {
  orders: IOrder;
  totalToday: number;
  total: number;
};

export interface IWSFeedConnectionAction {
    readonly type: typeof WS_FEED_CONNECTION_START;
  }
  
  export interface IWSFeedStopAction {
    readonly type: typeof WS_FEED_CONNECTION_STOP;
  }
  
  export interface IWSFeedSuccessAction {
    readonly type: typeof WS_FEED_CONNECTION_SUCCESS;
  }
  
  export interface IWSFeedErrorAction {
    readonly type: typeof WS_FEED_CONNECTION_ERROR;
  }
  
  export interface IWSFeedClosedAction {
    readonly type: typeof WS_FEED_CONNECTION_CLOSED;
  }
  
  export interface IWSFeedGetMessageAction {
    readonly type: typeof WS_FEED_GET_MESSAGE;
    payload: TWebSocketData
  }
  
  export type TWSFeedActions =
    | IWSFeedConnectionAction
    | IWSFeedStopAction
    | IWSFeedSuccessAction
    | IWSFeedErrorAction
    | IWSFeedClosedAction
    | IWSFeedGetMessageAction;