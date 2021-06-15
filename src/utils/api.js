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
  const json = await response.json();
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
