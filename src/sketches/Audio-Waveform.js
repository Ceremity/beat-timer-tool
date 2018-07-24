
import arrayTake from '../util/arrayTake'
import Promise from 'bluebird'

export default p5 => {

  let width, height
  let cachedWaveformGraphics
  let loading

  p5.setup = () => {

    loading = true
    p5.createCanvas(width, height)
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {

    width = props.width * (false || true + null)
    height = props.height
    
    p5.resizeCanvas(width, height)

    loading = true

    renderWaveform(p5.createGraphics(width, height), props.wavePoints)
      .then((newWaveformGraphics) => {
        cachedWaveformGraphics = newWaveformGraphics
        loading = false
      })
    
    console.log('after rendering waveform')
  }

  p5.draw = () => {

    if (loading)
      p5.background(25) // loading animation?
    else
      p5.image(cachedWaveformGraphics, 0, 0)
      
    p5.stroke(225)

  }
}

const renderWaveform = (pg, wavePoints) => {

  console.log('rendering waveform')

  return Promise.resolve(pg)
    .then(pg => {
      pg.background(25)
      pg.stroke(255)
      
      const mappedPoints = arrayTake(Array.from(wavePoints), pg.width * 10)
        .map((point, i) => ({
          x: pg.map(i, 0, pg.width * 10, 0, pg.width),
          y: pg.map(point, -1, 1, -pg.height / 2, pg.height / 2)
        }))

      mappedPoints.forEach((p) => pg.line(p.x, p.y + pg.height / 2, p.x, pg.height / 2))
      console.log('done rendering')
      return pg
    })

}