import { loginRequest, logoutRequest, getUserRequest, updateUserRequest } from '../../utils/api';
import { setCookie, deleteCookie } from '../../utils/cookie';

export const LOGIN_FORM_SET_VALUE = 'LOGIN_FORM_SET_VALUE';
export const LOGIN_FORM_SUBMIT_REQUEST = 'LOGIN_FORM_SUBMIT_REQUEST';
export const LOGIN_FORM_SUBMIT_SUCCESS = 'LOGIN_FORM_SUBMIT_SUCCESS';
export const LOGIN_FORM_SUBMIT_FAILED = 'LOGIN_FORM_SUBMIT_FAILED';
export const LOGOUT_FORM_SUBMIT_REQUEST = 'LOGOUT_FORM_SUBMIT_REQUEST';
export const LOGOUT_FORM_SUBMIT_SUCCESS = 'LOGOUT_FORM_SUBMIT_SUCCESS';
export const LOGOUT_FORM_SUBMIT_FAILED = 'LOGOUT_FORM_SUBMIT_FAILED';
export const GET_USER_DATA_REQUEST = 'GET_USER_DATA_REQUEST';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILED = 'GET_USER_DATA_FAILED';
export const GET_USER_DATA_SET_VALUE = 'GET_USER_DATA_SET_VALUE';

export const setFormValue = (field, value, type = LOGIN_FORM_SET_VALUE) => ({
  type: type,
  field,
  value,
});

export function signIn(data) {
  return function (dispatch) {
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
        });
      }
    });
  };
}

export function signOut() {
  return function (dispatch) {
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

export const loadUserData = () => function (dispatch) {
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

export const updateUserData = (data) => function (dispatch) {
  updateUserRequest(data)
    .then((res) => {
      dispatch({
        type: GET_USER_DATA_SUCCESS,
        user: res.user,
      });
    });
};
