import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testando a págiana de Login', () => {
  it('Se ao iniciar renderiza os elementos', () => {
    renderWithRouterAndRedux(<App />);

    const title = screen.getByRole('heading', { level: 2, name: /TRYBE WALLET/ });
    expect(title).toBeInTheDocument();
    const email = screen.getByPlaceholderText('Email');
    expect(email).toBeInTheDocument();
    const senha = screen.getByPlaceholderText('Senha');
    expect(senha).toBeInTheDocument();
    const btn = screen.getByRole('button', { name: /ENTRAR/ });
    expect(btn).toBeInTheDocument();
  });

  it('Se ao clicar no botão é renderizado a página /carteira', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText('Email');
    const senha = screen.getByPlaceholderText('Senha');
    const btn = screen.getByRole('button', { name: /ENTRAR/ });

    userEvent.type(email, 'qualquercoisa@trybe.com');
    userEvent.type(senha, '123456');
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');
  });
});
