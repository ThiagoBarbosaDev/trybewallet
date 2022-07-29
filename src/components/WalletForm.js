import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesThunk from '../redux/actions/fetchFiatThunk';
import Combobox from './ComboBox';
import Input from './Input';
import Button from './Button';
import addExpenseThunk from '../redux/actions/addExpenseThunk';

const EXPENDITURE_TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const PAYMENT_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      ...INITIAL_STATE,
    };
  }

  componentDidMount() {
    this.updateCurrencyInput();
  }

  updateCurrencyInput = async () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  };

  handleInput = ({ target: { value, name } }) => this.setState({ [name]: value });

  handleClick = () => {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { value, description, tag, method,
      currency } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <Input
          name="value"
          type="number"
          value={ value }
          data-testid="value-input"
          onChange={ (event) => this.handleInput(event) }
          label="Valor:"
        />
        <Input
          name="description"
          type="text"
          value={ description }
          data-testid="description-input"
          onChange={ (event) => this.handleInput(event) }
          label="description:"
        />
        <Combobox
          name="currency"
          value={ currency }
          dataTestId="currency-input"
          data={ currencies }
          onChange={ (event) => this.handleInput(event) }
        />
        <Combobox
          name="tag"
          value={ tag }
          dataTestId="tag-input"
          data={ EXPENDITURE_TAGS }
          onChange={ (event) => this.handleInput(event) }
        />
        <Combobox
          name="method"
          value={ method }
          dataTestId="method-input"
          data={ PAYMENT_OPTIONS }
          onChange={ (event) => this.handleInput(event) }
        />
        <Button
          onClick={ () => this.handleClick() }
        >
          Adicionar Despesa
        </Button>
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
  addExpense: (payload) => dispatch(addExpenseThunk(payload)),
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({}),
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
