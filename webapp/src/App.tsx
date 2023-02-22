import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import ProductsPage from './pages/ProductsPage/ProductsPage';

const App = () => (
  <div>
    <h1>Hello World!</h1>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Route path="/products" exact>
            <ProductsPage />
        </Route>
      </Switch>
    </BrowserRouter>
  </div>
);

export default App;