// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN_FORM } from '../actions';

const INITIAL_STATE = ({
  user: {
    email: '',
  },
});

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case LOGIN_FORM:
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
