import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';
import removeExpenseAction from '../redux/actions/removeExpenseAction';
import requestEditExpenseAction from '../redux/actions/requestEditExpenseAction';
import styles from './Table.module.scss';

const convertExpenseToBRL = (expense, rate) => (expense * rate).toFixed(2);

class Table extends Component {
  renderExpenses = () => {
    const { expenses, removeExpense, requestEditExpense } = this.props;
    return expenses.map(
      ({ id, description, tag, method, value, currency, exchangeRates }) => {
        const exchangeRate = exchangeRates[currency].ask;
        const adjustedExchangeRate = Math.round(exchangeRates[currency].ask * 100) / 100;
        const fiatName = exchangeRates[currency].name;
        const monetaryValue = parseInt(value, 10).toFixed(2);
        return (
          <tr key={ id }>
            <td>{ description }</td>
            <td>{ tag }</td>
            <td>{ method }</td>
            <td>{ monetaryValue }</td>
            <td>{ fiatName }</td>
            <td>{ adjustedExchangeRate }</td>
            <td>{ convertExpenseToBRL(value, exchangeRate) }</td>
            <td>{ currency }</td>
            <td className={ styles['button-container'] }>
              <Button
                className="btn btn-danger"
                dataTestId="delete-btn"
                onClick={ () => removeExpense(id) }
              >
                Excluir
              </Button>
              <Button
                className="btn btn-warning"
                dataTestId="edit-btn"
                onClick={ () => requestEditExpense(id) }
              >
                Editar
              </Button>
            </td>
          </tr>
        );
      },
    );
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="container">
        <thead>
          <tr className={ styles['table-head'] }>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        { expenses && (
          <tbody>
            { this.renderExpenses() }
          </tbody>
        )}
      </table>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses } }) => ({
  expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (payload) => dispatch(removeExpenseAction(payload)),
  requestEditExpense: (payload) => dispatch(requestEditExpenseAction(payload)),
});

Table.propTypes = {
  expenses: PropTypes.shape({}),
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
