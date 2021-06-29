import { 
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_SUBMIT_REQUEST,
  REGISTER_FORM_SUBMIT_SUCCESS,
  REGISTER_FORM_SUBMIT_FAILED
} from '../actions/registration';

const initialState = {
  form: {
      name: '',
      password: '',
      email: '',
      token: '',
  },
  registrationRequest: false,
  registrationFailed: false,
  registrationErrorText: '',
  user: {}
}

export const registrationReducer = (state = initialState, action) => {
  switch(action.type) {
      case REGISTER_FORM_SET_VALUE: {
          const form = state.form;
          form[action.field] = action.value;
          return {
              ...state,
            form: form
          }
      }
      case REGISTER_FORM_SUBMIT_REQUEST: {
          return {
              ...state,
              registrationRequest: true,
              registrationFailed: false
          }
      }
      case REGISTER_FORM_SUBMIT_SUCCESS: {
          return {
              ...state,
              form: {
                  ...initialState.form
              },
              user: action.user,
              registrationRequest: false
          }
      }
      case REGISTER_FORM_SUBMIT_FAILED: {
          return {
              ...state,
              registrationRequest: false,
              registrationFailed: true,
              registrationErrorText: action.text
          }
      }
      default: {
          return state;
      }
  }
} 