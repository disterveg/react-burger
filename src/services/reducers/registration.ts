import { 
  REGISTER_FORM_SUBMIT_REQUEST,
  REGISTER_FORM_SUBMIT_SUCCESS,
  REGISTER_FORM_SUBMIT_FAILED,
  TRegisterActions
} from '../actions/registration';
import { TUser } from '../types/data';

type TRegistrationState = {
  registrationRequest: boolean,
  registrationFailed: boolean,
  registrationErrorText: string,
  user: TUser | {}
} 

const initialState: TRegistrationState = {
  registrationRequest: false,
  registrationFailed: false,
  registrationErrorText: '',
  user: {}
}

export const registrationReducer = (
  state: TRegistrationState = initialState,
  action: TRegisterActions
) => {
  switch(action.type) {
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