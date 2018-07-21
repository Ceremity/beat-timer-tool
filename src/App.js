import React, { Component } from 'react'
import './App.css'
import Waveform from './UI/Waveform'

class App extends Component {

  constructor(props) {
    super(props)
    console.log()
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Beat Time Tool</h1>
        </header>
        <Waveform />
      </div>
    )
  }
}

export default App
