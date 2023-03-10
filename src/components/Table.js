import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpenes } from '../redux/actions';

class Table extends Component {
  hadleRemove = (id) => {
    const { expenses, dispatch } = this.props;
    const result = expenses.filter((e) => e.id !== id);
    dispatch(deleteExpenes(result));
  };

  handleEdit = (id) => {
    const { expenses, dispatch } = this.props;
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
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

        <tbody>
          {expenses.length !== 0
          && expenses.map((e) => (
            <tr key={ e.id }>
              <td>{e.description}</td>
              <td>{e.tag}</td>
              <td>{e.method}</td>
              <td>{parseFloat(e.value).toFixed(2)}</td>
              <td>{e.exchangeRates[e.currency].name}</td>
              <td>
                {parseFloat(e.exchangeRates[e.currency].ask)
                  .toFixed(2)}
              </td>
              <td>
                {parseFloat((e.value
                * e.exchangeRates[e.currency].ask).toFixed(2))}
              </td>
              <td>Real</td>
              <td>
                <button
                  type="button"
                  data-testid="edit-btn"
                  onClick={ () => this.handleEdit(e.id) }
                >
                  Editar
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  onClick={ () => this.hadleRemove(e.id) }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
