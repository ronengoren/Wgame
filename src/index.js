import './assets/main.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { AlertProvider } from './context/AlertContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AlertProvider>
            <App />
        </AlertProvider>
    </React.StrictMode>,
);

reportWebVitals();
