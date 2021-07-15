import { registerRequest } from '../../utils/api';
import { setCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk, TUser } from '../types/data';

export const REGISTER_FORM_SUBMIT_REQUEST: 'REGISTER_FORM_SUBMIT_REQUEST' = 'REGISTER_FORM_SUBMIT_REQUEST';
export const REGISTER_FORM_SUBMIT_SUCCESS: 'REGISTER_FORM_SUBMIT_SUCCESS' = 'REGISTER_FORM_SUBMIT_SUCCESS';
export const REGISTER_FORM_SUBMIT_FAILED: 'REGISTER_FORM_SUBMIT_FAILED' = 'REGISTER_FORM_SUBMIT_FAILED';

export interface IRegisterRequestAction {
  readonly type: typeof REGISTER_FORM_SUBMIT_REQUEST;
}

export interface IRegisterSubmitAction {
  readonly type: typeof REGISTER_FORM_SUBMIT_SUCCESS;
  user: TUser
}

export interface IRegisterFailedAction {
  readonly type: typeof REGISTER_FORM_SUBMIT_FAILED;
  text: string
}

export type TRegisterActions =
  | IRegisterRequestAction
  | IRegisterSubmitAction
  | IRegisterFailedAction;

export const register: AppThunk = (data) => {
  return function(dispatch: AppDispatch) {
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