import { 
  FORGOT_FORM_SET_VALUE,
  FORGOT_FORM_SUBMIT_REQUEST,
  FORGOT_FORM_SUBMIT_SUCCESS,
  FORGOT_FORM_SUBMIT_FAILED
} from '../actions/forgot';

const initialState = {
  form: {
      name: '',
      password: '',
      email: '',
      token: '',
  },
  forgotRequest: false,
  forgotFailed: false,
  forgotSuccess: false,
  user: {}
}

export const forgotReducer = (state = initialState, action) => {
  switch(action.type) {
      case FORGOT_FORM_SET_VALUE: {
          const form = state.form;
          form[action.field] = action.value;
          return {
              ...state,
            form: form
          }
      }
      case FORGOT_FORM_SUBMIT_REQUEST: {
          return {
              ...state,
              forgotRequest: true,
              forgotFailed: false
          }
      }
      case FORGOT_FORM_SUBMIT_SUCCESS: {
          return {
              ...state,
              form: {
                  ...initialState.form
              },
              forgotRequest: false,
              forgotSuccess: true
          }
      }
      case FORGOT_FORM_SUBMIT_FAILED: {
          return {
              ...state,
              forgotRequest: false,
              forgotFailed: true
          }
      }
      default: {
          return state;
      }
  }
} 