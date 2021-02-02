import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@atlaskit/css-reset'
import { App } from './App.jsx';
import { AuthState } from './store/AuthContext/AuthState';
import { BrowserRouter } from "react-router-dom";
import { UserState } from './store/UserContext/UserState';


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

