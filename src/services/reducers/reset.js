import { 
  RESET_FORM_SET_VALUE,
  RESET_FORM_SUBMIT_REQUEST,
  RESET_FORM_SUBMIT_SUCCESS,
  RESET_FORM_SUBMIT_FAILED
} from '../actions/reset';

const initialState = {
  form: {
      name: '',
      password: '',
      email: '',
      token: '',
  },
  resetRequest: false,
  resetSuccess: false,
  resetFailed: false,
  user: {}
}

export const resetReducer = (state = initialState, action) => {
  switch(action.type) {
      case RESET_FORM_SET_VALUE: {
          const form = state.form;
          form[action.field] = action.value;
          return {
              ...state,
            form: form
          }
      }
      case RESET_FORM_SUBMIT_REQUEST: {
          return {
              ...state,
              resetRequest: true,
              resetFailed: false
          }
      }
      case RESET_FORM_SUBMIT_SUCCESS: {
          return {
              ...state,
              form: {
                  ...initialState.form
              },
              resetSuccess: true,
              resetRequest: false
          }
      }
      case RESET_FORM_SUBMIT_FAILED: {
          return {
              ...state,
              resetRequest: false,
              resetFailed: true
          }
      }
      default: {
          return state;
      }
  }
} 