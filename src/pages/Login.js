import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import Input from '../components/Input';
import loginAction from '../redux/actions/loginAction';

const isPasswordValid = (password) => {
  const minPasswordLength = 5;
  const isValid = password.length > minPasswordLength;
  return isValid;
};

const isEmailValid = (inputEmail) => {
  const emailValidationRegex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
  const isValid = emailValidationRegex.test(inputEmail);
  return isValid;
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      inputEmail: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  isDisabled = () => {
    const { inputEmail, password } = this.state;
    const isButtonDisabled = !(isPasswordValid(password)
      && isEmailValid(inputEmail));
    this.setState({ isButtonDisabled });
  }

  handleInput = ({ target: { value, name } }) => this
    .setState(() => ({ [name]: value }), () => this.isDisabled());

  onLoginClick = () => {
    const { inputEmail } = this.state;
    const { onLogin, history: { push } } = this.props;
    onLogin(inputEmail);
    push('/carteira');
  }

  render() {
    const { inputEmail, password, isButtonDisabled } = this.state;

    return (
      <div>
        Login
        <Input
          name="inputEmail"
          type="email"
          value={ inputEmail }
          data-testid="email-input"
          onChange={ (event) => this.handleInput(event) }
          label="Email:"
        />
        <Input
          name="password"
          type="password"
          value={ password }
          data-testid="password-input"
          onChange={ (event) => this.handleInput(event) }
          label="Password:"
        />
        <Button
          onClick={ () => this.onLoginClick() }
          disabled={ isButtonDisabled }
        >
          Entrar
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onLogin: (email) => dispatch(loginAction(email)),
});

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
  onLogin: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
