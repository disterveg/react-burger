import { authReducer } from './auth';
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
  GET_USER_DATA_SET_VALUE,
} from '../actions/auth';

const initState = {
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
  user: {},
};

describe('authReducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initState);
  });

  it('should handle LOGIN_FORM_SET_VALUE', () => {
    expect(
      authReducer(initState, {
        type: LOGIN_FORM_SET_VALUE,
        field: 'email',
        value: 'mail@mail.ru',
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: 'mail@mail.ru',
        },
      },
    );

    expect(
      authReducer(initState, {
        type: LOGIN_FORM_SET_VALUE,
        field: 'password',
        value: 'qwerty',
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          password: 'qwerty',
        },
      },
    );
  });

  it('should handle LOGIN_FORM_SUBMIT_REQUEST', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
      }, {
        type: LOGIN_FORM_SUBMIT_REQUEST,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
        loginRequest: true,
      },
    );
  });

  it('should handle LOGIN_FORM_SUBMIT_SUCCESS', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
        loginRequest: true,
      }, {
        type: LOGIN_FORM_SUBMIT_SUCCESS,
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
          password: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        loginRequest: false,
      },
    );
  });

  it('should handle LOGIN_FORM_SUBMIT_FAILED', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
      }, {
        type: LOGIN_FORM_SUBMIT_FAILED,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
        loginFailed: true,
      },
    );
  });

  it('should handle LOGOUT_FORM_SUBMIT_REQUEST', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
      }, {
        type: LOGOUT_FORM_SUBMIT_REQUEST,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        logoutRequest: true,
      },
    );
  });

  it('should handle LOGOUT_FORM_SUBMIT_SUCCESS', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        logoutRequest: true,
      }, {
        type: LOGOUT_FORM_SUBMIT_SUCCESS,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
          password: '',
        },
        logoutRequest: false,
      },
    );
  });

  it('should handle LOGOUT_FORM_SUBMIT_FAILED', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
      }, {
        type: LOGOUT_FORM_SUBMIT_FAILED,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        logoutRequest: false,
        logoutFailed: true,
      },
    );
  });

  it('should handle GET_USER_DATA_SET_VALUE', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
      }, {
        type: GET_USER_DATA_SET_VALUE,
        field: 'name',
        value: 'Дима',
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
          name: '',
        },
        user: {
          name: 'Дима',
          email: 'mail@mail.ru',
        },
      },
    );
  });

  it('should handle GET_USER_DATA_REQUEST', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
      }, {
        type: GET_USER_DATA_REQUEST,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        getUserRequest: true,
      },
    );
  });

  it('should handle GET_USER_DATA_SUCCESS', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        getUserRequest: true,
      }, {
        type: GET_USER_DATA_SUCCESS,
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        getUserRequest: false,
        getUserLoaded: true,
      },
    );
  });

  it('should handle GET_USER_DATA_FAILED', () => {
    expect(
      authReducer({
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
      }, {
        type: GET_USER_DATA_FAILED,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          email: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        getUserRequest: false,
        getUserFailed: true,
      },
    );
  });
});
