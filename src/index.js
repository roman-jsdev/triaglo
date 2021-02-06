import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App.jsx';
import { AuthState } from '@store/AuthContext/AuthState';
import { UserState } from '@store/UserContext/UserState';
import { BrowserRouter } from "react-router-dom";
import '@atlaskit/css-reset'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserState>
        <AuthState>
        <App />
        </AuthState>
      </UserState>
    </BrowserRouter>
  </React.StrictMode >,
  document.getElementById('root')
);

