import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {

  state = {
    sushis: [],
    currentIndex: 0,
    eaten: [],
    money: 100,
    moreMoney: 0
  }

  componentDidMount() {
    fetch(API)
    .then(response => response.json())
    .then(data => this.setState({sushis: data}))
  }

  moreSushiPlease = () => {
    if (this.state.currentIndex <= 92) {
      this.setState({
        currentIndex: this.state.currentIndex + 4
      })
    } else {
      this.setState({
        currentIndex: 0
      })
    }
  }

  buySushi = (cost, id) => {
    if(this.state.money >= cost && !this.state.eaten.includes(id)){
      this.setState({
        eaten: [...this.state.eaten, id],
        money: this.state.money - cost
      })
    } else {
      alert('You Need More Monies Sushi Monster 🍣')
    }
  }

  handleChange = (event) => {
    this.setState({
      moreMoney: event.target.value
    })
  }

  updateBudget = (event) => {
    event.preventDefault()
    console.log('clicked')
    this.setState({
      money: this.state.money + parseInt(this.state.moreMoney),
      moreMoney: 0
    })
  }

  render() {
    console.log('App State = ', this.state)
    const limitedSushi = this.state.sushis.slice(this.state.currentIndex, this.state.currentIndex + 4)
    return (
      <div className="app">
        <form>
          <label>Add More Money!</label>
          <br></br>
          <br></br>
          <input type='number' 
          value={this.state.moreMoney} 
          name="moreMoney" 
          placeholder="Amount"
          onChange={this.handleChange}
          ></input>
          <button type='submit' onClick={this.updateBudget}>Submit</button>
        </form>
        <SushiContainer 
        sushis={limitedSushi} 
        getMoreSushi={this.moreSushiPlease}
        eatenArray={this.state.eaten}
        buySushi={this.buySushi}
        />
        <Table eatenArray={this.state.eaten} money={this.state.money}/>
      </div>
    );
  }
}

export default App;