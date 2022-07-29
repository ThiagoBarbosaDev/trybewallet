// Esse reducer será responsável por tratar as informações da pessoa usuária

import { ADD_EXPENSE, FETCH_CURRENCIES_SUCCESS, REMOVE_EXPENSE,
  REQUEST_EDIT_EXPENSE, SEND_EDIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: null,
  expenseId: 0,
  isEditting: false,
  dataToEdit: {},
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
  case REQUEST_EDIT_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses],
      idToEdit: action.payload,
      isEditting: true,
      dataToEdit: [...state.expenses].find(({ id }) => id === action.payload),
    };
  case SEND_EDIT_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
      idToEdit: null,
      isEditting: false,
    };
  default:
    return state;
  }
};

export default wallet;
