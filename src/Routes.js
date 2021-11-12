import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cart from './containers/Cart/Cart';
import Header from './containers/Header/Header';
import Home from './containers/Home/Home';
import ProductDetails from './containers/Products/ProductDetails';
import Profile from './containers/Profile/Profile';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import AuthContextProvider from './contexts/AuthContext';
import ProductsContextProvider from './contexts/ProductsContext';

const Routes = () => {
  return (
    <div>
      <ProductsContextProvider>
        <BrowserRouter>
          <Header />
          <Switch>
            <AuthContextProvider>
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/signin" component={SignIn} />
            </AuthContextProvider>
          </Switch>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/details/:id" component={ProductDetails} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/cart" component={Cart} />
          </Switch>
        </BrowserRouter>
      </ProductsContextProvider>
    </div>
  );
};

export default Routes;