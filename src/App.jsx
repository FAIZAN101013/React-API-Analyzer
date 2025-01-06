import React from 'react';
import FetchData from './components/FetchData';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <header>
        <h1>React API Analyzer</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main className="main-content">
        <FetchData />
      </main>
      <footer>
        <p>Made by Me</p>
        <span>&copy; 2025 Mohammed Faizan. All rights reserved.</span>
      </footer>
    </div>
  );
};

export default App;

