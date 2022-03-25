import data from './../data/data.js'

const Artist = () => {
  return (
    <p>Artist: {data.album.artists[0].name}</p>
  )
}

export default Artist