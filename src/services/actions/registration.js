import { registerRequest } from '../../utils/api';

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
        let authToken;
        if (res.accessToken) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        // if (authToken) {
        //   setCookie('token', authToken);
        // }
        dispatch({
          type: REGISTER_FORM_SUBMIT_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: REGISTER_FORM_SUBMIT_FAILED
        });
      }
    }).catch(error => {
      dispatch({
        type: REGISTER_FORM_SUBMIT_FAILED
      });
    });
  };
}