import React from 'react';

class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false, 
      nextState: false,
    }
  }

  // place cell as object in global array 
  componentDidMount() {
    this.props.cells[this.props.id] = this
    $(events).on("calculate", this.calculate)
    $(events).on("renderNext", this.renderNext)
  }

  renderNext(){
    this.setState({selected: this.state.nextState})     
  }

  // toggle cell state on click
  onclick(e) {
    this.setState({selected: !this.state.selected})
  }

  // check if cell has been selected
  isSelected(row, col) {
    var size = Math.sqrt(this.props.cells.length)

    if (row === -1) {
      row = size - 1
    }
    if (row === size) {
      row = 0
    }
    if (col === -1) {
      col = size - 1
    }
    if (col === size) {
      col = 0
    }
    
    var id = row * size + col           
    return this.props.cells[id].state.selected

  }

  //check status of cell's neighbors
  checkNeighbors() {
    var neighbours = 0
    var size = Math.sqrt(this.props.cells.length)
    var row = Math.floor(this.props.id / size)
    var col = this.props.id - row * size 
    this.state.nextState = false 
    
    // calculate number of neighbours
    if (this.isSelected(row - 1, col)) {
      neighbours += 1
    } 
    if (this.isSelected(row - 1, col + 1)) {
      neighbours += 1
    } 
    if (this.isSelected(row - 1, col - 1)) {
      neighbours += 1
    } 
    if (this.isSelected(row, col + 1)) {
      neighbours += 1
    } 
    if (this.isSelected(row, col - 1)) {
      neighbours += 1
    } 
    if (this.isSelected(row + 1, col)) {
      neighbours += 1
    } 
    if (this.isSelected(row + 1, col + 1)) {
      neighbours += 1
    } 
    if (this.isSelected(row + 1, col - 1)) {
      neighbours += 1
    }
    
    // assign cell a nextState based on number of neighbours     
    if (this.state.selected) {
      if (neighbours < 2) {
          this.state.nextState = false
      } else if (neighbours > 3) {
          this.state.nextState = false      
      } else if (neighbours == 3 || neighbours == 2) {
          this.state.nextState = true
      }
    } else {
      if (neighbours == 3) {
        this.state.nextState = true      
      }
    }
  }

  render() {
    return (
      <div 
        className={this.state.selected ? "cell active" : "cell"}
        onClick={this.onclick} 
      >
      </div>
   ) 
  }
}

// calculate and render next state on spacebar press  
$(document).keydown(function(e){  
  if (e.which === 32) {  // space   
    $(events).trigger("calculate")
    $(events).trigger("renderNext")
    
  }
})

export default Cell;