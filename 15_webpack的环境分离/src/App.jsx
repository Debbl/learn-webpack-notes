import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from 'pages/home';
import About from 'pages/about';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Hello React ccc!',
    };
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Link to='/home'>HOME</Link>
          <Link to='/about'>ABOUT</Link>
          <Routes>
            <Route path='/home' element={<Home />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </BrowserRouter>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

export default App;
