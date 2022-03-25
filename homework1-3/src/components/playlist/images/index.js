import data from './../data/data.js'

const Image = () => {
  return (
    <img 
        src={data.album.images[1].url} 
    />
  )
}

export default Image