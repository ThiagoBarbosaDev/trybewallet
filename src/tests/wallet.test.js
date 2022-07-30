import React from 'react';
import { renderWithRedux } from './helpers/renderWith';
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Wallet from '../pages/Wallet';

const MOCK_LOGIN = {
  email: 'tryber@trybe.com',
  password: '123456',
}

// PARA FAZER: MOCKAGEM DE DADOS E DO FETCH

describe('Testes na página de Login', () => {
  it('botão de login deverá validar corretamente', async () => {
    renderWithRedux(<Wallet />, {
      initialState: { user: { email: MOCK_LOGIN.email } },
    });

    const headerEmail = screen.getByText(/tryber@trybe\.com/i)
    expect(headerEmail).toBeInTheDocument()
    
    await screen.findByText('USD')
    // await screen.findByText('USD')
    const valueInput = screen.getByTestId('value-input')
    const descriptionInput = screen.getByTestId('description-input')
    const currencyInput = screen.getByTestId('currency-input')
    const tagInput = screen.getByTestId('tag-input')
    const methodInput = screen.getByTestId('method-input')
    
    userEvent.type(valueInput, '10')
    userEvent.type(descriptionInput, 'Leite')
    userEvent.selectOptions(currencyInput, 'JPY');
    userEvent.selectOptions(tagInput, 'Lazer');
    userEvent.selectOptions(methodInput, 'Cartão de débito');
    
    expect(valueInput).toHaveValue(10)
    expect(descriptionInput).toHaveValue('Leite')
    expect(currencyInput).toHaveValue('JPY')
    expect(tagInput).toHaveValue('Lazer')
    expect(methodInput).toHaveValue('Cartão de débito')
    
    const buttonDespesa = screen.getByRole('button', { name: /adicionar despesa/i })  
    userEvent.click(buttonDespesa);
    
    await screen.findByText('Leite')
    const editButton = screen.getByTestId('edit-btn');
    
    userEvent.click(editButton)
    expect(editButton).toBeInTheDocument();
    
    await screen.findByRole('button', { name: /editar despesa/i })  
    const buttonEditarDespesa = screen.getByRole('button', { name: /editar despesa/i })  
    expect(buttonEditarDespesa).toBeInTheDocument()

    userEvent.type(valueInput, '1')
    userEvent.type(descriptionInput, 'Burger')
    userEvent.selectOptions(currencyInput, 'USD');
    userEvent.selectOptions(tagInput, 'Alimentação');
    userEvent.selectOptions(methodInput, 'Dinheiro');
    
    expect(valueInput).toHaveValue(1)
    expect(descriptionInput).toHaveValue('Burger')
    expect(currencyInput).toHaveValue('USD')
    expect(tagInput).toHaveValue('Alimentação')
    expect(methodInput).toHaveValue('Dinheiro')

    userEvent.click(buttonEditarDespesa)
    await screen.getByRole('button', { name: /adicionar despesa/i }) 
    expect(buttonDespesa).toBeInTheDocument() 
    
    const buttonExcluirDespesa = screen.getByRole('button', { name: /excluir/i })
    expect(buttonExcluirDespesa).toBeInTheDocument()
    userEvent.click(buttonExcluirDespesa)

    const despesa = screen.queryByRole('cell', { name: /1\.00/i })
    expect(despesa).not.toBeInTheDocument()

    screen.logTestingPlaygroundURL(); 
  });
  // it('botão de login deverá validar corretamente', async () => {
  //   renderWithRouterAndRedux(<App/>)
    
  //   const inputEmail = screen.getByLabelText(/email:/i)
  //   const inputPassword = screen.getByLabelText(/password:/i)
  //   const buttonLogin = screen.getByRole('button', {name: /entrar/i})
    
  //   userEvent.type(inputEmail, MOCK_LOGIN.email)
  //   userEvent.type(inputPassword, MOCK_LOGIN.password)
  //   userEvent.click(buttonLogin)
    
  //   const buttonDespesa = await screen.findByRole('button', { name: /adicionar despesa/i })  
  //   screen.logTestingPlaygroundURL();
  //   expect(buttonDespesa).toBeInTheDocument();

  // });
})