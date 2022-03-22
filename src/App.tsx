import React from 'react';
import logo from './logo.svg';
import './App.css';
import Recipes from './Recipes';
import NavigationBar from './NavigationBar';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Recipes />
    </div>
  );
}

export default App;
