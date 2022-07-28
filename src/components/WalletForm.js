import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesThunk from '../redux/actions/fetchFiatThunk';
import Combobox from './ComboBox';
import Input from './Input';

const EXPENDITURE_TAGS = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
const PAYMENT_OPTIONS = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];

class WalletForm extends Component {
  constructor() {
    super();
    this.state = {
      valueInput: '0',
      descriptionInput: '',
      currencyInput: 'USD',
      methodInput: 'Dinheiro',
      tagInput: 'Alimentação',
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

  render() {
    const { valueInput, descriptionInput, tagInput, methodInput,
      currencyInput } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        WalletForm
        <Input
          name="valueInput"
          type="number"
          value={ valueInput }
          data-testid="value-input"
          onChange={ (event) => this.handleInput(event) }
          label="Valor:"
        />
        <Input
          name="descriptionInput"
          type="text"
          value={ descriptionInput }
          data-testid="description-input"
          onChange={ (event) => this.handleInput(event) }
          label="description:"
        />
        <Combobox
          name="currencyInput"
          value={ currencyInput }
          dataTestId="currency-input"
          data={ currencies }
          onChange={ (event) => this.handleInput(event) }
        />
        <Combobox
          name="tagInput"
          value={ tagInput }
          dataTestId="tag-input"
          data={ EXPENDITURE_TAGS }
          onChange={ (event) => this.handleInput(event) }
        />
        <Combobox
          name="methodInput"
          value={ methodInput }
          dataTestId="method-input"
          data={ PAYMENT_OPTIONS }
          onChange={ (event) => this.handleInput(event) }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies } }) => ({
  currencies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({}),
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
