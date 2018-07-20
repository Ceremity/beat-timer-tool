import React, { Component } from 'react'
import WaveformDisplay from './UI/WaveformDisplay.js'
import './App.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Beat Timer Tool (BTT)</h1>
        </header>
        <WaveformDisplay />
      </div>
    )
  }
}

export default App
