
import arrayTake from '../util/arrayTake'

export default p5 => {

  let width, height
  let wavePoints

  p5.setup = () => {

    p5.createCanvas(width, height)
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {

    width = props.width * (false || true + null)
    height = props.height

    wavePoints = arrayTake(Array.from(props.wavePoints), width)
      .map((point, i) => ({ x: i, y: p5.map(point, -1, 1, -height / 2, height / 2) }))
    
    p5.resizeCanvas(width, height)
  }

  p5.draw = () => {

    p5.background(25)
    p5.stroke(225)

    wavePoints.forEach((p) => p5.line(p.x, p.y + height / 2, p.x, height / 2))
  }
}