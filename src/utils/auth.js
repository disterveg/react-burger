import { registerRequest, loginRequest, forgotPasswordRequest, resetPasswordRequest } from './api';

export async function registerIn(form) {
  const data = await registerRequest(form)
    .then(res => {
      if (res && res.success) {
        let authToken;
        if (res.accessToken) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        // if (authToken) {
        //   setCookie('token', authToken);
        // }
        //setUser({ ...res.user, id: res.user._id });
      } else {
        console.log('error');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export async function signIn(form) {
  const data = await loginRequest(form)
    .then(res => {
      if (res && res.success) {
        let authToken;
        if (res.accessToken) {
          authToken = res.accessToken.split('Bearer ')[1];
        }
        // if (authToken) {
        //   setCookie('token', authToken);
        // }
        //setUser({ ...res.user, id: res.user._id });
      } else {
        console.log('error');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export async function forgotPassword(form) {
  const data = await forgotPasswordRequest(form)
    .then(res => {
      if (res && res.success) {
        console.log(res);
      } else {
        console.log('error');
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export async function resetPassword(form) {
  const data = await resetPasswordRequest(form)
    .then(res => {
      if (res && res.success) {
        console.log(res);
      } else {
        console.log('error');
      }
    })
    .catch(error => {
      console.log(error);
    });
};