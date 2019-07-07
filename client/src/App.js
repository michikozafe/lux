import React from 'react';
import Router from './routes'

import 'bootstrap/dist/css/bootstrap.css';
import './assets/css/style.css';
import { AuthProvider } from './context/Auth';

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
