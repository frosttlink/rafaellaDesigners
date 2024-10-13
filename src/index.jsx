import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Navegacao from './rotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Navegacao />
  </React.StrictMode>
);

