import { TWSAction } from "../types/data";
import { MiddlewareAPI, AnyAction } from 'redux';

export const socketMiddleware = (wsUrl: string | Function, wsActions: TWSAction) => {
  return (store: MiddlewareAPI) => {
    let socket: WebSocket | null = null;

    return (next: (i: AnyAction) => void) => (action: AnyAction) => {
      const { dispatch } = store;
      const { type } = action;
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions;
      if (type === wsInit) {
        socket = new WebSocket(typeof wsUrl === 'function' ? wsUrl() : wsUrl);
      }
      if (wsClose && type === wsClose && socket) {
        socket.close();
      }
      if (socket) {
        socket.onopen = event => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData;

          dispatch({ type: onMessage, payload: restParsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };
      }

      next(action);
    };
  };
};
