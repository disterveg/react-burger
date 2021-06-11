import { loginRequest } from '../../utils/api';

export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';
export const LOGIN_FORM_SUBMIT_REQUEST = 'LOGIN_FORM_SUBMIT_REQUEST';
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM_SUBMIT_SUCCESS';
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED'; 

export const setFormValue = (field, value) => ({
  type: LOGIN_FORM_SET_VALUE,
  field,
  value
});

export function signIn(data) {
  return function(dispatch) {
    dispatch({
      type: LOGIN_FORM_SUBMIT_REQUEST
    });
    loginRequest(data).then(res => {
      if (res && res.success) {
        let authToken;
        if (res.accessToken) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        // if (authToken) {
        //   setCookie('token', authToken);
        // }
        dispatch({
          type: LOGIN_FORM_SUBMIT_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: LOGIN_FORM_SUBMIT_FAILED
        });
      }
    }).catch(error => {
      dispatch({
        type: LOGIN_FORM_SUBMIT_FAILED
      });
    });
  };
}