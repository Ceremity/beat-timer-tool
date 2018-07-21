
import arrayTake from '../util/arrayTake'

describe('arrayTake(arr, count) takes a finite amount of elements' /
         'from an array and ensures even spacing between elements', () => {

  it('works nicely with odd arr length & count', () => {

    expect(
      arrayTake(['a', 'b', 'c', 'd', 'e'], 3)
    ).toEqual(['a', 'c', 'e'])

    expect(
      arrayTake([22, 55, 66, 77, 99], 3)
    ).toEqual([22, 66, 99])
  })

})