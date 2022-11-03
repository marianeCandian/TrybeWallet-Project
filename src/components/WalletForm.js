import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi, upDateWallet } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: -1,
    description: '',
    value: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleSubmit = async () => {
    const obj = await fetchApi();
    this.setState((prev) => ({
      id: prev.id + 1,
      exchangeRates: obj,
    }), () => {
      const { dispatch } = this.props;
      dispatch(upDateWallet(this.state));
      this.setState({
        description: '',
        value: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      });
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, tag, currency, method } = this.state;
    return (
      <form>
        <label htmlFor="text">
          Descrição das Despesas:
          <input
            id="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="valor">
          Valor:
          <input
            id="valor"
            name="value"
            type="number"
            value={ value }
            data-testid="value-input"
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="currency">
          Moeda
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ this.handleInput }
          >
            {
              currencies.map((coin) => (
                <option key={ coin } value={ coin }>{coin}</option>
              ))
            }
          </select>
        </label>
        <label htmlFor="method">
          Método de pagamento
          <select
            id="method"
            name="method"
            value={ method }
            data-testid="method-input"
            onChange={ this.handleInput }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria da despesa
          <select
            id="tag"
            name="tag"
            value={ tag }
            data-testid="tag-input"
            onChange={ this.handleInput }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>
        <button
          type="button"
          onClick={ this.handleSubmit }
        >
          Adicionar Despesas
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps)(WalletForm);
