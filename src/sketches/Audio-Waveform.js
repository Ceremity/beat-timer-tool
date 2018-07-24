
import arrayTake from '../util/arrayTake'
import Promise from 'bluebird'

export default p5 => {

  let width, height
  let cachedWaveformGraphics
  let loading
  let progress

  p5.setup = () => {

    loading = false
    p5.createCanvas(width, height)
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {

    width = props.width
    height = props.height
    progress = props.progress
    
    p5.resizeCanvas(width, height)

    loading = true
    renderWaveform(p5.createGraphics(width, height), props.wavePoints)
      .then((newWaveformGraphics) => {
        cachedWaveformGraphics = newWaveformGraphics
        loading = false
      })
    
    console.log('after rendering waveform', loading)
  }

  p5.draw = () => {

    if (loading)
      p5.background(25) // loading animation?
    else
      p5.image(cachedWaveformGraphics, 0, 0)
      
    p5.strokeWeight(2)
    p5.stroke('#FF0000')
    p5.line(progress * width, 0, progress * width, height)

    p5.stroke(225)
  }
}

const renderWaveform = (pg, wavePoints) => {

  console.log('rendering waveform')

  return Promise.resolve(pg)
    // .then(pg => {
    //   pg.background(25)
    //   pg.stroke(255)

    //   const fidelity = 10

    //   return Promise.resolve(Array.from(wavePoints))
    //     .then(arr => arrayTake(arr, pg.width * fidelity))
    //     .map((point, i) => ({
    //       x: pg.map(i, 0, pg.width * fidelity, 0, pg.width),
    //       y: pg.map(point, -1, 1, -pg.height / 2, pg.height / 2)
    //     }))
    //     .map((p) => pg.line(p.x, p.y + pg.height / 2, p.x, pg.height / 2))
    //     .then(() => pg)
    // })

}