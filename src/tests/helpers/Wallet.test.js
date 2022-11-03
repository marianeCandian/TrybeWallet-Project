import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import Wallet from '../../pages/Wallet';
import { renderWithRouterAndRedux } from './renderWith';

describe('Testando a página Wallet', () => {
  it('Se ao ir para página /carteira, é renderizado os elementos', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email = screen.getByPlaceholderText('Email');
    const senha = screen.getByPlaceholderText('Senha');
    const btn = screen.getByRole('button', { name: /ENTRAR/ });

    userEvent.type(email, 'qualquercoisa@trybe.com');
    userEvent.type(senha, '123456');
    userEvent.click(btn);

    expect(history.location.pathname).toBe('/carteira');

    const title = screen.getByRole('heading', { leval: 3, name: /trybe wallet/i });
    expect(title).toBeInTheDocument();

    const emailHeader = screen.getByTestId('email-field');
    expect(emailHeader).toBeInTheDocument();

    const total = screen.getByTestId('total-field');
    expect(total).toBeInTheDocument();

    const brl = screen.getByText(/brl/i);
    expect(brl).toBeInTheDocument();

    const despesasInput = screen.getByLabelText(/descrição das despesas/i);
    expect(despesasInput).toBeInTheDocument();
    userEvent.type(despesasInput, 'qualquercoisa');
    expect(despesasInput.value).not.toBe('');

    const valorInput = screen.getByLabelText(/valor/i);
    expect(valorInput).toBeInTheDocument();
    userEvent.type(valorInput, '10');
    expect(valorInput.valeu).not.toBe('');

    const moeda = screen.getByText(/moeda/i);
    expect(moeda).toBeInTheDocument();

    const method = screen.getByText(/método de pagamento/i);
    expect(method).toBeInTheDocument();

    const category = screen.getByText(/categoria da despesa/i);
    expect(category).toBeInTheDocument();

    const btn2 = screen.getByRole('button', { name: /adicionar despesas/i });
    expect(btn2).toBeInTheDocument();

    userEvent.click(btn);
  });

  it('Testa o select assincrono', async () => {
    renderWithRouterAndRedux(<Wallet />, '/carteira');

    const coins = await screen.findAllByTestId('currency-input');
    expect(coins).toHaveLength(1);
  });
});
