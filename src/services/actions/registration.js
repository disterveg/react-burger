import { registerRequest } from '../../utils/api';
import { setCookie } from '../../utils/cookie';

export const REGISTER_FORM_SET_VALUE = 'REGISTER_FORM_SET_VALUE';
export const REGISTER_FORM_SUBMIT_REQUEST = 'REGISTER_FORM_SUBMIT_REQUEST';
export const REGISTER_FORM_SUBMIT_SUCCESS = 'REGISTER_FORM_SUBMIT_SUCCESS';
export const REGISTER_FORM_SUBMIT_FAILED = 'REGISTER_FORM_SUBMIT_FAILED'; 

export const setFormValue = (field, value) => ({
  type: REGISTER_FORM_SET_VALUE,
  field,
  value
});

export function register(data) {
  return function(dispatch) {
    dispatch({
      type: REGISTER_FORM_SUBMIT_REQUEST
    });
    registerRequest(data).then(res => {
      if (res && res.success) {
        if (res.accessToken) {
          setCookie('accessToken', res.accessToken);
        }
        if (res.refreshToken) {
          localStorage.setItem('refreshToken', res.refreshToken);
        }
        dispatch({
          type: REGISTER_FORM_SUBMIT_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: REGISTER_FORM_SUBMIT_FAILED,
          text: res.message
        });
      }
    }).catch(error => {
      dispatch({
        type: REGISTER_FORM_SUBMIT_FAILED,
        text: error
      });
    });
  };
}