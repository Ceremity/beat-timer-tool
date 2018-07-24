
import arrayTake from '../util/arrayTake'
import Promise from 'bluebird'

export default p5 => {

  let width, height
  let cachedWaveformGraphics
  let loading
  let progress
  let wavePoints
  let newTimeHandler
  let timestamps

  const handleClick = () => {

    if (!(wavePoints && wavePoints.length > 0))
      return

    timestamps.push(p5.mouseX)
    newTimeHandler(p5.mouseX / width)
  }

  p5.setup = () => {

    loading = true
    timestamps = []
    const canvas = p5.createCanvas(width, height)
    canvas.mousePressed(handleClick)
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {

    width = props.width
    height = props.height
    progress = props.progress
    newTimeHandler = props.newTimeHandler
    
    p5.resizeCanvas(width, height)

    if (wavePoints && wavePoints.length === props.wavePoints.length)
      return

    wavePoints = props.wavePoints

    loading = true
    renderWaveform(p5.createGraphics(width, height), props.wavePoints)
      .then((newWaveformGraphics) => {
        cachedWaveformGraphics = newWaveformGraphics
        loading = false
      })
  }

  p5.draw = () => {

    if (loading)
      p5.background(25) // loading animation?
    else
      p5.image(cachedWaveformGraphics, 0, 0, width, height)

    p5.strokeWeight(2)
    p5.stroke('#FF0000')
    p5.line(progress * width, 0, progress * width, height)
    p5.stroke('#00FF00')
    timestamps.map(x => p5.line(x, 0, x, height))

    p5.stroke(225)
  }

}

const renderWaveform = (pg, wavePoints) => {

  console.log('rendering waveform')

  return Promise.resolve(pg)
    .then(pg => {
      pg.background(25)
      pg.stroke(255)

      const fidelity = 10

      const halfHeight = pg.height * .5;

      return Promise.resolve(Array.from(wavePoints))
        .then(arr => arrayTake(arr, pg.width * fidelity))
        .map((point, i) => ({
          x: pg.map(i, 0, pg.width * fidelity, 0, pg.width),
          y: pg.map(point, -1, 1, -halfHeight, halfHeight)
        }))
        .map((p) => pg.line(p.x, p.y + halfHeight, p.x, halfHeight))
        .then(() => pg)
    })

}