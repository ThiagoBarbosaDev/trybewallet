import { SEND_EDIT_EXPENSE } from '.';

const sendEditExpenseAction = (payload) => ({
  type: SEND_EDIT_EXPENSE,
  payload,
});

const sendEditExpenseThunk = (payload) => (dispatch, getState) => {
  const { expenses, idToEdit } = getState().wallet;
  const appendedData = expenses
    .map((expense) => (expense.id === idToEdit ? { ...expense, ...payload } : expense));
  dispatch(sendEditExpenseAction(appendedData));
};

export default sendEditExpenseThunk;
