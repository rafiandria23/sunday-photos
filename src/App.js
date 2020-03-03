import React, { Component } from 'react';
import axios from 'axios';
import Header from './components/Header';
// import logo from './logo.svg';
// import './App.css';
import PhotoList from './components/PhotoList';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: null,
      searchQuery: ''
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://pixabay.com/api/?key=15451477-5b6f0ff8bb3e146f960b22a5f&editors_choice=true&order=latest'
      )
      .then(({ data }) => {
        this.setState({
          photos: data.hits
        });
        console.log(data.hits);
      })
      .catch(err => {
        console.log(err.response);
      });
  }

  handleSearch = e => {
    e.preventDefault();
    this.setState({
      searchQuery: e.target.value
    });
    // if (searchQuery.length > 0) {
    //   const filteredPhotos = this.state.photos.filter(photo => {
    //     return photo.tags.toLowerCase().includes(searchQuery.toLowerCase());
    //   });
    //   this.setState({
    //     filteredPhotos
    //   });
    // } else {
    //   this.setState({
    //     filteredPhotos: []
    //   });
    // }
  };

  render() {
    const { photos, searchQuery } = this.state;
    return (
      <div id='app'>
        <Header
          searchQuery={this.state.searchQuery}
          handleSearch={this.handleSearch}
        />
        {this.state.photos && (
          <PhotoList photos={photos} searchQuery={searchQuery} />
        )}
      </div>
    );
  }
}

export default App;
