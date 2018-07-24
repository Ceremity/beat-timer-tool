import React, { Component } from 'react'
import './App.css'
import Waveform from './UI/Waveform'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timestamps: []
    }

    this.newTimestampHandler = this.newTimestampHandler.bind(this)
  }

  newTimestampHandler(timestamp) {
    this.setState({
      timestamps: [timestamp, ...this.state.timestamps]
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Beat Time Tool</h1>
        </header>
        <Waveform newTimestampHandler={this.newTimestampHandler.bind(this)}/>
      </div>
    )
  }
}

export default App;
