import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-button/stripe-button.component';

import {
  selectCartItems,
  selectCartTotal,
} from '../../redux/cart/cart.selectors';

import './checkout.styles.scss';

const CheckoutPage = ({ cartItems, cartTotal }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">Total: ${cartTotal}</div>
    <div className="test-warning">
      **Please use any of the stripe test credit carts for payment**
      <br />
      Visa||4242424242424242||Any 3 digits||Any future date
      <br />
      Visa(debit)||4000056655665556||Any 3 digits||Any future date
      <br />
      Mastercard||5555555555554444||Any 3 digits||Any future date
      <br />
      Mastercard(2-series)||2223003122003222||Any 3 digits||Any future date
      <br />
      Mastercard(debit)||5200828282828210||Any 3 digits||Any future date
      <br />
      Mastercard(prepaid)||5105105105105100||Any 3 digits||Any future date
      <br />
      American Express||378282246310005||Any 4 digits||Any future date
      <br />
      Discover||6011111111111117||Any 3 digits||Any future date
      <br />
      Diners Club||3056930009020004||Any 3 digits||Any future date
      <br />
      Diners Club(14 digit card)||36227206271667||Any 3 digits||Any future date
      <br />
      JCB||3566002020360505||Any 3 digits||Any future date
      <br />
      UnionPay||6200000000000005||Any 3 digits||Any future date
    </div>
    <StripeCheckoutButton price={cartTotal} />
  </div>
);

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartTotal: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
