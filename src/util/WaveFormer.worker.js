

onmessage = (d) => {
  console.log('in Waveformer:', d)
}

// const renderWaveform = (pg, wavePoints) => {

//   console.log('rendering waveform')

//   return Promise.resolve(pg)
//     .then(pg => {
//       pg.background(25)
//       pg.stroke(255)
      
//       const mappedPoints = arrayTake(Array.from(wavePoints), pg.width * 10)
//         .map((point, i) => ({
//           x: pg.map(i, 0, pg.width * 10, 0, pg.width),
//           y: pg.map(point, -1, 1, -pg.height / 2, pg.height / 2)
//         }))

//       mappedPoints.forEach((p) => pg.line(p.x, p.y + pg.height / 2, p.x, pg.height / 2))
//       console.log('done rendering')
//       return pg
//     })

// }