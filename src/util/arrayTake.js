
export default (arr, count) => {
  const skip = Math.ceil(arr.length / count)
  
  return arr.filter((e, i) => i % skip === 0)
}