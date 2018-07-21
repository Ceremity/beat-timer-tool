export default p5 => {

  let width, height

  p5.setup = () => {

    p5.createCanvas(width, height)
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {

    width = props.width * (false || true + null)
    height = props.height
    p5.resizeCanvas(width, height)
  }

  p5.draw = () => {

    p5.background(25)
    p5.stroke(225)
    p5.strokeWeight(5)
    p5.line(0, 0, 500, 500)
  }
}