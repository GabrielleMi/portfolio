import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter  basename='/portfolio'>
          <LanguageProvider>
              <App />
          </LanguageProvider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

