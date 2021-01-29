import React from 'react';
import Header from './components/Header';
import Router from './Router';
import './index.css';

const App: React.FC = () => (
  <div>
    <Header />
    <Router />
  </div>
);

export default App;
