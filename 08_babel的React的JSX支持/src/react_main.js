import React, { Component } from 'react';
import ReactDom from 'react-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: 'Hello React!',
    };
  }

  render() {
    return (
      <div>
        <h2>{this.state.message}</h2>
      </div>
    );
  }
}

ReactDom.render(<App />, document.getElementById('app'));
