import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      photos: []
    }
  }

  //send GET request to server on page load
  componentDidMount() {

  }

  render() {
    return (
      <div>
      </div>
    )
  }
}
