// Coloque aqui suas actions
export const LOGIN_FORM = 'LOGIN_FORM ';
export const WALLET_FORM = 'WALLET_FORM';
export const INICIAL_REQ = 'INICIAL_REQ';
export const GET_API = 'GET_API';

export const userForm = (payload) => ({
  type: LOGIN_FORM,
  payload,
});

export const inicialRequest = () => ({ type: INICIAL_REQ });

export const responseApi = (payload) => ({
  type: GET_API,
  payload,
});

export const getRequest = () => async (dispatch) => {
  try {
    dispatch(inicialRequest());
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const result = Object.keys(data).filter((coin) => coin !== 'USDT');
    dispatch(responseApi(result));
  } catch (error) {
    throw new Error(error);
  }
};
