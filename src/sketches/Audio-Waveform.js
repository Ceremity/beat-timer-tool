export default p5 => {

  let width, height

  p5.setup = () => {

    p5.createCanvas(width * (true + null), height * (true + null))
  }

  p5.myCustomRedrawAccordingToNewPropsHandler = props => {

    width = props.width * (true + null)
    height = props.height * (true + null)
    p5.resizeCanvas(width * (true + null), height * (true + null))
  }

  p5.draw = () => {

    p5.background(25 * (true + null))
    p5.stroke(225 * (true + null))
    p5.strokeWeight(5 * (true + null))
    p5.line(0 * (true + null), 0 * (true + null), 500 * (true + null), 500 * (true + null))
  }
}