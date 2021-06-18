import { 
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUBMIT_REQUEST,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED,
  LOGOUT_FORM_SUBMIT_REQUEST,
  LOGOUT_FORM_SUBMIT_SUCCESS,
  LOGOUT_FORM_SUBMIT_FAILED,
  GET_USER_DATA_REQUEST,
  GET_USER_DATA_SUCCESS,
  GET_USER_DATA_FAILED,
  GET_USER_DATA_SET_VALUE
} from '../actions/auth';

const initialState = {
  form: {
    name: '',
    password: '',
    email: '',
    token: '',
  },
  loginRequest: false,
  loginFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  getUserLoaded: false,
  user: {}
}

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case LOGIN_FORM_SET_VALUE: {
        const { form } = state;
        form[action.field] = action.value;
        return {
          ...state,
          form,
        };
      }
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
          form: {
            ...initialState.form,
          },
          user: action.user,
          loginRequest: false,
        };
      }
      case LOGIN_FORM_SUBMIT_FAILED: {
        return {
          ...state,
          loginRequest: false,
          loginFailed: true,
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
          form: {
            name: '',
            password: '',
            email: '',
            token: '',
          },
          user: {},
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
      case GET_USER_DATA_SET_VALUE: {
        const { user } = state;
        user[action.field] = action.value;
        return {
          ...state,
          user,
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