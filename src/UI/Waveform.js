import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from '../sketches/Audio-Waveform.js'

export default class Waveform extends Component {

  constructor() {
    super()

    this.state = {
      reader: new FileReader(),
      selectedFile: null,
      wavePoints: [],
      width: 0,
      height: 0
    }

    this.state.reader.onload = this.showWaveform.bind(this)

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.fileChanged = this.fileChanged.bind(this)
    // this.showWaveform = this.showWaveform.bind(this)
  }

  showWaveform() {

    const audioCtx = new AudioContext()
    const audio = audioCtx.createBufferSource()
    audio.connect(audioCtx.destination)

    audioCtx.decodeAudioData(this.state.reader.result, (res) => {

      audio.buffer = res
      this.setState({
        ...this.state,
        wavePoints: audio.buffer.getChannelData(0)
      })
      audio.start()
    })

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

  fileChanged(event) {

    const selectedFile = event.target.files[0]

    console.log(selectedFile)

    this.setState({
      ...this.state,
      selectedFile
    })

    this.state.reader.readAsArrayBuffer(selectedFile)
  }

  render() {
    return (
      <div id="my-canvas">
        <P5Wrapper sketch={sketch} width={this.state.width} height={300} wavePoints={this.state.wavePoints} />
        <input type="file" id="song" onChange={this.fileChanged} />
        {/* <button onClick={this.playSong}>Play</button> */}
      </div>
    )
  }
}
