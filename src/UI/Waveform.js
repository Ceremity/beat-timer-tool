import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from '../sketches/Audio-Waveform.js'

export default class Waveform extends Component {

  constructor() {
    super()

    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }
  
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight })
  }

  fileChanged() {
    
  }

  render() {
    return (
      <div id="my-canvas">
        <P5Wrapper sketch={sketch} width={this.state.width} height={300} />
        <input type="file" id="song" onChange={this.fileChanged.bind(this)} />
        {/* <button onClick={this.playSong}>Play</button> */}
      </div>
    )
  }
}
