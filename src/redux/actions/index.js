// Coloque aqui suas actions
export const LOGIN_FORM = 'LOGIN_FORM ';
export const WALLET_FORM = 'WALLET_FORM';

export const userForm = (payload) => ({
  type: LOGIN_FORM,
  payload,
});

export const profissionalForm = (payload) => ({
  type: WALLET_FORM,
  payload,
});
