
import arrayTake from '../util/arrayTake'
import Promise from 'bluebird'
import WaveFormer from '../util/WaveFormer.worker.js'


export default p5 => {

  const waveFormer = new WaveFormer()
  let width, height
  let cachedWaveformGraphics
  let loading

  waveFormer.onmessage = (d) => {
    cachedWaveformGraphics = d.data
    loading = false
  }

  p5.setup = () => {

    loading = true
    p5.createCanvas(width, height)
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {

    width = props.width
    height = props.height
    
    p5.resizeCanvas(width, height)

    loading = true

    // waveFormer.postMessage({
    //   pg: p5.createGraphics(width, height),
    //   wavePoints: props.wavePoints
    // })
    waveFormer.postMessage('This is my message')
  }

  p5.draw = () => {

    if (loading)
      p5.background(25) // loading animation?
    else
      p5.image(cachedWaveformGraphics, 0, 0)
      
    p5.stroke(225)

  }
}
