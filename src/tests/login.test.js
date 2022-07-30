import React from 'react';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App'
import { screen } from '@testing-library/react'
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';

const MOCK_LOGIN = {
  email: 'tryber@trybe.com',
  validPassword: '123456',
  invalidPassword: '12345',
}

describe('Testes na página de Login', () => {
  it('botão de login deverá validar corretamente', () => {
    renderWithRedux(<Login/>)
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button')

    expect(emailInput).toBeInTheDocument(); 
    expect(passwordInput).toBeInTheDocument(); 
    expect(loginButton).toBeInTheDocument();
    
    userEvent.type(emailInput, MOCK_LOGIN.email)
    expect(emailInput.value).toBe(MOCK_LOGIN.email)
    expect(loginButton.disabled).toBeTruthy();

    userEvent.type(passwordInput, MOCK_LOGIN.invalidPassword)
    expect(passwordInput.value).toBe(MOCK_LOGIN.invalidPassword)
    expect(loginButton.disabled).toBeTruthy()

    userEvent.type(passwordInput, MOCK_LOGIN.validPassword);
    expect(passwordInput.value).toBe(MOCK_LOGIN.validPassword)
    expect(loginButton.disabled).toBeFalsy()
  });
  it('botão de login deverá validar corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App/>)
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const loginButton = screen.getByRole('button')

    userEvent.type(emailInput, MOCK_LOGIN.email)
    userEvent.type(passwordInput, MOCK_LOGIN.validPassword);
    userEvent.click(loginButton);

    screen.logTestingPlaygroundURL()
    expect(history.location.pathname).toBe('/carteira');
  });
})
