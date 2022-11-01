import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <div>
        <h3>TRYBE WALLET</h3>
        <span data-testid="email-field">
          Email:
          {email}
        </span>
        <p data-testid="total-field">
          { total.toFixed(2)}
        </p>
        <span data-testid="header-currency-field">BRL</span>
      </div>

    );
  }
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
