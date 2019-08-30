import React from 'react';
// import logo from './logo.svg';

import { Route, Switch, Link } from "react-router-dom";
import { AuthRoute } from '../util/route_util';
import { ProtectedRoute } from '../util/route_util';
// import './App.css';
import ProductIndex from "./products/ProductIndex";
import Login from './Login';
import Register from './Register';
import Nav from './Nav';
import ProductDetail from './products/ProductDetail';
import CreateProduct from './products/CreateProduct';

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
      <Route path="/" component={Nav} />
      <Switch>
        <Route exact path="/product/:id" component={ProductDetail} />
        <ProtectedRoute exact path="/createproduct" component={CreateProduct} />

        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;
