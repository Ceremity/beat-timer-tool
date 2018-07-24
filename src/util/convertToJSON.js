
export default (timestamps) => {

    const times = timestamps.map(t => +t.timestamp)
    const position = timestamps.map(t => +t.pos)

    return JSON.stringify({ times, position }, null, 2)
}