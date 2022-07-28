const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { email, type }) => {
  switch (type) {
  // case value:
  //   return email;
  default:
    return state;
  }
};

// user: {
//   email: '', // string que armazena o email da pessoa usuária
// },

export default user;
