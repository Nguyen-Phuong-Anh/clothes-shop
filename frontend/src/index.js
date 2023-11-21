import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CartStoreProvider from './store/Store';
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

if(process.env.NODE_ENV === 'production') disableReactDevTools()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartStoreProvider>
      <App />
    </CartStoreProvider>
  </React.StrictMode>
);
