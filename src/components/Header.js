import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <div>
        <h3>TRYBE WALLET</h3>
        <span data-testid="email-field">
          Email:
          {email}
        </span>
        <p data-testid="total-field">Total de despesas: 0</p>
        <span data-testid="header-currency-field">BRL</span>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
