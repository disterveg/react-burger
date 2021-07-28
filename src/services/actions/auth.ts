import { loginRequest, logoutRequest, getUserRequest, updateUserRequest } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';
import { AppDispatch, AppThunk, TUser } from '../types/data';

export const LOGIN_FORM_SUBMIT_REQUEST: 'LOGIN_FORM_SUBMIT_REQUEST' = 'LOGIN_FORM_SUBMIT_REQUEST';
export const LOGIN_FORM_SUBMIT_SUCCESS: 'LOGIN_FORM_SUBMIT_SUCCESS' = 'LOGIN_FORM_SUBMIT_SUCCESS';
export const LOGIN_FORM_SUBMIT_FAILED: 'LOGIN_FORM_SUBMIT_FAILED' = 'LOGIN_FORM_SUBMIT_FAILED';
export const LOGOUT_FORM_SUBMIT_REQUEST: 'LOGOUT_FORM_SUBMIT_REQUEST' = 'LOGOUT_FORM_SUBMIT_REQUEST';
export const LOGOUT_FORM_SUBMIT_SUCCESS: 'LOGOUT_FORM_SUBMIT_SUCCESS' = 'LOGOUT_FORM_SUBMIT_SUCCESS';
export const LOGOUT_FORM_SUBMIT_FAILED: 'LOGOUT_FORM_SUBMIT_FAILED' = 'LOGOUT_FORM_SUBMIT_FAILED';
export const GET_USER_DATA_REQUEST: 'GET_USER_DATA_REQUEST' = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS' = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED: 'GET_USER_DATA_FAILED' = 'GET_USER_DATA_FAILED';
export const GET_USER_DATA_SET_VALUE: 'GET_USER_DATA_SET_VALUE' = 'GET_USER_DATA_SET_VALUE';
export const UPDATE_USER_DATA_REQUEST: 'UPDATE_USER_DATA_REQUEST' = 'UPDATE_USER_DATA_REQUEST';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
export const UPDATE_USER_DATA_FAILED: 'UPDATE_USER_DATA_FAILED' = 'UPDATE_USER_DATA_FAILED';

export interface ILoginRequestAction {
  readonly type: typeof LOGIN_FORM_SUBMIT_REQUEST;
}

export interface ILoginSuccessAction {
  readonly type: typeof LOGIN_FORM_SUBMIT_SUCCESS;
  user: TUser
}

export interface ILogFailedAction {
  readonly type: typeof LOGIN_FORM_SUBMIT_FAILED;
  text: string
}

export interface ILogoutRequestAction {
  readonly type: typeof LOGOUT_FORM_SUBMIT_REQUEST;
}

export interface ILogoutSuccessAction {
  readonly type: typeof LOGOUT_FORM_SUBMIT_SUCCESS;
}

export interface ILogoutFailedAction {
  readonly type: typeof LOGOUT_FORM_SUBMIT_FAILED;
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_DATA_REQUEST;
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_DATA_SUCCESS;
  user: TUser
}

export interface IGetUserFailedAction {
  readonly type: typeof GET_USER_DATA_FAILED;
}

export interface IGetUserSetValue {
  readonly type: typeof GET_USER_DATA_SET_VALUE;
}

export interface IUpdateUserRequestAction {
  readonly type: typeof UPDATE_USER_DATA_REQUEST;
}

export interface IUpdateUserSuccessAction {
  readonly type: typeof UPDATE_USER_DATA_SUCCESS;
  user: TUser
}

export interface IUpdateUserFailedAction {
  readonly type: typeof UPDATE_USER_DATA_FAILED;
  text: string
}

export type TAuthActions =
  | ILoginRequestAction
  | ILoginSuccessAction
  | ILogFailedAction
  | ILogoutRequestAction
  | ILogoutSuccessAction
  | ILogoutFailedAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserFailedAction
  | IGetUserSetValue
  | IUpdateUserRequestAction
  | IUpdateUserSuccessAction
  | IUpdateUserFailedAction;

export const signIn: AppThunk = (data) => {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGIN_FORM_SUBMIT_REQUEST,
    });
    loginRequest(data).then((res) => {
      if (res && res.success) {
        if (res.accessToken) {
          setCookie('accessToken', res.accessToken);
        }
        if (res.refreshToken) {
          localStorage.setItem('refreshToken', res.refreshToken);
        }
        dispatch({
          type: LOGIN_FORM_SUBMIT_SUCCESS,
          user: res.user,
        });
      } else {
        dispatch({
          type: LOGIN_FORM_SUBMIT_FAILED,
          text: res.message
        });
      }
    })
    .catch(err => {
      dispatch({
        type: LOGIN_FORM_SUBMIT_FAILED,
        text: err
      });
    });
  };
}

export function signOut() {
  return function (dispatch: AppDispatch) {
    dispatch({
      type: LOGOUT_FORM_SUBMIT_REQUEST,
    });
    logoutRequest().then((res) => {
      if (res && res.success) {
        deleteCookie('accessToken');
        dispatch({
          type: LOGOUT_FORM_SUBMIT_SUCCESS,
          user: res.user,
        });
      } else {
        dispatch({
          type: LOGOUT_FORM_SUBMIT_FAILED,
        });
      }
    });
  };
}

export const loadUserData = () => function (dispatch: AppDispatch) {
  dispatch({
    type: GET_USER_DATA_REQUEST,
  });
  getUserRequest().then((res) => {
    if (res && res.success) {
      dispatch({
        type: GET_USER_DATA_SUCCESS,
        user: res.user,
      });
    } else {
      dispatch({
        type: GET_USER_DATA_FAILED,
      });
    }
  })
  .catch(err => {console.log('error')})
};

export const updateUserData: AppThunk = (data) => function (dispatch: AppDispatch) {
  dispatch({
    type: UPDATE_USER_DATA_REQUEST,
  });
  updateUserRequest(data)
    .then((res) => {
      if (res && res.success) {
        dispatch({
          type: UPDATE_USER_DATA_SUCCESS,
          user: res.user,
        });
      } else {
        dispatch({
          type: UPDATE_USER_DATA_FAILED,
          text: res.message 
        });
      }
    })
    .catch(err => {
      dispatch({
        type: UPDATE_USER_DATA_FAILED,
        text: err
      });
    });
};
