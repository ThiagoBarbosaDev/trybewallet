import React from 'react';
import { renderWithRedux, renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App'
import { screen } from '@testing-library/react'
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import Wallet from '../pages/Wallet';

const MOCK_LOGIN = {
  email: 'tryber@trybe.com',
  password: '123456',
}

describe('Testes na página de Login', () => {
  // it('botão de login deverá validar corretamente', () => {
  //   renderWithRouterAndRedux(<Wallet />, {
  //     initialPath: "/carteira",
  //     initialState: { user: { email: MOCK_LOGIN.email } },
  //   });

  //   screen.logTestingPlaygroundURL();
  // });
  it('botão de login deverá validar corretamente', async () => {
    renderWithRouterAndRedux(<App/>)
    
    const inputEmail = screen.getByLabelText(/email:/i)
    const inputPassword = screen.getByLabelText(/password:/i)
    const buttonLogin = screen.getByRole('button', {name: /entrar/i})
    
    userEvent.type(inputEmail, MOCK_LOGIN.email)
    userEvent.type(inputPassword, MOCK_LOGIN.password)
    userEvent.click(buttonLogin)
    
    const buttonDespesa = await screen.findByRole('button', { name: /adicionar despesa/i })  
    screen.logTestingPlaygroundURL();
    expect(buttonDespesa).toBeInTheDocument();

  });
})