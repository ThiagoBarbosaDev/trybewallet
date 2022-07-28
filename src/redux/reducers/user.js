import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { email, type }) => {
  switch (type) {
  case LOGIN:
    return { email };
  default:
    return state;
  }
};

// user: {
//   email: '', // string que armazena o email da pessoa usuária
// },

export default user;
