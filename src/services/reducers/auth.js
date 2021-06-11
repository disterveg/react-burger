import { 
  LOGIN_FORM_SET_VALUE,
  LOGIN_FORM_SUBMIT_REQUEST,
  LOGIN_FORM_SUBMIT_SUCCESS,
  LOGIN_FORM_SUBMIT_FAILED
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
  user: {}
}

export const authReducer = (state = initialState, action) => {
  switch(action.type) {
      case LOGIN_FORM_SET_VALUE: {
          const form = state.form;
          form[action.field] = action.value;
          return {
              ...state,
            form: form
          }
      }
      case LOGIN_FORM_SUBMIT_REQUEST: {
          return {
              ...state,
              loginRequest: true,
              loginFailed: false
          }
      }
      case LOGIN_FORM_SUBMIT_SUCCESS: {
          return {
              ...state,
              form: {
                  ...initialState.form
              },
              loginRequest: false
          }
      }
      case LOGIN_FORM_SUBMIT_FAILED: {
          return {
              ...state,
              loginRequest: false,
              loginFailed: true
          }
      }
      default: {
          return state;
      }
  }
} 