import { REMOVE_EXPENSE } from '.';

const removeExpenseAction = (payload) => ({
  type: REMOVE_EXPENSE,
  payload,
});

export default removeExpenseAction;
