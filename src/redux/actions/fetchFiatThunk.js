import { FETCH_CURRENCIES_SUCCESS } from '.';

const ENDPOINT = 'https://economia.awesomeapi.com.br/json/all';

const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

const fetchCurrenciesThunk = () => async (dispatch) => {
  try {
    const response = await fetch(ENDPOINT);
    const data = await response.json();
    const { USDT, ...dataWithoutUSDT } = data;
    const arrayFromData = Object.values(dataWithoutUSDT);
    const fiatCodeData = arrayFromData.map((fiat) => fiat.code);
    dispatch(fetchCurrenciesSuccess(fiatCodeData));
  } catch (error) {
    console.log(error);
  }
};

export default fetchCurrenciesThunk;
