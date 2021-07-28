import { 
  LOGIN_FORM_SUBMIT_REQUEST,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED,
  LOGOUT_FORM_SUBMIT_REQUEST,
  LOGOUT_FORM_SUBMIT_SUCCESS,
  LOGOUT_FORM_SUBMIT_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  UPDATE_USER_DATA_REQUEST,
  UPDATE_USER_DATA_SUCCESS,
  UPDATE_USER_DATA_FAILED,
  TAuthActions
} from '../actions/auth';
import { TUser } from '../types/data';

type TAuthState = {
  loginRequest: boolean,
  loginFailed: boolean,
  loginErrorText: string,
  logoutRequest: boolean,
  logoutFailed: boolean,
  getUserRequest: boolean,
  getUserFailed: boolean,
  getUserLoaded: boolean,
  updateUserRequest: boolean,
  updateUserFailed: boolean,
  updateUserSuccess: boolean,
  user: TUser | null
} 

const initialState: TAuthState = {
  loginRequest: false,
  loginFailed: false,
  loginErrorText: '',
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  getUserLoaded: false,
  updateUserRequest: false,
  updateUserFailed: false,
  updateUserSuccess: false,
  user: null
}

export const authReducer = (
  state: TAuthState = initialState,
  action: TAuthActions
): TAuthState => {
    switch (action.type) {
      case LOGIN_FORM_SUBMIT_REQUEST: {
        return {
          ...state,
          loginRequest: true,
          loginFailed: false,
        };
      }
      case LOGIN_FORM_SUBMIT_SUCCESS: {
        return {
          ...state,
          user: action.user,
          loginRequest: false,
        };
      }
      case LOGIN_FORM_SUBMIT_FAILED: {
        return {
          ...state,
          loginRequest: false,
          loginFailed: true,
          loginErrorText: action.text
        };
      }
      case LOGOUT_FORM_SUBMIT_REQUEST: {
        return {
          ...state,
          logoutRequest: true,
          logoutFailed: false,
        };
      }
      case LOGOUT_FORM_SUBMIT_SUCCESS: {
        return {
          ...state,
          user: null,
          logoutRequest: false,
        };
      }
      case LOGOUT_FORM_SUBMIT_FAILED: {
        return {
          ...state,
          logoutRequest: false,
          logoutFailed: true,
        };
      }
      case UPDATE_USER_DATA_REQUEST: {
        return {
          ...state,
          updateUserRequest: true,
          updateUserFailed: false,
        };
      }
      case UPDATE_USER_DATA_SUCCESS: {
        return {
          ...state,
          user: action.user,
          updateUserRequest: false,
          updateUserSuccess: true
        };
      }
      case UPDATE_USER_DATA_FAILED: {
        return {
          ...state,
          updateUserRequest: false,
          updateUserFailed: true,
          //updateErrorText: action.text
        };
      }
      case GET_USER_DATA_REQUEST: {
        return {
          ...state,
          getUserRequest: true,
          getUserFailed: false,
        };
      }
      case GET_USER_DATA_SUCCESS: {
        return {
          ...state,
          user: action.user,
          getUserRequest: false,
          getUserLoaded: true,
        };
      }
      case GET_USER_DATA_FAILED: {
        return {
          ...state,
          getUserRequest: false,
          getUserFailed: true,
        };
      }
      default: {
        return state;
      }
    }
};  