import { getCookie, setCookie } from '../utils/cookie';

export const getIngredientsRequest = async () => {
  const url = 'https://norma.nomoreparties.space/api/ingredients';
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

export const addOrderRequest = async data => {
  const url = 'https://norma.nomoreparties.space/api/orders';
  const response = await fetch(url, {
    method: 'POST', 
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const json = await response.json();
  return json;
};

export const loginRequest = async form => {
  const url = 'https://norma.nomoreparties.space/api/auth/login';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(`Ошибка ${response.status}`);
};

export const registerRequest = async form => {
  const url = 'https://norma.nomoreparties.space/api/auth/register';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
  const json = await response.json();
  return json;
};

export const forgotPasswordRequest = async form => {
  const url = 'https://norma.nomoreparties.space/api/password-reset';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
  const json = await response.json();
  return json;
};

export const resetPasswordRequest = async form => {
  const url = 'https://norma.nomoreparties.space/api/password-reset/reset';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
  const json = await response.json();
  return json;
};

export const logoutRequest = async () => {
  const url = 'https://norma.nomoreparties.space/api/auth/logout';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
  const json = await response.json();
  return json;
};

export const getUserRequest = async () => {
  const url = 'https://norma.nomoreparties.space/api/auth/user';
  return await fetchWithRefresh(url, {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });
};

export const updateUserRequest = async (form) => {
  const url = 'https://norma.nomoreparties.space/api/auth/user';
  return await fetchWithRefresh(url, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getCookie('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};

const checkResponse = res => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
}

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse(res);
  } catch(err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshTokenRequest();
      if (refreshData.accessToken) {
        setCookie('accessToken', refreshData.accessToken);
      }
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await checkResponse(res);
    } else {
      Promise.reject(err);
    }
  }
}

export const refreshTokenRequest = async () => {
  const url = 'https://norma.nomoreparties.space/api/auth/token';
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
  const json = await response.json();
  return json;
};
