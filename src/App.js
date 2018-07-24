import React, { Component } from 'react'
import './App.css'
import Waveform from './UI/Waveform'
import Timestamp from './UI/Timestamp'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import convert from './util/convertToJSON'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      timestamps: [],
      json: ""
    }

    this.newTimestampHandler = this.newTimestampHandler.bind(this)
    this.deleteHandler = this.deleteHandler.bind(this)
    this.positionChangeHandler = this.positionChangeHandler.bind(this)
  }

  newTimestampHandler(timestamp) {

    const timestamps = [
      { timestamp, pos: 0 }, 
      ...this.state.timestamps
    ].sort((a, b) => a.timestamp - b.timestamp)

    this.setState({
      timestamps,
      json: convert(timestamps)
    })
  }

  deleteHandler(id) {

    const timestamps = [
      ...this.state.timestamps.slice(0, id), 
      ...this.state.timestamps.slice(id + 1)
    ]
    
    this.setState({
      timestamps,
      json: convert(timestamps)
    })
  }

  positionChangeHandler(id, pos) {

    const timestamps = [
      ...this.state.timestamps.slice(0, id),
      { ...this.state.timestamps[id], pos },
      ...this.state.timestamps.slice(id + 1)
    ]

    this.setState({
      timestamps,
      json: convert(timestamps)
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Beat Time Tool</h1>
        </header>
        <Waveform newTimestampHandler={this.newTimestampHandler}
          timestamps={this.state.timestamps}
        />
        <div id="content-wrapper">
          <ul id="list">
            {
              this.state.timestamps
              .map((stamp, i) => <li key={`timestamp-${i}`}><Timestamp 
                  stamp={stamp} deleteHandler={this.deleteHandler} id={i}
                  positionChangeHandler={this.positionChangeHandler}
                /></li>)
            }
          </ul>
          <div id="input-wrapper">
            <CopyToClipboard text={this.state.json}>
              <button>COPY code</button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
