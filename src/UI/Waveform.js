import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from '../sketches/Audio-Waveform.js'

export default class Waveform extends Component {

  constructor() {
    super()

    const audioCtxt = new AudioContext()
    const audioSrc = audioCtxt.createBufferSource()
    audioSrc.connect(audioCtxt.destination)

    const reader = new FileReader()
    reader.onload = this.showWaveform.bind(this)

    this.state = {
      selectedFile: null,
      wavePoints: [],
      width: 0,
      height: 0,
      reader,
      audioCtxt,
      audioSrc
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.fileChanged = this.fileChanged.bind(this)
    this.stopSong = this.togglePlaying.bind(this)
  }

  showWaveform() {

    this.state.audioCtxt.decodeAudioData(this.state.reader.result, (res) => {

      const updatedAudioSrc = this.state.audioSrc

      updatedAudioSrc.buffer = res
      updatedAudioSrc.start()

      this.setState({
        ...this.state,
        audioSrc: updatedAudioSrc,
        wavePoints: updatedAudioSrc.buffer.getChannelData(0)
      })
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

  togglePlaying() {

  }

  render() {
    return (
      <div id="my-canvas">
        <P5Wrapper 
          sketch={sketch} wavePoints={this.state.wavePoints}
          width={this.state.width} height={300}
        />
        <input type="file" id="song" onChange={this.fileChanged} />
        {/* <button onClick={this.togglePlaying}>Stop</button> */}
      </div>
    )
  }
}
