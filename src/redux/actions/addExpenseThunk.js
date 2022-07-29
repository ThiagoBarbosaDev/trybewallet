import { ADD_EXPENSE, ENDPOINT } from '.';

const addExpenseAction = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

const addExpenseThunk = (formData) => async (dispatch) => {
  try {
    const response = await fetch(ENDPOINT);
    const fetchData = await response.json();
    const payload = { ...formData, exchangeRates: fetchData };

    dispatch(addExpenseAction(payload));
  } catch (error) {
    console.log(error);
  }
};

export default addExpenseThunk;
