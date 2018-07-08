import React from 'react';
import Cell from 'Cell';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board: []
    }
  }

  componentDidMount() {
    // build an array to hold all the cells
    var cells = []  
    for (var i = 0; i < 100; i++) { 
      cells.push(<Cell key={i} id={i} cells={c} />)
    }
    this.setState({board: cells});
    console.log(cells);
  }

  render() {               
    return (
      <div id="main"> 
        <h1> The Game of Life </h1>
        <div id="board">
          { this.state.board } 
        </div>
      </div>
    )    
  }
}

export default App;