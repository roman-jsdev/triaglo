import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@atlaskit/css-reset'
import { App } from './App.jsx';
import { DndState } from './store/DndContext/DndState';

ReactDOM.render(
  <React.StrictMode>
    <DndState>
      <App />
    </DndState>
  </React.StrictMode>,
  document.getElementById('root')
);

