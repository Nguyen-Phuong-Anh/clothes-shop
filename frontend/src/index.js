import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartStoreProvider from './store/CartStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartStoreProvider>
      <App />
    </CartStoreProvider>
  </React.StrictMode>
);
