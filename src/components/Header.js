import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpensesAdjustedToBRL = () => {
    const { expenses } = this.props;
    const sum = expenses
      .reduce((acc, cv) => {
        const value = parseInt(cv.value, 10);
        const exchangeRate = parseFloat(cv.exchangeRates[cv.currency].ask);
        return (value * exchangeRate) + acc;
      }, 0);
    return sum.toFixed(2);
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <section>
          <p data-testid="email-field">{email}</p>
          <p>
            <span data-testid="total-field">
              {expenses.length
                ? this.sumExpensesAdjustedToBRL()
                : parseFloat(0).toFixed(2)}
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </p>
        </section>
      </header>
    );
  }
}

const mapStateToProps = ({ wallet: { expenses }, user: { email } }) => ({
  email,
  expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, null)(Header);

// {
//   user: {
//     email: '', // string que armazena o email da pessoa usuária
//   },
//   wallet: {
//     currencies: [], // array de string
//     expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
//     editor: false, // valor booleano que indica de uma despesa está sendo editada
//     idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
//   }
// }
