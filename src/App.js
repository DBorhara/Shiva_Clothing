import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//Auth
import { auth, createUserProfileDocument } from './firebase/firebase.utils';

//Redux Actions
import { setCurrentUser } from './redux/user/user.actions';

//Selector
import { selectCurrentUser } from './redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';

//Import Components
import Homepage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import CheckoutPage from './pages/checkout/checkout.component';

import './App.css';

class App extends Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    //Open subscription between the app and firebase app
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot((snapshotObj) => {
          setCurrentUser({
            id: snapshotObj.id,
            ...snapshotObj.data(),
          });
        });
      }
      setCurrentUser(userAuth);
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

//Access to User Status on Login
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

//user is the object payload in the store
const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

// mapStateToProps is a utility which helps your component get updated state(which is updated by some other components),
// mapDispatchToProps is a utility that helps your component to fire an action event (dispatching action which may cause change of application state)
export default connect(mapStateToProps, mapDispatchToProps)(App);
