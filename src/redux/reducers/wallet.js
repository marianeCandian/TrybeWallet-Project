// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { INICIAL_REQ, GET_API, UPDATE_WALLET } from '../actions';

const INITIAL_STATE = ({
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  total: 0,
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INICIAL_REQ:
    return {
      ...state,
    };
  case GET_API:
    return {
      ...state,
      currencies: action.payload,
    };
  case UPDATE_WALLET:
    return {
      ...state,
      expenses: [...state.expenses, { ...action.payload }],
      total: state.total + (
        Number(action.payload.exchangeRates[action.payload.currency].ask)
        * Number(action.payload.value)),
    };
  default:
    return state;
  }
};

export default wallet;
