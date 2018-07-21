import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'

export default class Waveform extends Component {

  constructor() {
    super()

    this.sketch = this.sketch.bind(this)
  }

  sketch(p5) {

    p5.setup = () => {

      p5.createCanvas(this.props.width, this.props.height)
    }

    p5.draw = () => {

      p5.background(25)
      p5.stroke(225)
      p5.strokeWeight(-2)
      p5.line(30, 20, 85, 75)
    }
  }

  render() {
    return (
      <div id="my-canvas">
        <P5Wrapper sketch={this.sketch} />
        <input type="file" id="song" onChange={() => console.log('ooooo')} />
        {/* <button onClick={this.playSong}>Play</button> */}
      </div>
    )
  }
}
