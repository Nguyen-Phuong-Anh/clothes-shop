import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartStore from './store/CartStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartStore>
      <App />
    </CartStore>
  </React.StrictMode>
);
