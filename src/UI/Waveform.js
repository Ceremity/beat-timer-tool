import React, { Component } from 'react'
import P5Wrapper from 'react-p5-wrapper'
import sketch from '../sketches/Audio-Waveform.js'
import Promise from 'bluebird'

export default class Waveform extends Component {

  constructor() {
    super()

    const audioCtxt = new AudioContext()
    const audioSrc = audioCtxt.createBufferSource()
    audioSrc.connect(audioCtxt.destination)
    audioCtxt.suspend()

    const reader = new FileReader()
    reader.onload = this.showWaveform.bind(this)

    this.state = {
      playing: false,
      selectedFile: null,
      wavePoints: [],
      width: 0,
      height: 0,
      duration: 0,
      currentTime: 0,
      reader,
      audioCtxt,
      audioSrc
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
    this.fileChanged = this.fileChanged.bind(this)
    this.togglePlaying = this.togglePlaying.bind(this)
  }

  showWaveform() {

    this.state.audioCtxt.decodeAudioData(this.state.reader.result, (res) => {

      const updatedAudioSrc = this.state.audioSrc

      updatedAudioSrc.buffer = res
      updatedAudioSrc.start()
      this.state.audioCtxt.suspend()

      this.setState({
        ...this.state,
        duration: res.duration,
        audioSrc: updatedAudioSrc,
        wavePoints: updatedAudioSrc.buffer.getChannelData(0)
      })
    })

  }

  componentDidMount() {
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    setInterval(() => {
      this.setState({ currentTime: this.state.audioCtxt.currentTime })
      console.log('currentTime: ', this.state.currentTime)
    }, 100)
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
      
    const playing = !this.state.playing
    
    console.log(playing ? 'playing' : 'not playing')

    if (playing)
      this.state.audioCtxt.resume()
    else 
      this.state.audioCtxt.suspend()
    
    this.setState({ ...this.state, playing })
  }

  render() {
    return (
      <div id="my-canvas">
        <P5Wrapper 
          sketch={sketch} wavePoints={this.state.wavePoints}
          width={this.state.width} height={300}
          progress={this.state.audioCtxt.currentTime / this.state.duration}
        />
        <input type="file" id="song" onChange={this.fileChanged} />
        <button onClick={this.togglePlaying}>{this.state.playing ? 'Stop' : 'Start'}</button>
      </div>
    )
  }
}


const bigFunction = (n) => {
  return Promise.resolve(n)
    .then(n => Array(n).fill(n))
    .map(a => Array(a))
    .map(a => a.map(b => Math.sqrt(b)))
}