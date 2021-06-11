import { getOrdersRequest } from '../../utils/fakeApi';

export const GET_ORDERS_REQUEST = 'GET_ORDERS_REQUEST';
export const GET_ORDERS_SUCCESS = 'GET_ORDERS_SUCCESS';
export const GET_ORDERS_FAILED = 'GET_ORDERS_FAILED';

export function getIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_ORDERS_REQUEST
    });
    getOrdersRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDERS_SUCCESS,
          orders: res.data
        });
      } else {
        dispatch({
          type: GET_ORDERS_FAILED
        });
      }
    }).catch(error => {
      dispatch({
        type: GET_ORDERS_FAILED
      });
    });
  };
}