import { resetPasswordRequest } from '../../utils/api';

export const RESET_FORM_SET_VALUE = 'RESET_FORM_SET_VALUE';
export const RESET_FORM_SUBMIT_REQUEST = 'RESET_FORM_SUBMIT_REQUEST';
export const RESET_FORM_SUBMIT_SUCCESS = 'RESET_FORM_SUBMIT_SUCCESS';
export const RESET_FORM_SUBMIT_FAILED = 'RESET_FORM_SUBMIT_FAILED'; 

export const setFormValue = (field, value) => ({
  type: RESET_FORM_SET_VALUE,
  field,
  value
});

export function reset(data) {
  return function(dispatch) {
    dispatch({
      type: RESET_FORM_SUBMIT_REQUEST
    });
    resetPasswordRequest(data).then(res => {
      if (res && res.success) {
        dispatch({
          type: RESET_FORM_SUBMIT_SUCCESS,
          user: res.user
        });
      } else {
        dispatch({
          type: RESET_FORM_SUBMIT_FAILED
        });
      }
    }).catch(error => {
      dispatch({
        type: RESET_FORM_SUBMIT_FAILED
      });
    });
  };
}