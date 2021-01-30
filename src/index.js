import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@atlaskit/css-reset'
import { App } from './App.jsx';
import { AuthState } from './store/AuthContext/AuthState';
import { BrowserRouter } from "react-router-dom";


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthState>
      <App />
      </AuthState>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

