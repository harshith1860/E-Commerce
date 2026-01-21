import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ScrollToTop } from './components';
import { FilterProvider } from './context';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <FilterProvider>
        <ScrollToTop />
        {/*
          ToastContainer is responsible for rendering toast notifications (success, error, info, etc.)
          globally across the app. Placing it at the root allows any component to trigger toasts.
          We can also pass configuration props here (like autoClose, position, closeButton, theme, etc.)
          to control the default behavior and appearance of all toast messages.
        */}
        <ToastContainer closeButton={false} autoClose={3000} position={"top-right"}/>
        <App />
      </FilterProvider>
    </Router>
  </React.StrictMode>
);