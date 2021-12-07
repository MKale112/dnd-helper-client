import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { dndTheme } from './styles/theme';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider resetCSS theme={dndTheme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
