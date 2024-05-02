import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { StyledEngineProvider } from '@mui/styled-engine';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <StyledEngineProvider injectFirst>
    <App />
  </StyledEngineProvider>
);

