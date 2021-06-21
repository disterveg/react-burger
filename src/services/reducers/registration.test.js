import { registrationReducer } from './registration';
import {
  REGISTER_FORM_SET_VALUE,
  REGISTER_FORM_SUBMIT_REQUEST,
  REGISTER_FORM_SUBMIT_SUCCESS,
  REGISTER_FORM_SUBMIT_FAILED,
} from '../actions/registration';

const initState = {
  form: {
    name: '',
    password: '',
    email: '',
    token: '',
  },
  registrationRequest: false,
  registrationFailed: false,
  user: {},
};

describe('registrationReducer', () => {
  it('should return the initial state', () => {
    expect(registrationReducer(undefined, {})).toEqual(initState);
  });

  it('should handle LOGIN_FORM_SET_VALUE', () => {
    expect(
      registrationReducer(initState, {
        type: REGISTER_FORM_SET_VALUE,
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
      registrationReducer(initState, {
        type: REGISTER_FORM_SET_VALUE,
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

    expect(
      registrationReducer(initState, {
        type: REGISTER_FORM_SET_VALUE,
        field: 'name',
        value: 'Дмитрий',
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          name: 'Дмитрий',
        },
      },
    );
  });


  it('should handle REGISTER_FORM_SUBMIT_REQUEST', () => {
    expect(
      registrationReducer({
        ...initState,
        form: {
          ...initState.form,
          name: 'Дмитрий',
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
      }, {
        type: REGISTER_FORM_SUBMIT_REQUEST,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          name: 'Дмитрий',
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
        registrationRequest: true,
      },
    );
  });

  it('should handle REGISTER_FORM_SUBMIT_SUCCESS', () => {
    expect(
      registrationReducer({
        ...initState,
        form: {
          ...initState.form,
          name: 'Дмитрий',
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
        registrationRequest: true,
      }, {
        type: REGISTER_FORM_SUBMIT_SUCCESS,
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
          name: '',
          email: '',
          password: '',
        },
        user: {
          name: 'Дмитрий',
          email: 'mail@mail.ru',
        },
        registrationFailed: false,
      },
    );
  });

  it('should handle REGISTER_FORM_SUBMIT_FAILED', () => {
    expect(
      registrationReducer({
        ...initState,
        form: {
          ...initState.form,
          name: 'Дмитрий',
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
      }, {
        type: REGISTER_FORM_SUBMIT_FAILED,
      }),
    ).toEqual(
      {
        ...initState,
        form: {
          ...initState.form,
          name: 'Дмитрий',
          email: 'mail@mail.ru',
          password: 'qwerty',
        },
        registrationFailed: true,
      },
    );
  });
});
