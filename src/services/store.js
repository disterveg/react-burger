import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './reducers';
import { getWssOrderUrlWithToken, wsUrl } from '../utils/api';
import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_STOP,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE
} from './actions/ws-feed';
import {
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_START,
  WS_ORDER_CONNECTION_STOP,
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_GET_MESSAGE,
  WS_ORDER_SEND_MESSAGE
} from './actions/ws-order';
import { socketMiddleware } from './middleware/socket-middleware';

const wsActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsClose: WS_FEED_CONNECTION_STOP,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
};

const ordersWsActions = {
  wsInit: WS_ORDER_CONNECTION_START,
  wsClose: WS_ORDER_CONNECTION_STOP,
  wsSendMessage: WS_ORDER_SEND_MESSAGE,
  onOpen: WS_ORDER_CONNECTION_SUCCESS,
  onClose: WS_ORDER_CONNECTION_CLOSED,
  onError: WS_ORDER_CONNECTION_ERROR,
  onMessage: WS_ORDER_GET_MESSAGE
};

const enhancer = compose(applyMiddleware(
  thunk,
  socketMiddleware(wsUrl, wsActions),
  socketMiddleware(getWssOrderUrlWithToken, ordersWsActions)
));

export const initStore = (initialState = {}) =>
  createStore(
    rootReducer,
    initialState,
    enhancer
  );
