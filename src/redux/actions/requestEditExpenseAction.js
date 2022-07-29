import { REQUEST_EDIT_EXPENSE } from '.';

const requestEditExpenseAction = (payload) => ({
  type: REQUEST_EDIT_EXPENSE,
  payload,
});

export default requestEditExpenseAction;
