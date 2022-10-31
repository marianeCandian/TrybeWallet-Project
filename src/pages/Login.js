import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { userForm } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    password: '',
    isBtnDisabled: true,
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => this.verifyBtn());
  };

  verifyBtn = () => {
    const { email, password } = this.state;
    const regex = /\S+@\S+\.\S+/i;
    const verifyEmail = regex.test(email);
    const tamanho = 6;
    const verifyPassword = password.length >= tamanho;
    const btnState = verifyEmail && verifyPassword;
    this.setState({ isBtnDisabled: !(btnState) });
  };

  handleBtn = (e) => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    e.preventDefault();
    dispatch(userForm(email));
    history.push('/carteira');
  };

  render() {
    const { isBtnDisabled, email } = this.state;
    return (
      <div>
        <h2> TRYBE WALLET</h2>
        <form className="login-form">
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="Email"
            data-testid="email-input"
            onChange={ this.handleInput }
          />
          <input
            type="password"
            name="password"
            data-testid="password-input"
            placeholder="Senha"
            onChange={ this.handleInput }
          />
          <button
            type="submit"
            onClick={ this.handleBtn }
            disabled={ isBtnDisabled }
          >
            ENTRAR
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
