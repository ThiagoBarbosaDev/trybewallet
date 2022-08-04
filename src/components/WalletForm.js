import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import fetchCurrenciesThunk from '../redux/actions/fetchFiatThunk';
import Combobox from './ComboBox';
import Input from './Input';
import Button from './Button';
import addExpenseThunk from '../redux/actions/addExpenseThunk';
import sendEditExpenseThunk from '../redux/actions/sendEditExpenseAction';
import styles from './WalletForm.module.scss';

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

  componentDidUpdate() {

  }

  // updateState = () => {
  //   const { dataToEdit: { value, currency, description, method, tag} } = this.props;
  //   setState({});
  // }

  updateCurrencyInput = async () => {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  };

  handleInput = ({ target: { value, name } }) => this.setState({ [name]: value });

  handleAddExpense = () => {
    const { addExpense } = this.props;
    addExpense(this.state);
    this.setState({ ...INITIAL_STATE });
  }

  render() {
    const { value, description, tag, method,
      currency } = this.state;
    const { currencies, idToEdit, sendEditData, isEditting } = this.props;
    return (
      <div className="container">
        <Input
          placeholder="Valor"
          className={ `form-control ${styles['text-input']}` }
          name="value"
          type="number"
          value={ value }
          data-testid="value-input"
          onChange={ (event) => this.handleInput(event) }
          label="Valor:"
        />
        <Input
          placeholder="Descrição"
          className={ `form-control ${styles['text-input']}` }
          name="description"
          type="text"
          value={ description }
          data-testid="description-input"
          onChange={ (event) => this.handleInput(event) }
          label="description:"
        />
        <Combobox
          className="form-select form-select-lg mb-3"
          name="currency"
          value={ currency }
          dataTestId="currency-input"
          data={ currencies }
          onChange={ (event) => this.handleInput(event) }
        />
        <Combobox
          className="form-select form-select-lg mb-3"
          name="tag"
          value={ tag }
          dataTestId="tag-input"
          data={ EXPENDITURE_TAGS }
          onChange={ (event) => this.handleInput(event) }
        />
        <Combobox
          className="form-select form-select-lg mb-3"
          name="method"
          value={ method }
          dataTestId="method-input"
          data={ PAYMENT_OPTIONS }
          onChange={ (event) => this.handleInput(event) }
        />
        { isEditting ? (
          <Button
            className={ `btn btn-primary ${styles.button}` }
            onClick={ () => sendEditData(this.state) }
          >
            Editar Despesa
          </Button>
        ) : (
          <Button
            className={ `btn btn-primary ${styles.button}` }
            onClick={ () => this.handleAddExpense(idToEdit) }
          >
            Adicionar Despesa
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ wallet: { currencies, idToEdit,
  isEditting, dataToEdit } }) => ({
  currencies,
  idToEdit,
  isEditting,
  dataToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
  sendEditData: (payload) => dispatch(sendEditExpenseThunk(payload)),
  addExpense: (payload) => dispatch(addExpenseThunk(payload)),
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({}),
  fetchCurrencies: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
