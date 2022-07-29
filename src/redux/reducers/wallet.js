// Esse reducer será responsável por tratar as informações da pessoa usuária

import { ADD_EXPENSE, FETCH_CURRENCIES_SUCCESS, REMOVE_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  expenseId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, { id: state.expenseId, ...action.payload }],
      expenseId: state.expenseId + 1,
    };
  case REMOVE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter(({ id }) => id !== action.payload),
    };
  default:
    return state;
  }
};

//   wallet: {
//     currencies: [], // array de string
//     expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
//     editor: false, // valor booleano que indica de uma despesa está sendo editada
//     idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
//   }

export default wallet;
