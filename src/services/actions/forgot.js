import { forgotPasswordRequest } from '../../utils/api';

export const FORGOT_FORM_SET_VALUE = 'FORGOT_FORM_SET_VALUE';
export const FORGOT_FORM_SUBMIT_REQUEST = 'FORGOT_FORM_SUBMIT_REQUEST';
export const FORGOT_FORM_SUBMIT_SUCCESS = 'FORGOT_FORM_SUBMIT_SUCCESS';
export const FORGOT_FORM_SUBMIT_FAILED = 'FORGOT_FORM_SUBMIT_FAILED'; 

export const setFormValue = (field, value) => ({
  type: FORGOT_FORM_SET_VALUE,
  field,
  value
});

export function forgot(data) {
  return function(dispatch) {
    dispatch({
      type: FORGOT_FORM_SUBMIT_REQUEST
    });
    forgotPasswordRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: FORGOT_FORM_SUBMIT_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: FORGOT_FORM_SUBMIT_FAILED
        });
      }
    }).catch(error => {
      dispatch({
        type: FORGOT_FORM_SUBMIT_FAILED
      });
    });
  };
}