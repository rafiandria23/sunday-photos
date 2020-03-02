import React, { Component } from 'react';
import Header from './components/Header';
// import logo from './logo.svg';
// import './App.css';
import PhotoList from './components/PhotoList';

class App extends Component {
  render() {
    return (
      <>
        <Header />
        <div id="app">
          <PhotoList />
        </div>
      </>
    );
  }
}

export default App;
