import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createContext} from "react";
import UserRestaurant from './restaurant/userRestaurant';
import DishRestaurant from './restaurant/dishRestaurant';
import BasketRestaurant from './restaurant/basketRestaurant';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserRestaurant(),
    dish: new DishRestaurant(),
    basket: new BasketRestaurant(),
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

reportWebVitals();
